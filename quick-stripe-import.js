#!/usr/bin/env node

/**
 * Quick Stripe Product Importer for TravelStoreHN
 * 
 * This script creates a JSON file that you can import to Stripe
 * using the Stripe CLI or dashboard.
 */

const fs = require('fs');
const path = require('path');

// Simplified product data (manually extracted from your mockData.ts)
const products = [
  {
    id: 'prod-001',
    name: 'Báscula Digital para Equipaje de Acero Inoxidable',
    description: 'Asegura que tu equipaje cumpla con las regulaciones de peso con esta báscula digital de alta precisión.',
    price: 14.28,
    originalPrice: 19.04,
    category: 'Accesorios de Viaje',
    isSale: true,
    imageUrl: '/Media/Product Images/Báscula Digital para Equipaje/44-090.jpg'
  },
  {
    id: 'prod-002',
    name: 'Antifaz de Viaje Ultra Suave con Espuma de Memoria',
    description: 'Duerme cómodamente en cualquier lugar con este antifaz de viaje de primera calidad.',
    price: 10.71,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Antifaz/1749527626383.png'
  },
  {
    id: 'prod-003',
    name: 'Etiqueta de Identificación para Equipaje',
    description: 'Mantén tu equipaje identificado y seguro con esta etiqueta duradera.',
    price: 2.61,
    originalPrice: 3.48,
    category: 'Accesorios de Viaje',
    isSale: true,
    imageUrl: '/Media/Product Images/Etiqueta para Equipaje/1749527819013.png'
  },
  {
    id: 'prod-004',
    name: 'Correa Ajustable para Equipaje de Viaje',
    description: 'Mantén tu equipaje seguro y organizado con esta correa ajustable y resistente.',
    price: 6.08,
    category: 'Accesorios de Viaje',
    isSale: false,
    imageUrl: '/Media/Product Images/Correa para Equipaje/1749528271398.png'
  },
  {
    id: 'prod-005',
    name: 'Toalla de Viaje Magnética y Compacta',
    description: 'Toalla de microfibra ultra compacta con cierre magnético para viajeros inteligentes.',
    price: 15.84,
    originalPrice: 21.12,
    category: 'Artículos de Tocador',
    isSale: true,
    imageUrl: '/Media/Product Images/Toalla Magnética/1749528488556.png'
  },
  {
    id: 'prod-006',
    name: 'Tapones para Oídos de Viaje de Silicona',
    description: 'Bloquea el ruido y duerme tranquilo con estos tapones de silicona cómodos y reutilizables.',
    price: 3.25,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Tapón para oídos/1749527962231.png'
  },
  {
    id: 'prod-007',
    name: 'Cepillo de Dientes de Bambú Ecológico',
    description: 'Cepillo de dientes sostenible y portátil, perfecto para viajeros conscientes del medio ambiente.',
    price: 1.96,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Cepillo de Bambú/1749528018263.png'
  },
  {
    id: 'prod-008',
    name: 'Láminas de Jabón Portátiles para Manos',
    description: 'Mantén tus manos limpias en cualquier lugar con estas láminas de jabón ultra portátiles.',
    price: 4.87,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Láminas de jabón para manos/1749528095742.png'
  },
  {
    id: 'prod-009',
    name: 'Hilo Dental de Bambú Ecológico',
    description: 'Mantén tu higiene dental en viajes con este hilo dental ecológico y biodegradable.',
    price: 3.90,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Hilo dental de Bambú/1749528149406.png'
  },
  {
    id: 'prod-010',
    name: 'Atomizador de Viaje Recargable',
    description: 'Lleva tus perfumes y líquidos favoritos en este atomizador compacto y elegante.',
    price: 6.73,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Atomizador/1749528197870.png'
  },
  {
    id: 'prod-011',
    name: 'Bolsa Impermeable para Vómito de Viaje',
    description: 'Bolsa hermética y discreta para emergencias de viaje, especialmente útil en transporte.',
    price: 1.30,
    category: 'Accesorios de Viaje',
    isSale: false,
    imageUrl: '/Media/Product Images/Bolsa para vómito/1749528235598.png'
  },
  {
    id: 'prod-012',
    name: 'Bata de Baño Compacta para Mujer',
    description: 'Bata ligera y compacta, ideal para spas, hoteles y viajes de relajación.',
    price: 9.74,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Bata de baño para mujer/1749528306055.png'
  },
  {
    id: 'prod-013',
    name: 'Adaptador Universal de Viaje BOPU-1033',
    description: 'Adaptador universal compatible con más de 150 países, sin puerto USB.',
    price: 14.25,
    category: 'Electrónicos',
    isSale: false,
    imageUrl: '/Media/Product Images/Adaptador Universal/1749530876933.png'
  },
  {
    id: 'prod-014',
    name: 'Adaptador Giratorio EU para Cargador',
    description: 'Adaptador compacto con rotación de 360° para enchufes europeos.',
    price: 5.51,
    category: 'Electrónicos',
    isSale: false,
    imageUrl: '/Media/Product Images/Adaptador Giratorio EU/1749528881468.png'
  },
  {
    id: 'prod-015',
    name: 'Máscara de Vapor de Lavanda para Autocalentamiento',
    description: 'Máscara relajante con vapor de lavanda para aliviar el estrés durante los viajes.',
    price: 8.43,
    category: 'Artículos de Tocador',
    isSale: false,
    imageUrl: '/Media/Product Images/Antifaz/1749527670995.png'
  }
];

// Generate Stripe-compatible JSON
function generateStripeImport() {
  const stripeData = {
    products: [],
    prices: []
  };

  products.forEach(product => {
    // Create product object
    const stripeProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      images: [`https://travelstorehn.com${product.imageUrl}`],
      metadata: {
        category: product.category,
        is_sale: product.isSale.toString(),
        original_price: product.originalPrice?.toString() || '',
        source: 'travelstorehn'
      }
    };

    // Create price object
    const stripePrice = {
      id: `price_${product.id}`,
      product: product.id,
      unit_amount: Math.round(product.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        display_price: product.price.toString(),
        is_sale_price: product.isSale.toString()
      }
    };

    stripeData.products.push(stripeProduct);
    stripeData.prices.push(stripePrice);

    // If it's a sale item, create original price too
    if (product.isSale && product.originalPrice) {
      const originalPrice = {
        id: `price_${product.id}_original`,
        product: product.id,
        unit_amount: Math.round(product.originalPrice * 100),
        currency: 'usd',
        metadata: {
          display_price: product.originalPrice.toString(),
          is_original_price: 'true'
        }
      };
      stripeData.prices.push(originalPrice);
    }
  });

  return stripeData;
}

// Generate Stripe CLI commands
function generateStripeCLICommands() {
  let commands = '#!/bin/bash\n\n';
  commands += '# Stripe CLI commands to create all TravelStoreHN products\n';
  commands += '# Run these commands one by one, or save as a .sh file and execute\n\n';

  products.forEach((product, index) => {
    commands += `# Product ${index + 1}: ${product.name}\n`;
    commands += `stripe products create \\\n`;
    commands += `  --name "${product.name}" \\\n`;
    commands += `  --description "${product.description}" \\\n`;
    commands += `  --metadata[category]="${product.category}" \\\n`;
    commands += `  --metadata[is_sale]="${product.isSale}" \\\n`;
    commands += `  --id ${product.id}\n\n`;

    commands += `stripe prices create \\\n`;
    commands += `  --unit-amount ${Math.round(product.price * 100)} \\\n`;
    commands += `  --currency usd \\\n`;
    commands += `  --product ${product.id} \\\n`;
    commands += `  --metadata[display_price]="${product.price}"\n\n`;

    if (product.isSale && product.originalPrice) {
      commands += `# Original price for sale item\n`;
      commands += `stripe prices create \\\n`;
      commands += `  --unit-amount ${Math.round(product.originalPrice * 100)} \\\n`;
      commands += `  --currency usd \\\n`;
      commands += `  --product ${product.id} \\\n`;
      commands += `  --metadata[display_price]="${product.originalPrice}" \\\n`;
      commands += `  --metadata[is_original_price]="true"\n\n`;
    }

    commands += `echo "✅ Created: ${product.name}"\n`;
    commands += `echo ""\n\n`;
  });

  return commands;
}

// Main execution
function main() {
  console.log('🚀 TravelStoreHN Stripe Import Generator\n');

  // Generate files
  const stripeData = generateStripeImport();
  const cliCommands = generateStripeCLICommands();

  // Write JSON file
  fs.writeFileSync('stripe-products-import.json', JSON.stringify(stripeData, null, 2));
  console.log('✅ Generated: stripe-products-import.json');

  // Write CLI commands
  fs.writeFileSync('create-stripe-products.sh', cliCommands);
  console.log('✅ Generated: create-stripe-products.sh');

  // Write simplified mapping
  const priceMapping = {};
  products.forEach(product => {
    priceMapping[product.id] = `price_${product.id}`;
  });
  fs.writeFileSync('stripe-price-mapping.json', JSON.stringify(priceMapping, null, 2));
  console.log('✅ Generated: stripe-price-mapping.json');

  console.log('\n📋 How to use these files:');
  console.log('\n🎯 Option 1: Stripe CLI (Recommended)');
  console.log('1. Install Stripe CLI: https://stripe.com/docs/stripe-cli');
  console.log('2. Login: stripe login');
  console.log('3. Run: chmod +x create-stripe-products.sh && ./create-stripe-products.sh');
  
  console.log('\n🎯 Option 2: Manual Import');
  console.log('1. Go to your Stripe Dashboard');
  console.log('2. Use the JSON data in stripe-products-import.json');
  console.log('3. Create each product manually');

  console.log('\n📊 Summary:');
  console.log(`📦 Total products: ${products.length}`);
  console.log(`🏷️ Sale items: ${products.filter(p => p.isSale).length}`);
  console.log(`💰 Price range: $${Math.min(...products.map(p => p.price))} - $${Math.max(...products.map(p => p.price))}`);

  console.log('\n🚀 After importing to Stripe:');
  console.log('1. Update your mockData.ts with the actual Stripe price IDs');
  console.log('2. Test a payment to make sure everything works');
  console.log('3. Your store will be ready to accept real payments!');
}

if (require.main === module) {
  main();
}
