import {
  Services,
  Transactions,
  Settings,
  WalletCard,
} from "@/components/main";
import clsx from "clsx";
import { useState } from "react";

const tabs = [
  {
    label: "Services",
    value: "services",
  },
  {
    label: "Transactions",
    value: "transactions",
  },
  {
    label: "Settings",
    value: "settings",
  },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["value"]>("services");

  return (
    <div className="dark:bg-background bg-secondary">
      <div className="container space-y-6 pt-8">
        <div>
          <h3 className="text-2xl font-semibold text-muted">Hi, <span className="text-main">Jackson!</span> 👋</h3>
          <p className="text-muted">Pay bills, boost your socials, and more with Questpay.</p>
        </div>
        <WalletCard />
        <section>
          <div className="flex items-center gap-4">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={clsx(
                  activeTab === tab.value
                    ? "text-main border-b-2 border-white"
                    : "text-muted border-transparent border-b-2",
                  "cursor-pointer py-1 text-sm font-medium",
                )}
                onClick={() => setActiveTab(tab.value)}
              >
                <span>{tab.label}</span>
              </div>
            ))}
          </div>

          {activeTab === "services" && <Services />}
          {activeTab === "transactions" && <Transactions />}
          {activeTab === "settings" && <Settings />}
        </section>
      </div>
    </div>
  );
}
