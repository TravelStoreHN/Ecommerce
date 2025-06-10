import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSettings } from '../contexts/SettingsContext';


const NotFoundPage: React.FC = () => {
  const { language } = useSettings();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        altText: "Viajero perdido",
        title: "¡Uy! Página No Encontrada",
        message: "Parece que has tomado un camino equivocado. La página que buscas no existe o ha sido movida.",
        button: "Ir a la Página Principal"
      },
      en: {
        altText: "Lost traveler",
        title: "Oops! Page Not Found",
        message: "It seems like you've taken a wrong turn. The page you're looking for doesn't exist or has been moved.",
        button: "Go to Homepage"
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img 
        src="https://picsum.photos/seed/404page/400/300" 
        alt={t('altText')}
        className="w-64 h-auto mb-8 rounded-lg shadow-lg"
      />
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">{t('title')}</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {t('message')}
      </p>
      <Link to="/shop">
        <Button variant="primary" size="lg">
          {t('button')}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
