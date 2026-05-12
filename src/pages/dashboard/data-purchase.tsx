import { PageHeader } from "@/components/dashboard";
import { DashboardLayout } from "@/layout";

export default function DataPurchase() {
    return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services", to: "/services" },
            { label: "Data Purchase" },
          ]}
          title="Data Purchase"
        />
      </main>
    </DashboardLayout>
  )
}
