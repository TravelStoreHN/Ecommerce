import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const PartnerBanner: React.FC = () => {
  const { language } = useSettings(); // Changed from settings to language

  const content = {
    es: {
      title: "SOY TU",
      subtitle: "PLANIFICADOR DE VIAJES",
      tagline: "ASESOR DE TURISMO HONDUREÑO",
      description: "Si Honduras te está llamando por tu nombre, estoy listo para ayudarte a encontrar tu lugar en el paraíso. Contáctame para planificar tu viaje hondureño hoy.",
      buttonText: "CONTACTAR"
    },
    en: {
      title: "I AM YOUR",
      subtitle: "TRAVEL PLANNER", 
      tagline: "HONDURAN TOURISM ADVISOR",
      description: "If Honduras is calling your name, I am ready to help you find your place in paradise. Contact me to plan your Honduran trip today.",
      buttonText: "CONTACT"
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const handleContact = () => {
    const message = language === 'es'  // Changed from settings.language to language
      ? "Hola! Me interesa planificar un viaje a Honduras y necesito asesoría."
      : "Hello! I'm interested in planning a trip to Honduras and need advisory.";
    
    const whatsappUrl = `https://wa.me/+12407589469?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-8 rounded-lg my-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {currentContent.title}
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold mb-2">
          {currentContent.subtitle}
          <span className="text-sm align-super">®</span>
        </h3>
        <h4 className="text-xl md:text-2xl font-semibold mb-6 opacity-90">
          {currentContent.tagline}
        </h4>
        <p className="text-lg mb-8 max-w-3xl leading-relaxed">
          {currentContent.description}
        </p>
        <button
          onClick={handleContact}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded transition-all duration-200 border border-white border-opacity-30"
        >
          {currentContent.buttonText}
        </button>
      </div>
    </div>
  );
};

export default PartnerBanner;