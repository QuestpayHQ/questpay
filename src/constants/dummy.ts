export const RECENT_TRANSACTIONS: {
  id: string;
  label: string;
  dateLabel: string;
  amount: number;
  status: "success" | "pending" | "failed";
}[] = [
  {
    id: "1",
    label: "MTN data — 2 GB",
    dateLabel: "Today · 9:14",
    amount: -2500,
    status: "success",
  },
  {
    id: "2",
    label: "Wallet funding",
    dateLabel: "Yesterday · 16:02",
    amount: 50_000,
    status: "success",
  },
  {
    id: "3",
    label: "Virtual card top-up",
    dateLabel: "May 9 · 11:40",
    amount: -10_000,
    status: "pending",
  },
  {
    id: "4",
    label: "Airtime — Airtel",
    dateLabel: "May 8 · 08:22",
    amount: -500,
    status: "success",
  },
  {
    id: "5",
    label: "Gift card sale (Amazon)",
    dateLabel: "May 7 · 19:51",
    amount: 42_300,
    status: "success",
  },
];