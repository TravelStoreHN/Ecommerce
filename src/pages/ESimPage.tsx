
import React from 'react';
import { WifiIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';

const ESimPage: React.FC = () => {
  const { language } = useSettings();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        pageTitle: "E-Sims para Viajeros Inteligentes",
        comingSoon: "¡Próximamente!",
        description: "Olvídate de cambiar tarjetas SIM físicas. Con nuestras E-Sims, obtendrás conectividad instantánea en destinos de todo el mundo. Elige entre una variedad de planes de datos flexibles directamente desde tu dispositivo.",
        benefitsTitle: "Beneficios Clave:",
        benefit1: "Activación instantánea",
        benefit2: "Cobertura global",
        benefit3: "Sin contratos a largo plazo",
        benefit4: "Múltiples planes en un solo dispositivo",
        notifyMe: "Notificarme Cuando Esté Disponible",
        notifyMePlaceholder: "Tu correo electrónico",
      },
      en: {
        pageTitle: "E-Sims for Smart Travelers",
        comingSoon: "Coming Soon!",
        description: "Forget swapping physical SIM cards. With our E-Sims, you'll get instant connectivity in destinations worldwide. Choose from a variety of flexible data plans directly from your device.",
        benefitsTitle: "Key Benefits:",
        benefit1: "Instant activation",
        benefit2: "Global coverage",
        benefit3: "No long-term contracts",
        benefit4: "Multiple plans on one device",
        notifyMe: "Notify Me When Available",
        notifyMePlaceholder: "Your email address",
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-8 bg-white rounded-xl shadow-lg">
      <div className="relative mb-8">
        <WifiIcon className="h-24 w-24 text-purple-500" />
        <ClockIcon className="h-10 w-10 text-purple-700 absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md" />
      </div>
      
      <h1 className="text-4xl font-bold text-purple-700 mb-3">{t('comingSoon')}</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('pageTitle')}</h2>
      
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        {t('description')}
      </p>

      <div className="mb-8 p-6 bg-purple-50 rounded-lg max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-purple-700 mb-3">{t('benefitsTitle')}</h3>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>{t('benefit1')}</li>
          <li>{t('benefit2')}</li>
          <li>{t('benefit3')}</li>
          <li>{t('benefit4')}</li>
        </ul>
      </div>

      {/* Optional "Notify Me" section placeholder */}
      {/* 
      <div className="w-full max-w-sm">
        <p className="text-sm text-gray-500 mb-2">{t('notifyMe')}</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder={t('notifyMePlaceholder')}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
          <Button variant="primary" onClick={() => alert('Notification sign-up (mock)')}>
            OK
          </Button>
        </div>
      </div>
      */}
    </div>
  );
};

export default ESimPage;