export default function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="glass rounded-3xl p-10 text-center">
      <div className="text-3xl">✿</div>
      <div className="mt-2 heading text-lg">{title}</div>
      {hint && <p className="mt-1 text-sm opacity-70">{hint}</p>}
    </div>
  );
}
