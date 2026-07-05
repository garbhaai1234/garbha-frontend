import Link from "next/link";
import Image from "next/image";
import type { Solution } from "@/content/solutions";
import { ArrowRight } from "@/components/Icons";

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 transition-colors duration-300 group-hover:bg-brand-100">
        <Image
          src={solution.image}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
        {solution.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-ink-500">
        {solution.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
