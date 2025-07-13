// Stripe Product Setup Script
// Run this in your browser console on the Stripe Dashboard Products page
// Or use this as reference for manual product creation

const TRAVELSTORE_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Adaptador Universal BOPU-1033',
    price_usd: 10.05, // L.25.13 / 25
    description: 'Adaptador universal para viajes internacionales con 4 puertos USB'
  },
  {
    id: 'prod-002', 
    name: 'Adaptador Giratorio EU',
    price_usd: 5.02, // L.12.56 / 25
    description: 'Adaptador giratorio para enchufes europeos'
  },
  {
    id: 'prod-003',
    name: 'Antifaz para Dormir',
    price_usd: 7.54, // L.18.84 / 25
    description: 'Antifaz cómodo para un sueño reparador durante viajes'
  },
  {
    id: 'prod-004',
    name: 'Atomizador de Perfume',
    price_usd: 3.76, // L.9.41 / 25
    description: 'Atomizador recargable perfecto para llevar tu fragancia favorita'
  },
  {
    id: 'prod-005',
    name: 'Báscula Digital para Equipaje',
    price_usd: 6.28, // L.15.70 / 25
    description: 'Báscula portátil para evitar exceso de equipaje'
  },
  {
    id: 'prod-006',
    name: 'Bolsa para Vómito',
    price_usd: 8.80, // L.21.99 / 25
    description: 'Bolsas desechables para emergencias durante el viaje'
  },
  {
    id: 'prod-007',
    name: 'Cepillo de Bambú',
    price_usd: 5.65, // L.14.13 / 25
    description: 'Cepillo ecológico de bambú para cuidado dental'
  },
  {
    id: 'prod-008',
    name: 'Correa para Equipaje',
    price_usd: 11.31, // L.28.27 / 25
    description: 'Correa resistente para asegurar equipaje'
  },
  {
    id: 'prod-009',
    name: 'Etiqueta para Equipaje',
    price_usd: 8.17, // L.20.42 / 25
    description: 'Etiquetas identificativas duraderas para maletas'
  },
  {
    id: 'prod-010',
    name: 'Hilo Dental de Bambú',
    price_usd: 12.56, // L.31.40 / 25
    description: 'Hilo dental ecológico biodegradable'
  },
  // Travel Kits
  {
    id: 'kit-001',
    name: 'Kit de Aseo Personal',
    price_usd: 10.05, // L.25.13 / 25
    description: 'Kit completo con todos los esenciales para mantener tu higiene personal'
  },
  {
    id: 'kit-002',
    name: 'Kit de Vuelo Confort',
    price_usd: 8.37, // L.20.93 / 25
    description: 'Todo lo necesario para un vuelo cómodo y relajante'
  },
  {
    id: 'kit-003',
    name: 'Kit Digital del Viajero',
    price_usd: 12.56, // L.31.40 / 25
    description: 'Mantén tus dispositivos conectados y seguros en cualquier destino'
  }
];

// Instructions for manual creation:
console.log('=== STRIPE PRODUCT SETUP INSTRUCTIONS ===');
console.log('');
console.log('Copy and paste these products into your Stripe Dashboard:');
console.log('Go to Products > Add Product for each item');
console.log('');

TRAVELSTORE_PRODUCTS.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Price: $${product.price_usd.toFixed(2)} USD`);
  console.log(`   Description: ${product.description}`);
  console.log(`   Product ID: ${product.id}`);
  console.log('   ---');
});

console.log('');
console.log('=== AUTOMATED SETUP (if using Stripe CLI) ===');
console.log('stripe products create --name="Product Name" --description="Description"');
console.log('stripe prices create --unit-amount=1005 --currency=usd --product=prod_xxx');

// Export for programmatic use
if (typeof module !== 'undefined') {
  module.exports = TRAVELSTORE_PRODUCTS;
}
