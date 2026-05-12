import { Header, Sidebar } from "@/components/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-scroll h-dvh hide-scrollbar">
        <Header />
        <div className="min-w-0 flex-1 px-4 md:px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
