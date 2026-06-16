import { DashboardLayout } from "@/layout";
import { services } from "@/constants/data";
import { formatNumber } from "@/helpers/formatNumber";
import { getTimeOfDayGreeting } from "@/helpers/getTimeOfDayGreeting";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RECENT_TRANSACTIONS } from "@/constants/dummy";
import { WalletCard } from "@/components/dashboard";
import clsx from "clsx";


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

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-10">
        <div className="space-y-4">
          <header className="space-y-1">
            <h1 className="font-sans text-2xl font-bold tracking-tight text-main sm:text-3xl">
              {getTimeOfDayGreeting()}, <span className="text-muted">Gift 👋</span>
            </h1>
          </header>
          {/* Wallet */}
          <WalletCard />
        </div>

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
              Full Details
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link key={service.link} to={service.link} className="flex flex-col gap-2 bg-secondary items-center p-4 rounded-2xl">
                <div className={clsx("flex items-center gap-2 size-9 center rounded-xl", service.color)}>
                  <service.icon size={20} variant="Linear" aria-hidden />
                </div>
                <p className="text-sm font-medium text-main">{service.shortName}</p>
              </Link>
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
