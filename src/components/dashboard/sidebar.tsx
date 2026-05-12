import DashboardNavPanel from "@/components/dashboard/dashboard-nav-panel";

export default function Sidebar() {
  return (
    <aside className="hidden h-dvh w-64 shrink-0 flex-col lg:flex">
      <DashboardNavPanel className="min-h-0 flex-1" />
    </aside>
  );
}
