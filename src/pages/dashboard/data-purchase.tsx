import { PageHeader } from "@/components/dashboard";
import { ButtonWithLoader, InputWithoutIcon, Modal } from "@/components/ui";
import {
  DATA_VALIDITY_OPTIONS,
  type DataValidity,
  getDataPlansByValidity,
  type DataPlan,
} from "@/constants/dataPlans";
import { networkProviders } from "@/constants/data";
import { PROFILE_PHONE_LOCAL } from "@/constants/dummy";
import { DashboardLayout } from "@/layout";
import { isNigerianMobileLocal } from "@/helpers/isNigerianMobileLocal";
import clsx from "clsx";
import { InfoCircle } from "iconsax-reactjs";
import { Check, Smartphone } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function DataPurchase() {
  const detailsSectionRef = useRef<HTMLFormElement>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null,
  );
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [validity, setValidity] = useState<DataValidity>("daily");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [planError, setPlanError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedProvider = networkProviders.find(
    (p) => p.id === selectedNetworkId,
  );

  const plansForValidity = useMemo(
    () => getDataPlansByValidity(validity),
    [validity],
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

  function selectValidity(next: DataValidity) {
    setValidity(next);
    setSelectedPlanId(null);
    setPlanError(undefined);
    setConfirmOpen(false);
  }

  function selectPlan(plan: DataPlan) {
    setSelectedPlanId(plan.id);
    setPlanError(undefined);
  }

  const validityLabel =
    DATA_VALIDITY_OPTIONS.find((o) => o.value === validity)?.label ?? validity;

  async function executePurchase() {
    const plan = plansForValidity.find((p) => p.id === selectedPlanId);
    if (!plan || !selectedProvider) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 650));
    setSubmitting(false);
    setConfirmOpen(false);
    toast.success("Data purchase queued", {
      description: `${selectedProvider.title} · ${plan.bundle} (${validity}) · ${formatNgn(plan.priceNgn)} · ${phone}`,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPhoneError(undefined);
    setPlanError(undefined);

    if (!selectedProvider) {
      toast.error("Select a network", {
        description: "Choose MTN, Airtel, Glo, or 9mobile first.",
      });
      return;
    }

    if (!isNigerianMobileLocal(phone)) {
      setPhoneError(
        "Enter a valid Nigerian mobile number (11 digits, e.g. 08031234567).",
      );
      return;
    }

    const plan = plansForValidity.find((p) => p.id === selectedPlanId);
    if (!plan) {
      setPlanError("Choose a data bundle from the grid.");
      return;
    }

    setConfirmOpen(true);
  }

  const summaryPlan = plansForValidity.find((p) => p.id === selectedPlanId);

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-8 pb-8">
        <PageHeader
          breadcrumbs={[
            { label: "Overview", to: "/dashboard" },
            { label: "Services", to: "/services" },
            { label: "Data Purchase" },
          ]}
          title="Buy data"
          description="Pick your network, validity, and bundle."
        />

        <section className="space-y-3" aria-labelledby="data-network-heading">
          <h2
            id="data-network-heading"
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
                  <span className="relative grid md:size-14 size-9 place-items-center rounded-xl">
                    <img
                      src={provider.img}
                      alt=""
                      className="md:size-10 size-7 rounded-lg object-contain"
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
              className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2 text-center text-sm font-light text-amber-600 dark:text-amber-400"
            >
              <InfoCircle size={18} aria-hidden />
              Select your network provider first to continue
            </div>
          ) : null}
        </section>

        {selectedProvider ? (
          <form
            ref={detailsSectionRef}
            id="data-purchase-details"
            onSubmit={handleSubmit}
            className="scroll-mt-20 space-y-6 rounded-2xl bg-background p-4 dark:bg-secondary"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted">
                Purchasing on{" "}
                <span className="font-sans font-semibold text-main">
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
                id="data-phone"
                label="Phone number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="08031234567"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                error={phoneError}
                className="bg-foreground"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                onClick={() => handlePhoneChange(PROFILE_PHONE_LOCAL)}
              >
                <Smartphone size={18} aria-hidden />
                Use my number
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-main">Validity</p>
              <div
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                role="tablist"
                aria-label="Bundle validity"
              >
                {DATA_VALIDITY_OPTIONS.map((opt) => {
                  const active = validity === opt.value;
                  return (
                    <div
                      key={opt.value}
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectValidity(opt.value)}
                      className={clsx(
                        "rounded-xl cursor-pointer border px-3 py-2.5 text-center text-sm transition-colors",
                        active
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-900 ring-2 ring-emerald-500/30 dark:text-emerald-100"
                          : "border-line bg-secondary text-main hover:border-emerald-500/40 hover:bg-secondary/50 dark:bg-foreground",
                      )}
                    >
                      {opt.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <p className="text-sm font-medium text-main">Data plans</p>
                <p className="text-xs text-muted">
                  Tap a bundle
                </p>
              </div>
              <div
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3"
                role="radiogroup"
                aria-label="Choose data bundle"
                aria-invalid={planError ? true : undefined}
              >
                {plansForValidity.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => selectPlan(plan)}
                      className={clsx(
                        "relative flex min-h-[108px] flex-col items-center justify-center rounded-2xl border px-3 py-3 text-center transition-all",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/35"
                          : "border-line bg-secondary hover:border-emerald-400/50 hover:bg-secondary/40 dark:bg-foreground",
                      )}
                    >
                      {plan.tag ? (
                        <span className="absolute left-2 top-2 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
                          {plan.tag}
                        </span>
                      ) : null}
                      <span className="font-space text-lg font-bold tabular-nums tracking-tight text-main">
                        {plan.bundle}
                      </span>
                      <span className="mt-2 font-space text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                        {formatNgn(plan.priceNgn)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {planError ? (
                <p className="text-xs font-medium text-red-600 dark:text-red-400">
                  {planError}
                </p>
              ) : null}
            </div>

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
          title="Confirm data purchase"
        >
          {selectedProvider && summaryPlan ? (
            <>
              <p className="mb-4 text-sm text-muted">
                Review your bundle before we charge your wallet.
              </p>
              <dl className="space-y-3 rounded-2xl border border-line bg-secondary/30 p-4 dark:bg-secondary/40">
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Service</dt>
                  <dd className="text-right font-medium text-main">Data bundle</dd>
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
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Validity</dt>
                  <dd className="text-right font-medium text-main">
                    {validityLabel}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted">Bundle</dt>
                  <dd className="font-space text-right font-semibold text-main">
                    {summaryPlan.bundle}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line pt-3 text-sm">
                  <dt className="text-muted">Total</dt>
                  <dd className="font-space text-right text-lg font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                    {formatNgn(summaryPlan.priceNgn)}
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
