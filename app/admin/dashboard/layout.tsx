import AdminShell from "@/components/admin/AdminShell";

export const runtime = "edge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
