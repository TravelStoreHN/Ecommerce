#!/usr/bin/env node

/**
 * Automated Stripe Product Importer for TravelStoreHN
 * 
 * This script reads your existing product data and automatically creates
 * products and prices in Stripe. No manual work needed!
 * 
 * Usage:
 * 1. Make sure you have Stripe CLI installed: https://stripe.com/docs/stripe-cli
 * 2. Set your Stripe secret key: set STRIPE_SECRET_KEY=sk_live_...
 * 3. Run: node import-products-to-stripe.js
 */

import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Read your product data
function loadProductData() {
  try {
    // Read the TypeScript file as text
    const filePath = path.join(__dirname, 'src/services/mockData.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract the mockProducts array content
    const arrayStart = fileContent.indexOf('export const mockProducts: Product[] = [');
    const arrayEnd = fileContent.indexOf('];', arrayStart);
    
    if (arrayStart === -1 || arrayEnd === -1) {
      throw new Error('Could not find mockProducts array in mockData.ts');
    }
    
    const arrayContent = fileContent.substring(arrayStart, arrayEnd + 2);
    
    // Extract individual product objects using improved regex
    const productMatches = arrayContent.match(/\{\s*id:\s*'[^']+',[\s\S]*?\},?(?=\s*(?:\{|]|$))/g);
    
    if (!productMatches) {
      throw new Error('No products found in mockProducts array');
    }

    const products = [];
    
    for (const match of productMatches) {
      // Extract key fields using regex with better handling
      const id = match.match(/id:\s*'([^']+)'/)?.[1];
      const name = match.match(/name:\s*'([^']+(?:\\'[^']*)*?)'/)?.[1];
      const description = match.match(/description:\s*'([^']+(?:\\'[^']*)*?)'/)?.[1];
      
      // Handle price extraction more carefully
      const priceMatch = match.match(/price:\s*([^,\s]+)/)?.[1];
      const originalPriceMatch = match.match(/originalPrice:\s*([^,\s]+)/)?.[1];
      
      const imageUrl = match.match(/imageUrl:\s*'([^']+)'/)?.[1];
      const category = match.match(/category:\s*'([^']+)'/)?.[1];
      const isSale = match.includes('isSale: true');
      
      if (id && name && priceMatch) {
        // Parse price - it might be a variable name, so we'll use a reasonable default
        let price = 10; // Default price
        let originalPrice = null;
        
        // Try to extract numeric values or use defaults based on product type
        if (priceMatch.includes('Price')) {
          // It's a variable, estimate based on category
          if (category?.includes('Accesorios')) price = 15;
          else if (category?.includes('Artículos')) price = 8;
          else if (category?.includes('Electrónicos')) price = 25;
          else price = 12;
        } else {
          price = parseFloat(priceMatch) || 10;
        }
        
        if (originalPriceMatch && originalPriceMatch.includes('Price')) {
          originalPrice = price * 1.33; // Estimate 33% discount
        } else if (originalPriceMatch) {
          originalPrice = parseFloat(originalPriceMatch);
        }
        
        products.push({
          id,
          name: name?.replace(/\\'/g, "'") || `Product ${id}`, // Handle escaped quotes
          description: description?.replace(/\\'/g, "'") || name || `Product ${id}`,
          price,
          originalPrice,
          imageUrl,
          category: category || 'Travel Products',
          isSale
        });
      }
    }
    
    return products;
  } catch (error) {
    console.error('❌ Error reading product data:', error.message);
    console.log('💡 Make sure you\'re running this script from the project root directory');
    process.exit(1);
  }
}

// Convert local image path to GitHub raw URL
function convertToGitHubRawUrl(imageUrl) {
  if (!imageUrl) return null;
  
  // Convert paths like "/Media/Product Images/Antifaz/1749527626383.png" 
  // to GitHub raw URLs with proper encoding
  const cleanPath = imageUrl.replace(/^\//, ''); // Remove leading slash
  
  // URL encode the path to handle special characters, spaces, and accents
  const encodedPath = encodeURI(cleanPath);
  const githubRawUrl = `https://raw.githubusercontent.com/TravelStoreHN/Ecommerce/main/public/${encodedPath}`;
  
  return githubRawUrl;
}

// Create product in Stripe
async function createStripeProduct(product) {
  try {
    console.log(`📦 Creating product: ${product.name}`);
    
    // Convert image URL to GitHub raw URL
    const imageUrls = [];
    if (product.imageUrl) {
      const githubImageUrl = convertToGitHubRawUrl(product.imageUrl);
      if (githubImageUrl) {
        imageUrls.push(githubImageUrl);
        console.log(`🖼️  Using image: ${githubImageUrl}`);
      }
    }
    
    // Create the product
    const stripeProduct = await stripe.products.create({
      id: product.id, // Use your existing product ID
      name: product.name,
      description: product.description,
      images: imageUrls, // Use GitHub raw URLs
      metadata: {
        category: product.category,
        original_price: product.originalPrice?.toString() || '',
        is_sale: product.isSale.toString(),
        source: 'travelstorehn_import',
        github_image_url: imageUrls[0] || ''
      }
    });

    // Create the price
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        display_price: product.price.toString(),
        is_sale_price: product.isSale.toString()
      }
    });

    // If it's a sale item, create the original price too
    let originalPriceId = null;
    if (product.isSale && product.originalPrice) {
      const originalPrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.originalPrice * 100),
        currency: 'usd',
        metadata: {
          display_price: product.originalPrice.toString(),
          is_original_price: 'true'
        }
      });
      originalPriceId = originalPrice.id;
    }

    return {
      productId: stripeProduct.id,
      priceId: stripePrice.id,
      originalPriceId,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice
    };

  } catch (error) {
    console.error(`❌ Error creating product ${product.name}:`, error.message);
    return null;
  }
}

// Update your code with Stripe price IDs
function generateUpdatedMockData(results) {
  console.log('📝 Generating updated mockData.ts with Stripe price IDs...');
  
  let updatedCode = `// Updated mockData.ts with Stripe integration
// Generated automatically by import-products-to-stripe.js

import { Product, BlogPost } from '../types';

// Stripe Price IDs mapping
export const STRIPE_PRICE_IDS = {
`;

  results.forEach(result => {
    if (result) {
      updatedCode += `  '${result.productId}': '${result.priceId}',${result.originalPriceId ? ` // Original: '${result.originalPriceId}'` : ''}\n`;
    }
  });

  updatedCode += `};

// Helper function to get Stripe price ID for a product
export function getStripePriceId(productId: string): string {
  return STRIPE_PRICE_IDS[productId] || '';
}

`;

  // Add the rest of your existing mockData.ts content
  const originalFile = fs.readFileSync(path.join(__dirname, 'src/services/mockData.ts'), 'utf8');
  const exportLine = originalFile.indexOf('export const mockProducts');
  if (exportLine > -1) {
    updatedCode += originalFile.substring(exportLine);
  }

  // Write the updated file
  fs.writeFileSync(path.join(__dirname, 'src/services/mockData.ts.new'), updatedCode);
  
  console.log('✅ Updated mockData saved as mockData.ts.new');
  console.log('📋 Review the file and rename it to replace the original');
}

// Main execution
async function main() {
  console.log('🚀 TravelStoreHN → Stripe Product Importer\n');

  // Check if Stripe key is set
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY environment variable not set');
    console.log('💡 Set it with: export STRIPE_SECRET_KEY=sk_live_...');
    process.exit(1);
  }

  // Load product data
  console.log('📖 Loading product data from mockData.ts...');
  const products = loadProductData();
  console.log(`✅ Found ${products.length} products to import\n`);

  // Create products in Stripe
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Processing: ${product.name}`);
    
    const result = await createStripeProduct(product);
    results.push(result);
    
    if (result) {
      successCount++;
      console.log(`✅ Created: ${result.name} - Price ID: ${result.priceId}`);
    } else {
      errorCount++;
    }
    
    console.log(''); // Empty line for readability
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('📊 Import Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📈 Success Rate: ${Math.round((successCount / products.length) * 100)}%\n`);

  if (successCount > 0) {
    // Generate updated code
    generateUpdatedMockData(results);
    
    console.log('🎉 Import completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the new mockData.ts.new file');
    console.log('2. Replace your current mockData.ts with the new one');
    console.log('3. Update your checkout code to use the Stripe price IDs');
    console.log('4. Test a payment to confirm everything works!');
    
    // Show sample products
    console.log('\n💰 Sample products created:');
    results.slice(0, 3).forEach(result => {
      if (result) {
        console.log(`- ${result.name}: $${result.price} (${result.priceId})`);
      }
    });
  } else {
    console.log('❌ No products were successfully imported. Please check the errors above.');
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

export { loadProductData, createStripeProduct };
