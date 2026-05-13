import { PageHeader } from "@/components/dashboard";
import { DashboardLayout } from "@/layout";
import { categoriesServices, type ServiceCategory } from "@/constants/data";
import { ArrowRight2 } from "iconsax-reactjs";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function filterCategories(query: string): ServiceCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return categoriesServices;

  return categoriesServices
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          category.title.toLowerCase().includes(q) ||
          category.description.toLowerCase().includes(q),
      ),
    }))
    .filter((c) => c.items.length > 0);
}

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(
    () => filterCategories(searchQuery),
    [searchQuery],
  );

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

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="text"
            role="searchbox"
            aria-label="Search services"
            placeholder="Search by service or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-line bg-background py-2 pl-11 pr-10 text-sm text-main placeholder:text-muted focus:border-primary focus:ring-3 focus:ring-primary/25 focus:outline-none"
          />
          {searchQuery ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted transition hover:bg-secondary hover:text-main"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
            >
              <X size={18} aria-hidden />
            </button>
          ) : null}
        </div>

        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <p
              className="rounded-2xl border border-dashed border-line bg-secondary/30 px-4 py-8 text-center text-sm text-muted dark:bg-secondary/20"
              role="status"
            >
              No services match &ldquo;{searchQuery.trim()}&rdquo;. Try a
              different keyword.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {filteredCategories.map((category) => (
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
                    <p className="text-[10px] sm:text-xs text-muted sm:max-w-lg sm:text-right">
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
                                <span className="font-medium text-main text-xs sm:text-base line-clamp-1">
                                  {item.title}
                                </span>
                                <ArrowRight2
                                  size={18}
                                  className="mt-0.5 shrink-0 text-muted"
                                  variant="Linear"
                                  aria-hidden
                                />
                              </span>
                              <span className="mt-1 sm:block hidden text-sm text-muted">
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
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
