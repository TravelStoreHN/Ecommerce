export interface EmailSubscriptionData {
  email: string;
  language: string;
  discountCode: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  discountCode?: string;
}

const API_BASE_URL = 'https://travelstorehn-app.vercel.app';

export const subscribeToNewsletter = async (data: EmailSubscriptionData): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sendwelcomeemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter. Please try again.');
  }
};

export const sendWelcomeEmail = subscribeToNewsletter; // Alias for backwards compatibility