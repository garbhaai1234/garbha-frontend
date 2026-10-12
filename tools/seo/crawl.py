"""
Read-only SEO crawl of every URL in a site's sitemap.

    python tools/seo/crawl.py https://garbha.ai            # live site
    python tools/seo/crawl.py http://localhost:3457        # local build (URLs rewritten to it)

Writes seo-crawl.json (full detail) and prints one line per page: status, time,
title and description length, H1 count, words, structured-data types. Uses a
normal phone browser user agent (the host's CDN blocks some bots). No writes to
the site; standard library only.
"""
import json, re, sys, time, urllib.request, html
from html.parser import HTMLParser

UA = "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36"
BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://garbha.ai").rstrip("/")
CANONICAL = "https://garbha.ai"


def fetch(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=60)


# The sitemap always lists canonical URLs; for a local build, fetch them from BASE.
sitemap = fetch(BASE + "/sitemap.xml").read().decode("utf-8")
urls = [BASE + re.sub(r"^https?://[^/]+", "", u) for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)]


class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""; self._t = False; self.meta = {}; self.links = []; self.canon = None
        self.h = []; self._h = None; self._htext = ""; self.imgs = []; self.ld = []; self._ld = False; self._ldtext = ""
        self.text = []; self._skip = 0; self.hreflang = []
    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == "title": self._t = True
        if tag == "meta":
            k = a.get("name") or a.get("property")
            if k: self.meta[k.lower()] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canon = a.get("href")
        if tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"): self.hreflang.append(a.get("hreflang"))
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag in ("h1", "h2", "h3"): self._h = tag; self._htext = ""
        if tag == "img": self.imgs.append(a)
        if tag == "script" and a.get("type") == "application/ld+json": self._ld = True; self._ldtext = ""
        if tag in ("script", "style", "noscript"): self._skip += 1
    def handle_endtag(self, tag):
        if tag == "title": self._t = False
        if tag == self._h: self.h.append((tag, re.sub(r"\s+", " ", self._htext).strip())); self._h = None
        if tag == "script" and self._ld:
            self._ld = False
            try: self.ld.append(json.loads(self._ldtext))
            except Exception as e: self.ld.append({"_error": str(e)})
        if tag in ("script", "style", "noscript"): self._skip -= 1
    def handle_data(self, d):
        if self._t: self.title += d
        if self._h: self._htext += d
        if self._ld: self._ldtext += d
        if not self._skip: self.text.append(d)


def types(node, out):
    if isinstance(node, list):
        for n in node: types(n, out)
    elif isinstance(node, dict):
        t = node.get("@type")
        if t: out.update(t if isinstance(t, list) else [t])
        for v in node.values(): types(v, out)
    return out


rows = []
for u in urls:
    t0 = time.time()
    try:
        r = fetch(u)
        body = r.read().decode("utf-8", "replace"); code = r.status; hdr = dict(r.headers)
    except urllib.error.HTTPError as e:
        rows.append({"url": u, "status": e.code}); continue
    ms = int((time.time() - t0) * 1000)
    p = P(); p.feed(body)
    words = len(re.findall(r"\w+", " ".join(p.text)))
    internal = sorted({re.sub(r"[#?].*$", "", l) for l in p.links if l.startswith("/") or l.startswith(BASE)})
    rows.append({
        "url": u, "status": code, "ms": ms, "bytes": len(body),
        "title": html.unescape(p.title.strip()), "desc": html.unescape(p.meta.get("description", "")),
        "canonical": p.canon, "robots": p.meta.get("robots"), "xrobots": hdr.get("X-Robots-Tag"),
        "og_image": p.meta.get("og:image"), "og_title": p.meta.get("og:title"), "tw": p.meta.get("twitter:card"),
        "h1": [t for h, t in p.h if h == "h1"], "h2": [t for h, t in p.h if h == "h2"], "nh3": sum(1 for h, _ in p.h if h == "h3"),
        "ld": sorted(types(p.ld, set())), "ld_errors": [x for x in p.ld if isinstance(x, dict) and "_error" in x],
        "words": words, "imgs": len(p.imgs), "img_noalt": sum(1 for i in p.imgs if i.get("alt") is None),
        "internal": internal, "hreflang": p.hreflang, "lang": re.search(r"<html[^>]*lang=\"([^\"]+)\"", body).group(1) if re.search(r"<html[^>]*lang=\"([^\"]+)\"", body) else None,
    })
json.dump(rows, open("seo-crawl.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
for r in rows:
    if "title" not in r: print(r["status"], r["url"]); continue
    print(f"{r['status']} {r['ms']:>5}ms {r['url'][len(BASE):][:46] or '/':46} T{len(r['title']):>3} D{len(r['desc']):>3} H1x{len(r['h1'])} W{r['words']:>5} LD={','.join(r['ld'])[:70]}")
