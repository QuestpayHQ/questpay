import {
  USD_VIRTUAL_CARD_ISSUANCE_FEE_USD,
  type CreatedVirtualCard,
  type VirtualCardCurrency,
} from "@/constants/virtual-cards";
import { formatNumber } from "@/helpers/formatNumber";
import clsx from "clsx";
import { Eye, EyeOff, Wifi } from "lucide-react";
import { useState } from "react";

const CURRENCY_META: Record<
  VirtualCardCurrency,
  {
    flag: string;
    flagAlt: string;
    symbol: string;
    gradient: string;
    orb: string;
    shadow: string;
    network: string;
  }
> = {
  ngn: {
    flag: "/images/flags/ngn.svg",
    flagAlt: "Nigeria",
    symbol: "₦",
    gradient: "bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-900",
    orb: "bg-emerald-300/35",
    shadow: "shadow-lg shadow-emerald-900/30",
    network: "Verve",
  },
  usd: {
    flag: "/images/flags/usa.svg",
    flagAlt: "United States",
    symbol: "$",
    gradient: "bg-linear-to-br from-blue-600 via-indigo-700 to-slate-900",
    orb: "bg-blue-300/35",
    shadow: "shadow-lg shadow-blue-900/30",
    network: "Mastercard",
  },
};

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\s/g, "");
  if (digits.length <= 4) return raw;
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

type VirtualCardFaceProps = {
  currency: VirtualCardCurrency;
  mode: "preview" | "issued";
  label?: string;
  card?: CreatedVirtualCard;
};

export default function VirtualCardFace({
  currency,
  mode,
  label,
  card,
}: VirtualCardFaceProps) {
  const [cvvVisible, setCvvVisible] = useState(false);
  const meta = CURRENCY_META[currency];
  const displayLabel = label?.trim() || "Virtual debit";

  const cardNumber =
    mode === "issued" && card
      ? formatCardNumber(card.card_number)
      : "•••• •••• •••• ••••";

  const expiry = mode === "issued" && card ? card.expiry : "MM/YY";
  const cvv = mode === "issued" && card ? card.cvv : "•••";
  const balance =
    mode === "issued" && card ? card.balance : 0;

  return (
    <div
      className={clsx(
        "relative aspect-[1.586/1] w-full max-w-full overflow-hidden rounded-3xl p-5 text-white sm:p-6",
        meta.gradient,
        meta.shadow,
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute right-[-30%] top-[-35%] aspect-square w-[70%] rounded-full blur-3xl",
          meta.orb,
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-15%] aspect-square w-[45%] rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />

      <div className="relative z-1 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <img
                src={meta.flag}
                alt=""
                className="size-5 rounded-sm ring-1 ring-white/25"
              />
              <span className="text-xs font-semibold tracking-wide text-white/80">
                {currency === "ngn" ? "NGN Card" : "USD Card"}
              </span>
            </div>
            <p className="text-sm font-medium text-white/90">{displayLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            {mode === "issued" && currency === "usd" && (
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-white/25">
                ${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD} fee paid
              </span>
            )}
            <Wifi
              size={22}
              className="rotate-90 text-white/70"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="h-8 w-11 rounded-md bg-linear-to-br from-amber-200 to-amber-400 shadow-sm"
            aria-hidden
          />
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
            {meta.network}
          </span>
        </div>

        <div className="space-y-3">
          <p className="font-space text-lg font-semibold tracking-[0.2em] text-white tabular-nums sm:text-xl">
            {cardNumber}
          </p>

          <div className="flex items-end justify-between gap-4">
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                  Expires
                </p>
                <p className="font-space text-sm font-semibold tabular-nums">
                  {expiry}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                  CVV
                </p>
                <div className="flex items-center gap-1.5">
                  <p className="font-space text-sm font-semibold tabular-nums">
                    {mode === "issued" && card
                      ? cvvVisible
                        ? cvv
                        : "•••"
                      : cvv}
                  </p>
                  {mode === "issued" && card && (
                    <button
                      type="button"
                      onClick={() => setCvvVisible((v) => !v)}
                      className="grid size-6 place-items-center rounded-full bg-white/15 text-white/80 transition hover:bg-white/25"
                      aria-label={cvvVisible ? "Hide CVV" : "Show CVV"}
                      aria-pressed={cvvVisible}
                    >
                      {cvvVisible ? (
                        <EyeOff size={12} aria-hidden />
                      ) : (
                        <Eye size={12} aria-hidden />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                Balance
              </p>
              <p className="font-space text-base font-bold tabular-nums sm:text-lg">
                <span className="text-white/75">{meta.symbol}</span>{" "}
                {formatNumber(balance)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-right text-[10px] font-semibold tracking-[0.25em] text-white/50 uppercase">
          Questpay
        </p>
      </div>
    </div>
  );
}
