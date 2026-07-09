export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-sakura-600 dark:text-sakura-300">
          {eyebrow}
        </div>
      )}
      <h2 className="heading mt-2 text-3xl md:text-4xl text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm md:text-base opacity-75">
          {subtitle}
        </p>
      )}
    </div>
  );
}
