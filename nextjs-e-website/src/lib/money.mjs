export function priceToCents(price) {
  const normalized = typeof price === "number"
    ? price
    : Number(String(price).trim().replace(",", "."));

  if (!Number.isFinite(normalized) || normalized < 0 || normalized > 100000) {
    throw new Error("Prix invalide");
  }

  return Math.round(normalized * 100);
}
