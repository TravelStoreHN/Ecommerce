import nodemailer from 'nodemailer';

export default async function handler(req, res) {
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
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to TravelStoreHN!',
      text: `Here is your discount code: ${discountCode}`,
      html: `<p>Welcome! Here is your discount code: <strong>${discountCode}</strong></p>`
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