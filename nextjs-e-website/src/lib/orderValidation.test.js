import assert from 'node:assert/strict';
import test from 'node:test';
import { validateAndSanitizePublicOrder } from './orderValidation.js';

const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '+33123456789',
  address: '12 Rue de la Paix',
  zipcode: '75002',
  city: 'Paris',
  country: 'France',
  paymentMethod: 'e-Money',
  emoneynumber: '24304530',
  emoneypin: '6891',
  website: '',
  items: [{ name: 'Sneaker', brand: 'Acme', price: 120, nb: 2 }],
};

test('accepts a valid public order and strips the PIN', () => {
  const result = validateAndSanitizePublicOrder(validBody);
  assert.equal(result.ok, true);
  assert.equal(result.order.status, 'en attente');
  assert.equal(result.order.emoneynumberLast4, '4530');
  assert.equal(result.order.emoneypin, undefined);
  assert.equal(result.order.items[0].nb, 2);
});

test('rejects honeypot submissions silently', () => {
  const result = validateAndSanitizePublicOrder({ ...validBody, website: 'http://spam.test' });
  assert.equal(result.ok, false);
  assert.equal(result.silent, true);
});

test('rejects invalid email and empty cart', () => {
  assert.equal(validateAndSanitizePublicOrder({ ...validBody, email: 'nope' }).ok, false);
  assert.equal(validateAndSanitizePublicOrder({ ...validBody, items: [] }).ok, false);
});
