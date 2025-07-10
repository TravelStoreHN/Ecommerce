const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://travelstorehn.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('API: Handling OPTIONS preflight request');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log(`API: Method ${req.method} not allowed`);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  console.log('API: POST request received.');

  try {
    const { email, language, discountCode } = req.body;
    console.log('API: Request body:', { email, language, discountCode });

    if (!email || !language || !discountCode) {
      console.log('API: Missing required fields in request body.');
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"TravelStoreHN ✈️" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: language === 'es' ? '🎁 ¡Tu Código de Descuento del 10% de TravelStoreHN!' : '🎁 10% Discount Code from TravelStoreHN!',
      text: language === 'es' 
        ? `¡Bienvenido/a a TravelStoreHN! Tu código de descuento es: ${discountCode}`
        : `Welcome to TravelStoreHN! Your discount code is: ${discountCode}`,
      html: language === 'es' 
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #6b46c1; text-align: center;">¡Bienvenido/a a TravelStoreHN!</h2>
            <p>Hola,</p>
            <p>¡Gracias por suscribirte a nuestro boletín! Estamos emocionados de tenerte con nosotros.</p>
            <p>Como tu prometimos, aquí tienes tu código de descuento exclusivo del 10%. ¡Puedes usarlo en tu próxima compra en cualquier artículo, incluso sobre los que ya están en oferta!</p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; margin-bottom: 10px;"><strong>Tu código de descuento es:</strong></p>
              <div style="background-color: #6b46c1; color: white; padding: 15px 30px; border-radius: 5px; font-size: 20px; font-weight: bold; display: inline-block;">
                ${discountCode}
              </div>
            </div>
            <p>Felices viajes,</p>
            <p><strong>El Equipo de TravelStoreHN</strong></p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #6b46c1; text-align: center;">Welcome to TravelStoreHN!</h2>
            <p>Hello,</p>
            <p>Thank you for subscribing to our newsletter! We're excited to have you with us.</p>
            <p>As promised, here's your exclusive 10% discount code. You can use it on your next purchase on any item, even on those already on sale!</p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; margin-bottom: 10px;"><strong>Your discount code is:</strong></p>
              <div style="background-color: #6b46c1; color: white; padding: 15px 30px; border-radius: 5px; font-size: 20px; font-weight: bold; display: inline-block;">
                ${discountCode}
              </div>
            </div>
            <p>Happy travels,</p>
            <p><strong>The TravelStoreHN Team</strong></p>
          </div>
        `
    };

    console.log('API: Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('API: Email sent successfully!', info.response);

    res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('API: An error occurred:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}