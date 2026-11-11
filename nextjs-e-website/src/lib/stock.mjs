export function readStock(current) {
  if (typeof current === "number" && Number.isInteger(current) && current >= 0) {
    return current;
  }
  if (typeof current === "string" && /^\d+$/.test(current.trim())) {
    return Number(current);
  }
  return null;
}

export function stockAfterReserve(current, quantity) {
  const stock = readStock(current);
  if (stock === null || stock < quantity) {
    return null;
  }
  return stock - quantity;
}

export function stockAfterRelease(current, quantity) {
  const stock = readStock(current);
  if (stock === null) {
    return null;
  }
  return stock + quantity;
}
