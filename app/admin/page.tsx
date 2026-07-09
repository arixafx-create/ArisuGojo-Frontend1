import { redirect } from "next/navigation";

export const runtime = "edge";

export default function AdminIndex() {
  redirect("/admin/login");
}
