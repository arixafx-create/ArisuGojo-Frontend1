export const runtime = "edge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10">{children}</div>;
}
