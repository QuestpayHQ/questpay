import {
  BitcoinRefresh,
  CallCalling,
  Card,
  Flash,
  Home,
  Mobile,
  ShoppingCart,
  Setting,
  TrendUp,
  Wallet3,
  WalletAdd,
  Wifi,
  Profile2User,
  MoneyRecive,
  EmptyWallet,
} from "iconsax-reactjs";
import { TicketPercent } from "lucide-react";

export const navLinks = [
  { label: "Home", to: "/home", icon: Home },
  { label: "Help & Support", to: "/help-support", icon: WalletAdd },
];

export const navItems = [
  { label: "Overview", to: "/dashboard", icon: Home },
  { label: "Wallet", to: "/wallet", icon: EmptyWallet },
  { label: "Virtual Cards", to: "/services/cards", icon: Card },
  { label: "Buy & Sell Giftcard", to: "/services/giftcard", icon: BitcoinRefresh },
  { label: "Airtime Purchase", to: "/services/airtime", icon: Mobile },
  { label: "Data Purchase", to: "/services/data", icon: Wifi },
  { label: "SMM Services", to: "/services/smm", icon: TrendUp },
  { label: "Social Accounts", to: "/services/accounts", icon: ShoppingCart },
  { label: "Numbers & eSIM", to: "/services/numbers", icon: CallCalling },
  { label: "Coupons", to: "/coupons", icon: TicketPercent },
  { label: "Transactions", to: "/transactions", icon: Wallet3 },
  { label: "Referrals", to: "/referrals", icon: Profile2User },
  { label: "Affiliate", to: "/affiliate", icon: MoneyRecive },
  { label: "Settings", to: "/settings", icon: Setting },
];

export const services = [
  {
    title: "Data Purchase",
    description: "Purchase cheap data easily and quickly",
    icon: Wifi,
    color: "text-green-500 bg-green-500/10",
    link: "/services/data",
  },
  {
    title: "Airtime Purchase",
    description: "Purchase cheap airtime easily and quickly",
    icon: CallCalling,
    color: "text-blue-500 bg-blue-500/10",
    link: "/services/airtime",
  },
  {
    title: "Social Media Booost",
    description: "Boost your social media accounts easily and quickly",
    icon: Flash,
    color: "text-yellow-500 bg-yellow-500/10",
    link: "/services/smm",
  },
  {
    title: "Social Accounts",
    description: "Buy verified social media accounts securely",
    icon: ShoppingCart,
    color: "text-emerald-500 bg-emerald-500/10",
    link: "/services/accounts",
  },
  {
    title: "Numbers & eSIM",
    description: "Get virtual numbers for SMS verification & rentals",
    icon: CallCalling,
    color: "text-cyan-500 bg-cyan-500/10",
    link: "/services/numbers",
  },
  {
    title: "Virtual Cards",
    description: "Create and manage virtual debit cards",
    icon: Card,
    color: "text-amber-500 bg-amber-500/10",
    link: "/services/cards",
  },
  {
    title: "Sell Giftcard",
    description: "Sell giftcards easily and quickly",
    icon: BitcoinRefresh,
    color: "text-pink-500 bg-pink-500/10",
    link: "/services/giftcard",
  },
];

export type ServiceItem = (typeof services)[number];

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  /** Accent: Tailwind text, soft bg, and ring for chips / section borders */
  color: string;
  items: ServiceItem[];
};

function servicesByLinks(links: string[]): ServiceItem[] {
  return links
    .map((link) => services.find((s) => s.link === link))
    .filter((s): s is ServiceItem => s !== undefined);
}

/** Dashboard services grouped for browsing by category */
export const categoriesServices: ServiceCategory[] = [
  {
    id: "mobile-topups",
    title: "Mobile top-ups",
    description: "Data and airtime for all major networks",
    color: "text-emerald-600 bg-emerald-500/10",
    items: servicesByLinks(["/services/data", "/services/airtime"]),
  },
  {
    id: "social",
    title: "Social & growth",
    description: "Boost reach and buy verified accounts",
    color: "text-fuchsia-600 bg-fuchsia-500/10 dark:text-fuchsia-400",
    items: servicesByLinks(["/services/smm", "/services/accounts"]),
  },
  {
    id: "numbers-sim",
    title: "Numbers & eSIM",
    description: "Virtual numbers and eSIM for verification",
    color: "text-cyan-600 bg-cyan-500/10 dark:text-cyan-400",
    items: servicesByLinks(["/services/numbers"]),
  },
  {
    id: "cards-giftcards",
    title: "Cards & giftcards",
    description: "Virtual cards and giftcard payouts",
    color: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
    items: servicesByLinks(["/services/cards", "/services/giftcard"]),
  },
];

export const networkProviders = [
  {
    id: 1,
    title: "MTN",
    img: "/icons/mtn.svg",
  },
  {
    id: 2,
    title: "Airtel",
    img: "/icons/airtel.svg",
  },
  {
    id: 3,
    title: "Glo",
    img: "/icons/glo.svg",
  },
  {
    id: 4,
    title: "9mobile",
    img: "/icons/9mobile.svg",
  },
];

export const socialMediaPlatforms = [
  {
    id: "instagram",
    title: "Instagram",
    color: "from-purple-500 to-pink-500",
    img: "/icons/instagram.svg",
  },
  {
    id: "tiktok",
    title: "TikTok",
    color: "from-black to-cyan-500",
    img: "/icons/tiktok.svg",
  },
  {
    id: "youtube",
    title: "YouTube",
    color: "from-red-600 to-red-500",
    img: "/icons/youtube.svg",
  },
  {
    id: "x/twitter",
    title: "X (Twitter)",
    color: "from-blue-400 to-blue-500",
    img: "/icons/x.svg",
  },
  {
    id: "facebook",
    title: "Facebook",
    color: "from-blue-600 to-blue-700",
    img: "/icons/facebook.svg",
  },
];
