// Stripe Price IDs mapping - Generated from import script
const STRIPE_PRICE_IDS = {
  'prod-001': 'price_1RkRZtAcgfSKsJf0IixT4pTF',
  'prod-002': 'price_1RkRZtAcgfSKsJf0PMOoO4ZZ',
  'prod-003': 'price_1RkRZuAcgfSKsJf0FAEqOXiG',
  'prod-004': 'price_1RkRZvAcgfSKsJf0x10MqL8g',
  'prod-005': 'price_1RkRZwAcgfSKsJf04opVU9Fk',
  'prod-006': 'price_1RkRZwAcgfSKsJf0BJuUXAgT',
  'prod-007': 'price_1RkRZxAcgfSKsJf0bTiAFyGZ',
  'prod-008': 'price_1RkRZxAcgfSKsJf0DsenRP12',
  'prod-009': 'price_1RkRZyAcgfSKsJf0xrMI24iA',
  'prod-010': 'price_1RkRZzAcgfSKsJf0athvuo9Z',
  'prod-011': 'price_1RkRZzAcgfSKsJf0dMUSRjS0',
  'prod-012': 'price_1RkRa0AcgfSKsJf0vl2ziT8F',
  'prod-013': 'price_1RkRa0AcgfSKsJf0FzZl2pT2',
  'prod-014': 'price_1RkRa1AcgfSKsJf0efCiPBOk',
  'prod-015': 'price_1RkRa2AcgfSKsJf0kt3NWWo0',
};

// Helper function to get Stripe price ID for a product
function getStripePriceId(productId) {
  return STRIPE_PRICE_IDS[productId] || null;
}

module.exports = {
  STRIPE_PRICE_IDS,
  getStripePriceId
};
