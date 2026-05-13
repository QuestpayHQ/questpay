import { PageHeader } from "@/components/dashboard";
import { ButtonWithLoader, InputWithoutIcon, Modal } from "@/components/ui";
import { DashboardLayout } from "@/layout";
import { networkProviders } from "@/constants/data";
import { PROFILE_PHONE_LOCAL } from "@/constants/dummy";
import { isNigerianMobileLocal } from "@/helpers/isNigerianMobileLocal";
import clsx from "clsx";
import { CardSim, Check} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { InfoCircle } from "iconsax-reactjs";

const MIN_AIRTIME_NGN = 50;

export default function AirtimePurchase() {
  const detailsSectionRef = useRef<HTMLFormElement>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null,
  );
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [amountError, setAmountError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedProvider = networkProviders.find(
    (p) => p.id === selectedNetworkId,
  );

  useEffect(() => {
    if (selectedNetworkId === null) return;
    const t = window.setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    return () => window.clearTimeout(t);
  }, [selectedNetworkId]);

  function handlePhoneChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setPhone(digits);
    if (phoneError) setPhoneError(undefined);
  }

  function handleAmountChange(value: string) {
    const cleaned = value.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const normalized =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
    setAmount(normalized);
    if (amountError) setAmountError(undefined);
  }

  async function executePurchase() {
    if (!selectedProvider) return;

    const value = Number(amount);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setConfirmOpen(false);
    toast.success("Airtime request queued", {
      description: `${selectedProvider.title} · ${phone} · ₦${value.toLocaleString("en-NG")}`,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPhoneError(undefined);
    setAmountError(undefined);

    if (!selectedProvider) {
      toast.error("Select a network", {
        description: "Choose MTN, Airtel, Glo, or 9mobile to continue.",
      });
      return;
    }

    if (!isNigerianMobileLocal(phone)) {
      setPhoneError("Enter a valid Nigerian mobile number (11 digits, e.g. 08031234567).");
      return;
    }

    const value = Number(amount);
    if (!Number.isFinite(value) || value < MIN_AIRTIME_NGN) {
      setAmountError(`Minimum amount is ₦${MIN_AIRTIME_NGN.toLocaleString("en-NG")}.`);
      return;
    }

    setConfirmOpen(true);
  }

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services", to: "/services" },
            { label: "Airtime Purchase" },
          ]}
          title="Airtime top-up"
          description="Recharge any Nigerian line in a few steps."
        />

        <section className="space-y-3" aria-labelledby="network-heading">
          <h2
            id="network-heading"
            className="text-sm font-semibold text-main"
          >
            Network provider
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {networkProviders.map((provider) => {
              const isSelected = selectedNetworkId === provider.id;
              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedNetworkId(provider.id)}
                  className={clsx(
                    "relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/35"
                      : "border-line bg-background hover:border-emerald-500/35 hover:bg-secondary",
                  )}
                >
                  {isSelected ? (
                    <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
                      <Check size={14} strokeWidth={3} aria-hidden />
                    </span>
                  ) : null}
                  <span className="relative grid size-14 place-items-center rounded-xl bg-white dark:bg-foreground">
                    <img
                      src={provider.img}
                      alt=""
                      className="max-h-9 max-w-13 object-contain"
                    />
                  </span>
                  <span className="text-center text-sm font-medium text-main">
                    {provider.title}
                  </span>
                </button>
              );
            })}
          </div>

          {!selectedProvider ? (
            <div
              role="status"
              className="text-center text-sm flex items-center px-4 py-2 rounded-xl w-fit mx-auto gap-2 font-light bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
             <InfoCircle size={18} /> Select your network provider first to continue
            </div>
          ) : null}
        </section>

        {selectedProvider ? (
          <form
            ref={detailsSectionRef}
            id="airtime-details-section"
            onSubmit={handleSubmit}
            className="scroll-mt-20 space-y-6 rounded-2xl bg-background dark:bg-secondary p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted">
                Purchasing on{" "}
                <span className="font-semibold font-sans text-main">
                  {selectedProvider.title}
                </span>
              </p>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
                onClick={() => {
                  setSelectedNetworkId(null);
                  setConfirmOpen(false);
                }}
              >
                Change network
              </button>
            </div>

            <div className="space-y-4">
              <InputWithoutIcon
                id="airtime-phone"
                label="Phone number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="08031234567"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                error={phoneError}
              />
              <button
                type="button"
                className="w-fit text-sm font-semibold text-primary"
                onClick={() => {
                  handlePhoneChange(PROFILE_PHONE_LOCAL);
                }}
                          >
                              <CardSim size={18} />
                Use my number
              </button>
            </div>

            <InputWithoutIcon
              id="airtime-amount"
              label="Amount (NGN)"
              type="text"
              inputMode="decimal"
              placeholder={`Min ₦${MIN_AIRTIME_NGN.toLocaleString("en-NG")}`}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              error={amountError}
            />

            <ButtonWithLoader
              type="submit"
              initialText="Review & continue"
              loadingText="Processing..."
              loading={false}
              disabled={submitting}
              className="btn btn-primary h-11 w-full rounded-xl text-sm font-semibold"
            />
          </form>
        ) : null}

        <Modal
          isOpen={confirmOpen}
          onClose={() => !submitting && setConfirmOpen(false)}
          title="Confirm airtime"
        >
          {selectedProvider ? (
            <>
              <p className="mb-4 text-sm text-muted">
                Review your top-up details before we charge your wallet.
              </p>
              <dl className="space-y-3 rounded-2xl border border-line bg-secondary/30 p-4 dark:bg-secondary/40">
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Service</dt>
                  <dd className="text-right font-medium text-main">Airtime top-up</dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Network</dt>
                  <dd className="text-right font-medium text-main">
                    {selectedProvider.title}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Phone</dt>
                  <dd className="font-space text-right font-medium tabular-nums text-main">
                    {phone}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line pt-3 text-sm">
                  <dt className="text-muted">Amount</dt>
                  <dd className="font-space text-right text-lg font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                    ₦{Number(amount).toLocaleString("en-NG")}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={submitting}
                  className="btn min-h-11 flex-1 rounded-xl border border-line bg-background text-sm font-semibold text-main hover:bg-secondary sm:flex-initial sm:min-w-[120px]"
                  onClick={() => setConfirmOpen(false)}
                >
                  Go back
                </button>
                <ButtonWithLoader
                  type="button"
                  initialText="Confirm & buy"
                  loadingText="Processing..."
                  loading={submitting}
                  disabled={submitting}
                  className="btn btn-primary min-h-11 flex-1 rounded-xl text-sm font-semibold sm:flex-initial sm:min-w-[160px]"
                  onClick={() => void executePurchase()}
                />
              </div>
            </>
          ) : null}
        </Modal>
      </main>
    </DashboardLayout>
  );
}
