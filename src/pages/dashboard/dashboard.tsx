import { DashboardLayout } from "@/layout";
import {
  categoriesServices,
  type ServiceCategory,
  type ServiceItem,
} from "@/constants/data";
import { formatNumber } from "@/helpers/formatNumber";
import { ArrowRight2 } from "iconsax-reactjs";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RECENT_TRANSACTIONS } from "@/constants/dummy";
import { WalletCard } from "@/components/dashboard";

const SERVICES_PREVIEW_COUNT = 4;

/** First N services in category order (same coverage as former `services.slice(0, 4)`). */
function servicePreviewByCategory(
  max: number,
): { category: ServiceCategory; items: ServiceItem[] }[] {
  const rows: { category: ServiceCategory; items: ServiceItem[] }[] = [];
  let remaining = max;
  for (const category of categoriesServices) {
    if (remaining <= 0) break;
    const items = category.items.slice(0, remaining);
    if (items.length === 0) continue;
    rows.push({ category, items });
    remaining -= items.length;
  }
  return rows;
}

function statusStyles(status: "success" | "pending" | "failed") {
  switch (status) {
    case "success":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
    case "pending":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "failed":
      return "bg-red-500/10 text-red-700 dark:text-red-400";
  }
}

export default function Dashboard() {
  const previewByCategory = servicePreviewByCategory(SERVICES_PREVIEW_COUNT);

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-10">
        <header className="space-y-1">
          <h1 className="font-sans text-2xl font-bold tracking-tight text-main sm:text-3xl">
            Overview
          </h1>
          <p className="max-w-lg text-sm text-muted">
            Balances, shortcuts, and your latest activity in one place.
          </p>
        </header>

        {/* Wallet */}
        <WalletCard />

        {/* Services */}
        <section className="space-y-3" aria-labelledby="services-heading">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2
              id="services-heading"
              className="text-xs font-semibold font-sans uppercase tracking-wider text-muted"
            >
              Services
            </h2>
            <Link
              to="/services"
              className="group inline-flex items-center gap-0.5 text-sm font-medium text-primary hover:underline"
            >
              See all
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
          <div className="space-y-6">
            {previewByCategory.map(({ category, items }) => (
              <div key={category.id} className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <p
                    className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${category.color}`}
                  >
                    {category.title}
                  </p>
                  <p className="text-xs text-muted sm:text-right sm:max-w-md">
                    {category.description}
                  </p>
                </div>
                <ul className="grid gap-3 grid-cols-2">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={`${category.id}-${item.link}`}>
                        <Link
                          to={item.link}
                          className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-background p-4 transition-colors hover:border-primary/25 hover:bg-secondary/40 dark:bg-secondary/20"
                        >
                          <span
                            className={`grid size-11 shrink-0 place-items-center rounded-lg ${item.color}`}
                          >
                            <Icon size={20} variant="Linear" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="font-medium line-clamp-1 text-sm text-main">
                                {item.title}
                              </span>
                              <ArrowRight2
                                size={18}
                                className="mt-0.5 shrink-0 text-muted"
                                variant="Linear"
                                aria-hidden
                              />
                            </span>
                            <span className="mt-1 line-clamp-2 text-xs text-muted">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Recent transactions */}
        <section className="space-y-3" aria-labelledby="tx-heading">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2
              id="tx-heading"
              className="text-xs font-semibold font-sans uppercase tracking-wider text-muted"
            >
              Recent transactions
            </h2>
            <Link
              to="/transactions"
              className="group inline-flex items-center gap-0.5 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-background dark:bg-secondary/30">
            <ul className="divide-y divide-line">
              {RECENT_TRANSACTIONS.map((tx) => (
                <li key={tx.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm text-main">
                        {tx.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {tx.dateLabel}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusStyles(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                      <p
                        className={`min-w-28 text-right font-space text-sm font-semibold tabular-nums sm:text-base ${
                          tx.amount >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-main"
                        }`}
                      >
                        {tx.amount >= 0 ? "+" : "−"}₦{" "}
                        {formatNumber(Math.abs(tx.amount))}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
