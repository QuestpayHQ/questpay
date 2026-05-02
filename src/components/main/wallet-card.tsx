import { formatNumber } from "@/helpers/formatNumber";
import {
  AddCircle,
  MoneySend,
  Send2,
  ShoppingCart,
} from "iconsax-reactjs";
import { EyeClosed } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function GradientWalletStat({
  label,
  amount,
  icon,
  accentClass,
}: {
  label: string;
  amount: number;
  icon: ReactNode;
  accentClass: string;
}) {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center gap-2.5">
        <span className={accentClass}>{icon}</span>
        <span className="truncate text-[10px] font-semibold uppercase tracking-widest text-white/55">
          {label}
        </span>
      </div>
      <p className="font-space text-base font-bold leading-none tracking-tight text-white tabular-num">
        <span className="font-sans font-medium text-white/70">₦</span> {" "}
        {formatNumber(amount)}{" "}
      </p>
    </div>
  );
}

export default function WalletCard() {
  /** Spendable = in-app / card spend; withdrawable = cash-out eligible. Total is always the sum. */
  const spendableBalance = 1_500_000;
  const withdrawableBalance = 800_034;
  const totalBalance = spendableBalance + withdrawableBalance;

  return (
    <div className="space-y-4">
      {/* <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-background md:grid-cols-3 md:divide-x md:divide-line dark:bg-secondary">
        <div className="flex items-center justify-between gap-3 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold capitalize tracking-wide text-muted">
              Total balance
            </p>
            <p className="font-space text-2xl font-bold tracking-tight text-main tabular-nums">
              {formatNumber(totalBalance)}{" "}
              <span className="mr-0.5 text-sm font-sans text-muted">NGN</span>
            </p>
          </div>

          <span className="grid size-10 place-items-center rounded-xl bg-primary text-white">
            <Wallet size={20} variant="Bold" />
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line p-4 md:border-t-0">
          <div className="space-y-2">
            <p className="text-xs font-semibold capitalize tracking-wide text-muted">
              Spendable
            </p>
            <p className="font-space text-2xl font-bold tracking-tight text-main tabular-nums">
              {formatNumber(spendableBalance)}{" "}
              <span className="mr-0.5 text-sm font-sans text-muted">NGN</span>
            </p>
          </div>

          <span className="grid size-10 place-items-center rounded-xl bg-amber-500 text-white">
            <ShoppingCart size={20} variant="Bold" />
          </span>
        </div>

        <div className="flex items-center justify-between gap-5 border-t border-line p-4 md:border-t-0">
          <div className="space-y-2">
            <p className="text-xs font-semibold capitalize tracking-wide text-muted">
              Withdrawable
            </p>
            <p className="font-space text-2xl font-bold tracking-tight text-main tabular-nums">
              {formatNumber(withdrawableBalance)}{" "}
              <span className="mr-0.5 text-sm font-sans text-muted">NGN</span>
            </p>
          </div>

          <span className="grid size-10 place-items-center rounded-xl bg-green-500 text-white">
            <MoneySend size={20} variant="Bold" />
          </span>
        </div>
      </div> */}

    
        <div className="text-center space-y-4 overflow-hidden flex-col min-h-50 rounded-2xl bg-linear-to-br from-violet-900 via-violet-900 to-primary pt-6">
         
            <div className="space-y-2">
                <div className="center gap-4">
                  <p className="text-sm capitalize tracking-wide text-white/80">
                    Total balance
                  </p>
                  <button
                    type="button"
                    className="center h-9 w-9 rounded-full bg-white/10"
                    aria-label="Hide balance"
                  >
                    <EyeClosed size={20} className="text-white/80" />
                  </button>
                </div>
                <h3 className="font-space text-4xl font-bold tracking-tight text-white tabular-nums">
                  {formatNumber(totalBalance)}{" "}
                  <span className="mr-0.5 text-sm font-sans text-white/80">
                    NGN
                  </span>
                </h3>
            </div>

            <div className=" border-t border-white/15">
              <div className="grid grid-cols-2 divide-x divide-white/15 overflow-hidden rounded-[11px]">
                <GradientWalletStat
                  label="Spendable"
                  amount={spendableBalance}
                  accentClass="text-amber-300"
                  icon={<ShoppingCart variant="Bold" size={18} />}
                />
                <GradientWalletStat
                  label="Withdrawable"
                  amount={withdrawableBalance}
                  accentClass="text-emerald-300"
                  icon={<MoneySend variant="Bold" size={18} />}
                />
              </div>
        
          </div>

         
        
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/fund-account"
          className="btn bg-amber-500 text-amber-100 font-semibold h-11 w-full rounded-xl px-4 text-sm"
        >
          Fund account <AddCircle size={20} variant="Bold" />
        </Link>
        <Link
          to="/withdraw"
          className="btn h-11 w-full rounded-xl bg-green-500 text-white px-4 text-sm font-semibold hover:bg-green-600"
        >
          Withdraw <Send2 size={20} variant="Bold" />
        </Link>
      </div>
    </div>
  );
}
