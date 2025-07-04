import { CartItem } from '../contexts/CartContext';
import { formatCurrency } from '../utils/localization';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

interface WhatsAppOrderConfig {
  phoneNumber: string;
  businessName: string;
}

class WhatsAppService {
  private config: WhatsAppOrderConfig = {
    phoneNumber: WHATSAPP_CONFIG.BUSINESS_PHONE, // Now using your config
    businessName: WHATSAPP_CONFIG.BUSINESS_NAME
  };

  updateConfig(config: Partial<WhatsAppOrderConfig>) {
    this.config = { ...this.config, ...config };
  }

  generateOrderMessage(cartItems: CartItem[], cartSubtotal: number, language: string, currency: string): string {
    const isSpanish = language === 'es';
    
    let message = isSpanish 
      ? `¡Hola! Me gustaría cotizar los siguientes productos de ${this.config.businessName}:\n\n` 
      : `Hello! I would like to quote the following products from ${this.config.businessName}:\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   📦 ${isSpanish ? 'Cantidad' : 'Quantity'}: ${item.quantity}\n`;
      message += `   💰 ${isSpanish ? 'Precio unitario' : 'Unit price'}: ${formatCurrency(item.price, currency)}\n`;
      message += `   💳 ${isSpanish ? 'Total' : 'Total'}: ${formatCurrency(item.price * item.quantity, currency)}\n`;
      message += `   📁 ${isSpanish ? 'Categoría' : 'Category'}: ${item.category}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *${isSpanish ? 'SUBTOTAL' : 'SUBTOTAL'}*: ${formatCurrency(cartSubtotal, currency)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += isSpanish 
      ? "Por favor, envíenme una cotización formal con:\n• Disponibilidad de productos\n• Costos de envío\n• Tiempo de entrega\n• Métodos de pago disponibles\n\n¡Gracias!" 
      : "Please send me a formal quote with:\n• Product availability\n• Shipping costs\n• Delivery time\n• Available payment methods\n\nThank you!";
    
    return message;
  }

  sendOrderViaWhatsApp(cartItems: CartItem[], cartSubtotal: number, language: string, currency: string): void {
    const message = this.generateOrderMessage(cartItems, cartSubtotal, language, currency);
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = this.config.phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}

export const whatsappService = new WhatsAppService();