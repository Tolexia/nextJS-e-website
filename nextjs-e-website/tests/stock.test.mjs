import assert from "node:assert/strict";
import test from "node:test";
import { readStock, stockAfterRelease, stockAfterReserve } from "../src/lib/stock.mjs";

test("un stock absent ne peut pas être réservé", () => {
  assert.equal(readStock(undefined), null);
  assert.equal(stockAfterReserve(undefined, 1), null);
  assert.equal(stockAfterReserve("3", 1), 2);
});

test("la réservation refuse une quantité supérieure au stock", () => {
  assert.equal(stockAfterReserve(1, 2), null);
  assert.equal(stockAfterReserve(2, 2), 0);
});

test("la libération rend la quantité réservée", () => {
  assert.equal(stockAfterRelease(0, 2), 2);
  assert.equal(stockAfterRelease(null, 2), null);
});
