import React from 'react';
import Button from '../components/ui/Button';
import { SparklesIcon, MapIcon, SunIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import PartnerBanner from '@/components/PartnerBanner';

const TravelAgentPage: React.FC = () => {
  const { language } = useSettings();

  const t = (key: string, data?: any) => {
    const translations: Record<string, any> = {
      es: {
        alertMessage: "¡Planeemos tu viaje a Honduras! El asistente de chat IA está listo para tus preguntas en la parte inferior derecha de la pantalla.",
        pageTitle: "Tu Agente de Viajes Personal para Honduras",
        pageSubtitle: "Deja que nuestro asistente IA te ayude a planificar un viaje inolvidable por las maravillas de Honduras. Obtén itinerarios personalizados, recomendaciones de restaurantes, sugerencias de actividades ¡y más!",
        startButton: "Comenzar a Planificar con IA",
        discoverTitle: "Descubre la Magia de Honduras",
        copanName: "Ruinas Mayas de Copán",
        copanDesc: "Retrocede en el tiempo en esta antigua ciudad, Patrimonio de la Humanidad por la UNESCO.",
        roatanName: "Isla de Roatán",
        roatanDesc: "Sumérgete en la Barrera de Coral Mesoamericana, relájate en playas vírgenes.",
        picoBonitoName: "Parque Nacional Pico Bonito",
        picoBonitoDesc: "Explora exuberantes selvas tropicales, cascadas y diversa vida silvestre.",
        aiHelpTitle: "¿Cómo Puede Ayudarte Nuestra IA?",
        aiHelpList: [
          "Crear itinerarios de viaje personalizados según tus intereses y presupuesto.",
          "Recomendar los mejores restaurantes locales, desde comida callejera hasta alta cocina.",
          "Sugerir actividades emocionantes como buceo, senderismo, tirolesa y tours culturales.",
          "Proporcionar consejos sobre transporte, alojamiento y seguridad.",
          "Responder tus preguntas sobre la cultura, costumbres y atracciones hondureñas."
        ],
        aiReadyMessage: "Nuestro asistente IA está disponible en la ventana de chat en la parte inferior derecha de tu pantalla. ¡Solo haz tus preguntas!",
        disclaimer: "Nuestro Agente de Viajes IA utiliza tecnología avanzada para proporcionar información y sugerencias. Siempre verifica los detalles críticos como la disponibilidad de reservas y avisos de viaje de fuentes oficiales."
      },
      en: {
        alertMessage: "Let's plan your Honduras trip! The AI chat assistant is ready for your questions at the bottom right of the screen.",
        pageTitle: "Your Personal Honduras Travel Agent",
        pageSubtitle: "Let our AI assistant help you plan an unforgettable journey through the wonders of Honduras. Get custom itineraries, restaurant recommendations, activity suggestions, and more!",
        startButton: "Start Planning with AI",
        discoverTitle: "Discover the Magic of Honduras",
        copanName: "Copán Mayan Ruins",
        copanDesc: "Step back in time at this ancient city, a UNESCO World Heritage site.",
        roatanName: "Roatán Island",
        roatanDesc: "Dive into the Mesoamerican Barrier Reef, relax on pristine beaches.",
        picoBonitoName: "Pico Bonito National Park",
        picoBonitoDesc: "Explore lush rainforests, waterfalls, and diverse wildlife.",
        aiHelpTitle: "How Our AI Can Help You:",
        aiHelpList: [
          "Create personalized travel itineraries based on your interests and budget.",
          "Recommend the best local restaurants, from street food to fine dining.",
          "Suggest exciting activities like diving, hiking, zip-lining, and cultural tours.",
          "Provide tips on transportation, accommodation, and safety.",
          "Answer your questions about Honduran culture, customs, and attractions."
        ],
        aiReadyMessage: "Our AI assistant is available in the chat window at the bottom right of your screen. Just ask your questions!",
        disclaimer: "Our AI Travel Agent uses advanced technology to provide information and suggestions. Always double-check critical details like booking availability and travel advisories from official sources."
      }
    };
    const text = translations[language]?.[key] || translations['en'][key];
    return typeof text === 'function' ? text(data) : text;
  };

  const handleOpenChatForTravel = () => {
    alert(t('alertMessage'));
  };

  const hondurasHighlights = [
    { nameKey: 'copanName', descriptionKey: 'copanDesc', icon: BuildingLibraryIcon, image: 'https://picsum.photos/seed/copan/400/300' },
    { nameKey: 'roatanName', descriptionKey: 'roatanDesc', icon: SunIcon, image: 'https://picsum.photos/seed/roatan/400/300' },
    { nameKey: 'picoBonitoName', descriptionKey: 'picoBonitoDesc', icon: MapIcon, image: 'https://picsum.photos/seed/picobonito/400/300' },
  ];

  return (
    <div className="space-y-10">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-10 rounded-xl shadow-xl text-center">
        <SparklesIcon className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{t('pageTitle')}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          {t('pageSubtitle')}
        </p>
        <Button 
          variant="secondary" 
          size="lg" 
          className="mt-8 bg-white text-purple-700 hover:bg-gray-100"
          onClick={handleOpenChatForTravel}
        >
          {t('startButton')}
        </Button>
      </header>

      <section className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{t('discoverTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {hondurasHighlights.map((highlight) => (
            <div key={highlight.nameKey} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              <img src={highlight.image} alt={t(highlight.nameKey)} className="w-full h-48 object-cover rounded-md mb-4" />
              <highlight.icon className="h-10 w-10 text-purple-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{t(highlight.nameKey)}</h3>
              <p className="text-sm text-gray-600">{t(highlight.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-purple-50 p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-purple-800 mb-3">{t('aiHelpTitle')}</h2>
        <ul className="list-disc list-inside text-left max-w-lg mx-auto text-gray-700 space-y-2">
          {(t('aiHelpList') as string[]).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-gray-700">
          {t('aiReadyMessage')}
        </p>
      </section>
      
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          {t('disclaimer')}
        </p>
      </div>

      <PartnerBanner />
    </div>
  );
};

export default TravelAgentPage;
