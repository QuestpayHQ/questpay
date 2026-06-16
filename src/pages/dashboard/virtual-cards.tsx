import { PageHeader, VirtualCardFace } from "@/components/dashboard";
import { DashboardLayout } from "@/layout";
import {
  USD_VIRTUAL_CARD_ISSUANCE_FEE_USD,
  fetchVirtualCards,
  parseVirtualCardCurrency,
  virtualCardImportantInformation,
  type VirtualCardListItem,
} from "@/constants/virtual-cards";
import { formatNumber } from "@/helpers/formatNumber";
import clsx from "clsx";
import { AddCircle } from "iconsax-reactjs";
import { Info, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function CreateCardTile({
  currency,
  title,
  description,
}: {
  currency: "ngn" | "usd";
  title: string;
  description: string;
}) {
  const isUsd = currency === "usd";

  return (
    <Link
      to={`/services/cards/create?type=${currency}`}
      className="group p-4 border border-line bg-secondary/75 flex flex-col gap-4 rounded-2xl transition hover:border-primary/30 hover:bg-secondary/30 dark:bg-secondary/15"
    >
      <div className="relative overflow-hidden rounded-2xl transition duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
        <VirtualCardFace currency={currency} mode="preview" />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-black/0 transition group-hover:bg-black/20"
          aria-hidden
        >
          <span className="grid size-12 translate-y-2 place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
            <Plus size={22} aria-hidden />
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-main">{title}</h3>
          {isUsd ? (
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
              ${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD} fee
            </span>
          ) : null}
        </div>
        <p className="text-xs leading-relaxed text-muted">{description}</p>
        <span className="btn mt-2 h-10 w-full rounded-xl border border-line bg-background text-sm font-semibold text-main group-hover:border-primary/40 group-hover:text-primary dark:bg-secondary/30">
          <img
            src={
              isUsd ? "/images/flags/usa.svg" : "/images/flags/ngn.svg"
            }
            alt=""
            className="size-4"
          />
          Create {isUsd ? "USD" : "NGN"} card
          <AddCircle size={16} variant="Bold" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return (
    <div
      className="aspect-[1.586/1] w-full animate-pulse rounded-3xl bg-secondary/80"
      aria-hidden
    />
  );
}

function CardsSummary({ cards }: { cards: VirtualCardListItem[] }) {
  const totals = useMemo(() => {
    return cards.reduce(
      (acc, card) => {
        if (card.currency === "NGN") {
          acc.ngn += card.balance;
          acc.ngnCount += 1;
        } else {
          acc.usd += card.balance;
          acc.usdCount += 1;
        }
        return acc;
      },
      { ngn: 0, usd: 0, ngnCount: 0, usdCount: 0 },
    );
  }, [cards]);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-line bg-background p-4 dark:bg-secondary/15">
        <p className="text-xs font-medium text-muted">Total cards</p>
        <p className="mt-1 font-space text-2xl font-bold tabular-nums text-main">
          {cards.length}
        </p>
      </div>
      <div className="rounded-2xl border border-line bg-background p-4 dark:bg-secondary/15">
        <p className="text-xs font-medium text-muted">NGN balance</p>
        <p className="mt-1 font-space text-2xl font-bold tabular-nums text-main">
          <span className="text-muted">₦</span> {formatNumber(totals.ngn)}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {totals.ngnCount} card{totals.ngnCount === 1 ? "" : "s"}
        </p>
      </div>
      <div className="rounded-2xl border border-line bg-background p-4 dark:bg-secondary/15">
        <p className="text-xs font-medium text-muted">USD balance</p>
        <p className="mt-1 font-space text-2xl font-bold tabular-nums text-main">
          <span className="text-muted">$</span> {formatNumber(totals.usd)}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {totals.usdCount} card{totals.usdCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}

export default function VirtualCards() {
  const [cards, setCards] = useState<VirtualCardListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void fetchVirtualCards()
      .then((data) => {
        if (active) setCards(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const hasCards = cards.length > 0;

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services", to: "/services" },
            { label: "Virtual Cards" },
          ]}
          title="Virtual cards"
          description="Create Naira or Dollar virtual debit cards for safer online subscriptions and checkout."
        />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : hasCards ? (
          <div className="space-y-6">
            <CardsSummary cards={cards} />

            <section className="space-y-4" aria-labelledby="your-cards-heading">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="your-cards-heading"
                  className="text-sm font-semibold text-main"
                >
                  Your cards
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/services/cards/create?type=ngn"
                    className="btn h-9 rounded-xl border border-line bg-background px-3 text-xs font-semibold text-main hover:bg-secondary/50 dark:bg-secondary/20"
                  >
                    <img src="/images/flags/ngn.svg" alt="" className="size-3.5" />
                    NGN card
                    <Plus size={14} aria-hidden />
                  </Link>
                  <Link
                    to="/services/cards/create?type=usd"
                    className="btn h-9 rounded-xl border border-line bg-background px-3 text-xs font-semibold text-main hover:bg-secondary/50 dark:bg-secondary/20"
                  >
                    <img src="/images/flags/usa.svg" alt="" className="size-3.5" />
                    USD card
                    <Plus size={14} aria-hidden />
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => (
                  <article
                    key={card.card_id}
                    className="space-y-3 rounded-2xl border border-line bg-background p-3 dark:bg-secondary/10"
                  >
                    <VirtualCardFace
                      currency={parseVirtualCardCurrency(
                        card.currency.toLowerCase(),
                      )}
                      mode="issued"
                      label={card.label}
                      card={card}
                    />
                    <p className="px-1 text-xs text-muted">
                      Tap the eye on the card to reveal CVV when checking out.
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <section
            className="space-y-6 bg-secondary/25 dark:bg-secondary/20 sm:p-6"
            aria-labelledby="empty-cards-heading"
          >
            {/* <div className="mx-auto max-w-lg space-y-2 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <CardIcon size={24} variant="Bold" aria-hidden />
              </div>
              <h2
                id="empty-cards-heading"
                className="text-lg font-semibold text-main"
              >
                No virtual cards yet
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                Issue a Naira or Dollar prepaid debit card for subscriptions,
                ads, and international checkout — without exposing your main
                wallet.
              </p>
            </div> */}

            <div className="grid gap-4 sm:grid-cols-2">
              <CreateCardTile
                currency="ngn"
                title="NGN virtual card"
                description="Spend online in Nigerian Naira from your wallet."
              />
              <CreateCardTile
                currency="usd"
                title="USD virtual card"
                description={`Dollar-denominated card with a one-time $${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD} issuance fee.`}
              />
            </div>
          </section>
        )}

        <section
          className={clsx(
            "space-y-3 rounded-2xl p-5",
            "bg-amber-100 text-amber-700 dark:bg-amber-200",
          )}
          aria-labelledby="info-heading"
        >
          <div className="flex items-start gap-3">
            <Info
              className="mt-0.5 size-5 shrink-0 text-amber-700"
              aria-hidden
            />
            <div className="min-w-0 space-y-3">
              <h2 id="info-heading" className="text-sm font-semibold">
                Important information
              </h2>
              <ul className="list-disc space-y-2 pl-4 text-xs text-amber-600 marker:text-amber-700/70 dark:marker:text-amber-400/80">
                {virtualCardImportantInformation.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
