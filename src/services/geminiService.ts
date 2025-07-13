import { ChatMessage, GroundingChunk } from '../types';

interface MockAIResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}

const getMockResponses = (lang: string = 'en'): Record<string, MockAIResponse> => {
  const isSpanish = lang === 'es';
  return {
    default: { text: isSpanish ? "Lo siento, no entendí bien eso. ¿Podrías reformularlo?" : "I'm sorry, I didn't quite understand that. Could you rephrase?" },
    hello: { text: isSpanish ? "¡Hola! ¿Cómo puedo ayudarte con tus planes de viaje o búsqueda de productos hoy?" : "Hello there! How can I assist you with your travel plans or product search today?" },
    "honduras travel": { 
      text: isSpanish ? "¡Honduras es un país hermoso! ¿Estás interesado en antiguas ruinas mayas como Copán, playas vírgenes del Caribe en Roatán o aventuras en la exuberante selva tropical?" : "Honduras is a beautiful country! Are you interested in ancient Mayan ruins like Copán, pristine Caribbean beaches in Roatán, or lush rainforest adventures?",
      groundingChunks: [
          { web: { uri: "https://www.example-tourism-honduras.com", title: isSpanish ? "Sitio Oficial de Turismo de Honduras" : "Official Honduras Tourism Site" } },
          { web: { uri: "https://www.example-roatan-info.com", title: isSpanish ? "Guía de Viaje de Roatán" : "Roatan Travel Guide" } }
      ]
    },
    "water bottle": { text: isSpanish ? "¡Tenemos varias botellas de agua excelentes! ¿Buscas algo isotérmico, ligero para senderismo o con filtro incorporado?" : "We have several excellent water bottles! Are you looking for something insulated, lightweight for hiking, or with a built-in filter?" },
    "book flight": { text: isSpanish ? "¡Puedo ayudarte a encontrar información sobre vuelos! Para reservas reales, te guiaré a nuestros sitios asociados. ¿A dónde y cuándo te gustaría viajar?" : "I can help you find information on flights! For actual bookings, I'll guide you to our partner sites. Where and when would you like to travel?"}
  };
};

const getMockResponse = (userInput: string, lang: string): MockAIResponse => {
  const lowerInput = userInput.toLowerCase();
  const responses = getMockResponses(lang);

  if (lowerInput.includes(lang === 'es' ? "honduras" : "honduras") && (lowerInput.includes(lang === 'es' ? "viaje" : "travel") || lowerInput.includes(lang === 'es' ? "viaje" : "trip"))) {
    return responses["honduras travel"];
  }
  if (lowerInput.includes(lang === 'es' ? "botella de agua" : "water bottle") || lowerInput.includes(lang === 'es' ? "mochila" : "backpack")) {
    return responses["water bottle"];
  }
  if (lowerInput.includes(lang === 'es' ? "hola" : "hello") || lowerInput.includes("hi")) {
    return responses.hello;
  }
   if (lowerInput.includes(lang === 'es' ? "reservar" : "book") && lowerInput.includes(lang === 'es' ? "vuelo" : "flight")) {
    return responses["book flight"];
  }
  return responses.default;
};

const sendMessage = async (
  message: string,
  _chatHistory: ChatMessage[],
  language: string = 'en' // Add language parameter
): Promise<MockAIResponse> => {
  console.log(`Sending to mock AI (lang: ${language}): "${message}" with history (length: ${_chatHistory.length})`);
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const mockResponse = getMockResponse(message, language);
  return mockResponse;
};

const geminiService = {
  sendMessage,
};

export default geminiService;
