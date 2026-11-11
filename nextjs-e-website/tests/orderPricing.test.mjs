import assert from "node:assert/strict";
import test from "node:test";
import { priceToCents } from "../src/lib/money.mjs";
import { assertCheckoutInput, priceOrderLines } from "../src/lib/orderPricing.mjs";

test("priceToCents arrondit au centime", () => {
  assert.equal(priceToCents("19.99"), 1999);
  assert.equal(priceToCents(10), 1000);
  assert.equal(priceToCents("10,5"), 1050);
});

test("priceToCents rejette un prix négatif", () => {
  assert.throws(() => priceToCents("-1"));
});

test("le prix envoyé par le client n'entre pas dans le calcul", () => {
  const priced = priceOrderLines(
    [{ id: "abc", quantity: 2 }],
    { abc: { name: "Run", price: "80", clientPrice: "1" } }
  );
  assert.equal(priced.lines[0].unitPriceCents, 8000);
  assert.equal(priced.totalCents, 16000);
});

test("deux lignes du même article sont fusionnées", () => {
  const { items } = assertCheckoutInput({
    name: "Ada",
    email: "ada@example.com",
    phone: "0102030405",
    address: "1 rue du Port",
    zipcode: "44000",
    city: "Nantes",
    country: "France",
    items: [
      { id: "shoe1", quantity: 2, unitPriceCents: 1 },
      { id: "shoe1", quantity: 3, unitPriceCents: 1 },
    ],
  });
  assert.deepEqual(items, [{ id: "shoe1", quantity: 5 }]);
});

test("une quantité supérieure à 10 est refusée", () => {
  assert.throws(() => assertCheckoutInput({
    name: "Ada",
    email: "ada@example.com",
    phone: "0102030405",
    address: "1 rue du Port",
    zipcode: "44000",
    city: "Nantes",
    country: "France",
    items: [
      { id: "shoe1", quantity: 6 },
      { id: "shoe1", quantity: 6 },
    ],
  }));
});
