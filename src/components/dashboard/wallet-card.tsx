import { formatNumber } from '@/helpers/formatNumber';
import { AddCircle, Send2 } from 'iconsax-reactjs';
import { EyeOff, Eye, ChevronDown } from 'lucide-react';
import { useId, useState } from 'react'
import { Link } from 'react-router-dom';

const MASKED_AMOUNT = "••••••••";

export default function WalletCard() {
      const detailsPanelId = useId();
      const [amountsVisible, setAmountsVisible] = useState(true);
      const [detailsOpen, setDetailsOpen] = useState(false);

      const totalBalance = 300_034;
      const ngnCardBalance = 10_000;
      const usdCardBalance = 17;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary p-4 text-white shadow-lg shadow-primary/25 dark:shadow-none sm:p-4">
      {/* Single soft pink disk — center sits past the corner so only a curved “path” shows inside */}
      <div
        className="pointer-events-none absolute right-[-46%] top-[-40%] aspect-square w-[min(115vw,21rem)] rounded-full bg-pink-400/40 blur-[2.25rem] sm:right-[-40%] sm:top-[-36%] sm:w-88 sm:blur-[3.25rem]"
        aria-hidden
      />

      <div className="relative z-1">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium tracking-wide text-white/75">
              Total balance
            </p>
            <div
              onClick={() => setAmountsVisible((v) => !v)}
              className="grid size-9 md:translate-y-1 cursor-pointer shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition hover:bg-white/25"
              aria-label={
                amountsVisible ? "Hide balance amounts" : "Show balance amounts"
              }
              aria-pressed={amountsVisible}
            >
              {amountsVisible ? (
                <EyeOff size={18} aria-hidden />
              ) : (
                <Eye size={18} aria-hidden />
              )}
            </div>
          </div>
          <p className="font-space text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl">
            <span className=" font-semibold text-white/75">₦</span>{" "}
            {amountsVisible ? formatNumber(totalBalance) : MASKED_AMOUNT}
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
          <Link
            to="/fund-account"
            className="btn min-h-11 flex-1 rounded-xl border border-white/35 bg-white/20 px-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30 sm:flex-initial sm:min-w-[140px]"
          >
            <AddCircle size={20} variant="Bold" aria-hidden />
            Fund
          </Link>
          <Link
            to="/withdraw"
            className="btn min-h-11 flex-1 rounded-xl border border-white/40 bg-white px-4 text-sm font-semibold text-primary hover:bg-white/95 sm:flex-initial sm:min-w-[140px]"
          >
            <Send2 size={20} aria-hidden />
            Withdraw
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center mt-6">
        <div className="h-px w-full bg-white/30" />
        <button
          type="button"
          id={`wallet-details-trigger-${detailsPanelId}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-full py-2 px-4 text-nowrap text-xs font-semibold text-white/90 ring-1 ring-inset ring-white/20 transition bg-white/10"
          aria-expanded={detailsOpen}
          aria-controls={detailsPanelId}
          onClick={() => setDetailsOpen((o) => !o)}
        >
          {detailsOpen ? "Hide full details" : "See full details"}
          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <div className="h-px w-full bg-white/30" />
      </div>

      <div
        id={detailsPanelId}
        role="region"
        aria-labelledby={`wallet-details-trigger-${detailsPanelId}`}
        className="mt-6"
        hidden={!detailsOpen}
      >
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8">
         
          <div>
            <dt className="text-xs font-medium text-white/70">
              NGN Card Balance
            </dt>
            <dd className="mt-1 font-space text-lg font-semibold tabular-nums text-white">
              ₦ {amountsVisible ? formatNumber(ngnCardBalance) : MASKED_AMOUNT}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-white/70">
              USD Card Balance
            </dt>
            <dd className="mt-1 font-space text-lg font-semibold tabular-nums text-white">
              $ {amountsVisible ? formatNumber(usdCardBalance) : MASKED_AMOUNT}
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-xs text-center sm:text-left leading-relaxed text-white/65">
        Balances update after each settled transaction. Withdrawable funds may
        require verification for large payouts.
      </p>
      </div>
    </div>
  );
}
