import { clsx } from "@/lib/clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
