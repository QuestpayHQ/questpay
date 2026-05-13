/** Bundles shown after choosing Daily / Weekly / Monthly / Yearly (placeholder catalog). */
export type DataValidity = "daily" | "weekly" | "monthly" | "yearly";

export const DATA_VALIDITY_OPTIONS: readonly {
  value: DataValidity;
  label: string;
  shortLabel: string;
}[] = [
  { value: "daily", label: "Daily", shortLabel: "Day" },
  { value: "weekly", label: "Weekly", shortLabel: "Week" },
  { value: "monthly", label: "Monthly", shortLabel: "Month" },
  { value: "yearly", label: "Yearly", shortLabel: "Year" },
] as const;

export type DataPlan = {
  id: string;
  validity: DataValidity;
  /** e.g. "1.5GB" */
  bundle: string;
  priceNgn: number;
  /** Optional promo line under price */
  tag?: string;
};

export const DATA_PLANS: DataPlan[] = [
  {
    id: "d-50mb",
    validity: "daily",
    bundle: "50MB",
    priceNgn: 50,
  },
  {
    id: "d-100mb",
    validity: "daily",
    bundle: "100MB",
    priceNgn: 100,
  },
  {
    id: "d-200mb",
    validity: "daily",
    bundle: "200MB",
    priceNgn: 200,
  },
  {
    id: "d-1gb",
    validity: "daily",
    bundle: "1GB",
    priceNgn: 350,
    tag: "Popular",
  },
  {
    id: "d-2gb",
    validity: "daily",
    bundle: "2GB",
    priceNgn: 500,
  },
  {
    id: "w-750mb",
    validity: "weekly",
    bundle: "750MB",
    priceNgn: 500,
  },
  {
    id: "w-2gb",
    validity: "weekly",
    bundle: "2GB",
    priceNgn: 1200,
  },
  {
    id: "w-6gb",
    validity: "weekly",
    bundle: "6GB",
    priceNgn: 2500,
    tag: "Best value",
  },
  {
    id: "w-12gb",
    validity: "weekly",
    bundle: "12GB",
    priceNgn: 4500,
  },
  {
    id: "m-2gb",
    validity: "monthly",
    bundle: "2GB",
    priceNgn: 1200,
  },
  {
    id: "m-5gb",
    validity: "monthly",
    bundle: "5GB",
    priceNgn: 2500,
  },
  {
    id: "m-11gb",
    validity: "monthly",
    bundle: "11GB",
    priceNgn: 4500,
    tag: "Popular",
  },
  {
    id: "m-25gb",
    validity: "monthly",
    bundle: "25GB",
    priceNgn: 7500,
  },
  {
    id: "m-40gb",
    validity: "monthly",
    bundle: "40GB",
    priceNgn: 10000,
  },
  {
    id: "y-72gb",
    validity: "yearly",
    bundle: "72GB",
    priceNgn: 18000,
    tag: "12 mo bundle",
  },
  {
    id: "y-120gb",
    validity: "yearly",
    bundle: "120GB",
    priceNgn: 28000,
  },
  {
    id: "y-240gb",
    validity: "yearly",
    bundle: "240GB",
    priceNgn: 48000,
  },
];

export function getDataPlansByValidity(validity: DataValidity): DataPlan[] {
  return DATA_PLANS.filter((p) => p.validity === validity);
}
