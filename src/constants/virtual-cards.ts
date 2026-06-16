/** One-time fee charged when a USD virtual card is created (shown at checkout). */
export const USD_VIRTUAL_CARD_ISSUANCE_FEE_USD = 5 as const;

export type VirtualCardCurrency = "ngn" | "usd";

export function parseVirtualCardCurrency(
  value: string | null,
): VirtualCardCurrency {
  return value === "usd" ? "usd" : "ngn";
}

export interface CreatedVirtualCard {
  card_id: string;
  card_number: string;
  expiry: string;
  cvv: string;
  balance: number;
  currency: "NGN" | "USD";
  label?: string;
}

export interface CreateVirtualCardResponse {
  status: "success";
  message: string;
  data: CreatedVirtualCard;
}

/** Swap for a real API call when the endpoint is available. */
export async function createVirtualCard(
  currency: VirtualCardCurrency,
  _label?: string,
): Promise<CreateVirtualCardResponse> {
  await new Promise((r) => setTimeout(r, 700));
  const apiCurrency = currency === "usd" ? "USD" : "NGN";
  return {
    status: "success",
    message: `${apiCurrency} card created`,
    data: {
      card_id: "31e8fb3eccdadd381ec5a43995ef11ebfb7ab9a8",
      card_number:
        currency === "usd" ? "507874******9520" : "506099******4521",
      expiry: "08/28",
      cvv: "455",
      balance: 0,
      currency: apiCurrency,
    },
  };
}

/** Shown on list and create flows — keep language accurate and jurisdiction-agnostic where possible. */
export const virtualCardImportantInformation: readonly string[] = [
  "Virtual cards are prepaid debit instruments for authorised online purchases only; they are not credit products and remain subject to account verification.",
  "NGN cards are denominated and settled in Nigerian Naira from your wallet. USD cards are denominated in USD; any conversion from your balance uses the rate shown in-app before you confirm.",
  `USD virtual cards include a non-refundable one-time issuance fee of $${USD_VIRTUAL_CARD_ISSUANCE_FEE_USD}, charged when the card is created, separate from the amount you load.`,
  "Merchants may place pre-authorisations or temporary holds that differ from the final settlement amount until the transaction completes.",
  "Refunds and chargebacks follow card-network and merchant rules; timelines and success are not guaranteed by Questpay.",
  "Protect your card details. Do not share your card number, CVV, or OTPs. Report suspected unauthorised use immediately through support.",
  "We may decline, suspend, or close cards where we suspect fraud, sanctions exposure, unlawful use, or breach of applicable policies or law.",
  "Transaction and balance limits may apply as displayed in the app and can change with notice where regulators or partners require.",
];

export type VirtualCardListItem = CreatedVirtualCard;

/** Swap for a real API call when the list endpoint is available. */
export async function fetchVirtualCards(): Promise<VirtualCardListItem[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_VIRTUAL_CARDS;
}

/** Demo data — replace with API results. Empty array shows the onboarding empty state. */
export const MOCK_VIRTUAL_CARDS: VirtualCardListItem[] = [];
