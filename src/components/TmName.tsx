/**
 * Renders a product name, drawing a trademark symbol (™) as a small raised
 * superscript so it reads as a proper mark rather than full-size text.
 * A no-op for names that contain no ™ (e.g. the not-yet-trademarked modules).
 */
export function TmName({ name }: { name: string }) {
  const idx = name.indexOf("™");
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}
      <sup className="align-super text-[0.55em] font-semibold">™</sup>
      {name.slice(idx + 1)}
    </>
  );
}
