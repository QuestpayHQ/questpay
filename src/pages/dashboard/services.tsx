import { PageHeader } from "@/components/dashboard";
import { DashboardLayout } from "@/layout";
import { categoriesServices } from "@/constants/data";
import { ArrowRight2 } from "iconsax-reactjs";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services" },
          ]}
          title="All Services"
        />

        <div className="space-y-10">
          {categoriesServices.map((category) => (
            <section
              key={category.id}
              className="space-y-4"
              aria-labelledby={`cat-${category.id}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <h2
                  id={`cat-${category.id}`}
                  className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${category.color}`}
                >
                  {category.title}
                </h2>
                <p className="text-xs text-muted sm:max-w-lg sm:text-right">
                  {category.description}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.link}>
                      <Link
                        to={item.link}
                        className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-background p-3 md:p-4 transition-colors hover:border-primary/25 hover:bg-secondary/40 dark:bg-secondary/20 sm:flex-row sm:items-start sm:gap-5"
                      >
                        <span
                          className={`grid size-12 shrink-0 place-items-center rounded-xl ${item.color}`}
                        >
                          <Icon size={22} variant="Linear" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="font-medium text-main">
                              {item.title}
                            </span>
                            <ArrowRight2
                              size={18}
                              className="mt-0.5 shrink-0 text-muted"
                              variant="Linear"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-1 block text-sm text-muted">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
