// Verdicts and money formatting. One job: turn a deal's two prices into the numbers
// and labels the site shows, and keep every discount on the site honest (computed
// from the two prices, never typed by hand).

export function discountPct(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function saving(deal) {
  return deal.was - deal.price;
}

export function money(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

export function moneyFull(n) {
  return "$" + n.toFixed(2);
}

export const VERDICT_LABELS = {
  "new-low": "New low",
  strong: "Strong price",
  routine: "Routine sale",
};

export function verdictLabel(deal) {
  return VERDICT_LABELS[deal.verdict] || "Deal";
}

// Sort keys: biggest percent off, biggest dollar saving, price low to high, price high to low.
export const SORTS = [
  { id: "pct", label: "Biggest % off" },
  { id: "saving", label: "Biggest $ saving" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

export function sortDeals(list, sortId) {
  const arr = [...list];
  if (sortId === "pct") arr.sort((a, b) => discountPct(b) - discountPct(a));
  else if (sortId === "saving") arr.sort((a, b) => saving(b) - saving(a));
  else if (sortId === "price-asc") arr.sort((a, b) => a.price - b.price);
  else if (sortId === "price-desc") arr.sort((a, b) => b.price - a.price);
  return arr;
}

// Short "checked" label: "Nov 27, 2026, 08:09 UTC".
export function checkedLabel(iso) {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}, ${hh}:${mm} UTC`;
}
