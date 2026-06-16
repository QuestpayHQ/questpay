import { PageHeader, VirtualCardFace } from "@/components/dashboard";
import { ButtonWithLoader, InputWithoutIcon, Modal } from "@/components/ui";
import {
  USD_VIRTUAL_CARD_ISSUANCE_FEE_USD,
  createVirtualCard,
  parseVirtualCardCurrency,
  virtualCardImportantInformation,
  type CreatedVirtualCard,
  type VirtualCardCurrency,
} from "@/constants/virtual-cards";
import { DashboardLayout } from "@/layout";
import { ArrowLeft2, Warning2 } from "iconsax-reactjs";
import { ArrowLeftRight, Check } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "sonner";

function otherCurrency(
  currency: VirtualCardCurrency,
): VirtualCardCurrency {
  return currency === "ngn" ? "usd" : "ngn";
}

export default function CreateVirtualCard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currency = parseVirtualCardCurrency(searchParams.get("type"));

  const [label, setLabel] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [createdCard, setCreatedCard] = useState<CreatedVirtualCard | null>(
    null,
  );

  const switchTarget = otherCurrency(currency);

  function switchCurrency(next: VirtualCardCurrency) {
    setSearchParams({ type: next }, { replace: true });
    setAgreedToTerms(false);
  }

  function handleSuccessClose() {
    setSuccessOpen(false);
    void navigate("/services/cards");
  }

  const feeNotice = useMemo(() => {
    if (currency !== "usd") return null;
    return (
      <div
        role="status"
        className="rounded-xl border border-blue-500/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-900 dark:text-blue-200"
      >
        <span className="font-semibold text-main dark:text-main">
          USD issuance fee:&nbsp;
        </span>
        <span className="tabular-nums font-semibold">
          ${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD}
        </span>
        &nbsp;(one‑time, non‑refundable) — charged when your card is created,
        in addition to what you choose to fund.
      </div>
    );
  }, [currency]);

  async function executeCreate() {
    setSubmitting(true);
    try {
      const response = await createVirtualCard(currency, label);
      setCreatedCard(response.data);
      setSuccessOpen(true);
      toast.success(response.message, {
        description: `${response.data.currency} virtual card is ready to use.`,
      });
    } catch {
      toast.error("Card creation failed", {
        description: "Please try again or contact support.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("Confirmation required", {
        description:
          "Please read the important information and confirm your agreement.",
      });
      return;
    }
    void executeCreate();
  }

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services", to: "/services" },
            {
              label: "Virtual Cards",
              to: "/services/cards",
            },
            { label: "Create" },
          ]}
          title="Create virtual card"
          description="Preview your card, confirm disclosures, then submit your card request."
        />

        <div>
          <Link
            to="/services/cards"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
          >
            <ArrowLeft2 size={18} variant="Linear" aria-hidden />
            Back to virtual cards
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          aria-label="Virtual card issuance"
        >
          <section className="mx-auto max-w-md space-y-4">
            <VirtualCardFace
              currency={currency}
              mode="preview"
              label={label}
            />

            <button
              type="button"
              onClick={() => switchCurrency(switchTarget)}
              className="btn mx-auto h-10 w-full max-w-md rounded-xl border border-line bg-background text-sm font-semibold text-main transition hover:bg-secondary/50 dark:bg-secondary/20"
            >
              <img
                src={
                  switchTarget === "usd"
                    ? "/images/flags/usa.svg"
                    : "/images/flags/ngn.svg"
                }
                alt=""
                className="size-4"
              />
              Switch to {switchTarget === "usd" ? "USD" : "NGN"} card
              <ArrowLeftRight size={16} aria-hidden />
            </button>

            {feeNotice}
          </section>

          <InputWithoutIcon
            id="vc-label"
            label="Card label (optional)"
            type="text"
            autoComplete="off"
            placeholder="e.g. Netflix · Ads · Freelance subscriptions"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <section
            className="space-y-3 rounded-2xl border border-line bg-secondary/25 p-4 dark:bg-secondary/30"
            aria-labelledby="terms-create-heading"
          >
            <div className="flex items-start gap-2">
              <Warning2
                size={20}
                className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                variant="Bold"
                aria-hidden
              />
              <h2
                id="terms-create-heading"
                className="text-sm font-semibold text-main"
              >
                Terms & important information
              </h2>
            </div>
            <div className="max-h-[min(22rem,50vh)] overflow-y-auto rounded-xl border border-line bg-background/80 p-3 dark:bg-secondary/40">
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted">
                {virtualCardImportantInformation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <label
              htmlFor="vc-terms-agree"
              className="flex cursor-pointer gap-3 rounded-xl border border-line bg-background p-3 dark:bg-secondary/20"
            >
              <input
                id="vc-terms-agree"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                aria-describedby="terms-create-heading"
                className="border-line text-primary accent-primary mt-1 size-[1.125rem] shrink-0 rounded-md border bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
              />
              <span className="text-sm leading-snug text-main">
                I have read and accept the disclosures above and understand
                that card issuance depends on eligibility, funds availability,
                {currency === "usd"
                  ? ` and acceptance of the $${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD} USD issuance fee.`
                  : " and issuer limits."}
              </span>
            </label>
          </section>

          <ButtonWithLoader
            type="submit"
            initialText={
              currency === "usd"
                ? `Continue — includes $${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD} issuance fee`
                : "Continue — create NGN card"
            }
            loadingText="Submitting request…"
            loading={submitting}
            disabled={submitting}
            className="btn btn-primary h-11 w-full rounded-xl text-sm font-semibold"
          />
        </form>

        <Modal
          isOpen={successOpen}
          onClose={() => !submitting && handleSuccessClose()}
          title="Card created successfully"
        >
          {createdCard ? (
            <>
              <p className="mb-4 text-sm text-muted">
                Your {createdCard.currency} virtual card is ready. Save these
                details securely — you will need them for online checkout.
              </p>

              <VirtualCardFace
                currency={parseVirtualCardCurrency(
                  createdCard.currency.toLowerCase(),
                )}
                mode="issued"
                label={label}
                card={createdCard}
              />

              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleSuccessClose}
                  className="btn btn-primary h-11 w-full rounded-xl text-sm font-semibold"
                >
                  <Check size={18} aria-hidden />
                  View my cards
                </button>
                <p className="text-center text-xs text-muted">
                  Closing this dialog also takes you to your cards list.
                </p>
              </div>
            </>
          ) : null}
        </Modal>
      </main>
    </DashboardLayout>
  );
}
