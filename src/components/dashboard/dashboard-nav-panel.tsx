import { navItems } from "@/constants/data";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks";

export interface DashboardNavPanelProps {
  className?: string;
  /** Fires when a nav item is activated (e.g. close mobile drawer) */
  onNavigate?: () => void;
  /** Renders a close control in the brand row (mobile drawer) */
  onRequestClose?: () => void;
}

export default function DashboardNavPanel({
  className = "",
  onNavigate,
  onRequestClose,
}: DashboardNavPanelProps) {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  const filteredItems = useMemo(
    () =>
      navItems.filter((item) =>
        item.label.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  return (
    <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    exit={{ x: "-100%" }}
    transition={{ duration: 0.3 }}
      className={`flex relative z-100 h-full min-h-0 w-full border-r border-line max-w-[min(100%,20rem)] flex-col dark:bg-secondary bg-background px-4 pb-4 ${className}`}
    >
      <header className="flex h-[70px] shrink-0 items-center justify-between gap-2">
        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <img src="/logo.svg" alt="Questpay" width={35} height={35} />
          <h3 className={`truncate font-sans text-2xl font-bold ${theme === "dark" ? "text-white" : "text-main"}`}>
            Questpay
          </h3>
        </Link>
        {onRequestClose && (
          <button
            type="button"
            onClick={onRequestClose}
            className="grid size-10 shrink-0 place-items-center rounded-lg text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>
        )}
      </header>

      <div className="relative mb-3 shrink-0">
        <Search
          size={20}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id={onRequestClose ? "menubar-nav-search" : "sidebar-nav-search"}
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu"
          autoComplete="off"
          aria-label="Filter navigation"
          className="h-10 w-full rounded-lg border border-line bg-secondary dark:bg-foreground pr-10 pl-10 text-sm text-main outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        {search.length > 0 && (
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Clear search"
            onClick={() => setSearch("")}
          >
            <X size={16} strokeWidth={2.5} aria-hidden />
          </button>
        )}
      </div>

      <nav className="flex min-h-0 flex-1 flex-col" aria-label="Dashboard">
        {filteredItems.length === 0 ? (
          <p className="px-1 py-6 text-center text-sm text-white/70">
            No menu items match your search.
          </p>
        ) : (
          <ul className="hide-scrollbar space-y-0.5 overflow-y-auto overscroll-contain pr-0.5 pb-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    onClick={() => onNavigate?.()}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:bg-secondary",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={20}
                          className={
                            isActive
                              ? "shrink-0 text-white"
                              : "shrink-0 text-main"
                          }
                          aria-hidden
                        />
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </motion.div>
  );
}
