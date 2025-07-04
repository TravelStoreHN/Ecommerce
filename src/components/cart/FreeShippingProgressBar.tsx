import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/utils/localization';
import Confetti from 'react-confetti';

interface FreeShippingProgressBarProps {
  minimumForFreeShipping?: number;
}

const texts = {
  en: {
    almost: (amount: string) => `Spend ${amount} more for free shipping!`,
    qualified: 'You qualify for free shipping! 🎉',
    title: 'Free Shipping Progress',
  },
  es: {
    almost: (amount: string) => `¡Compra ${amount} más para envío gratis!`,
    qualified: '¡Ya calificas para envío gratis! 🎉',
    title: 'Progreso de Envío Gratis',
  },
};

const FreeShippingProgressBar: React.FC<FreeShippingProgressBarProps> = ({
  minimumForFreeShipping = 25,
}) => {
  const { cartSubtotal } = useCart();
  const { language, currency } = useSettings();

  const progress = Math.min(
    100,
    Math.round((cartSubtotal / minimumForFreeShipping) * 100)
  );
  const remaining = Math.max(0, minimumForFreeShipping - cartSubtotal);

  const lang: 'en' | 'es' = language === 'es' ? 'es' : 'en';
  const formattedAmount = formatCurrency(remaining, currency);

  const qualified = remaining <= 0;

  // Get window size for confetti
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto p-4 mb-4 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm relative overflow-visible">
      {qualified && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={150}
          recycle={false}
        />
      )}
      <div className="mb-2 text-sm font-semibold text-blue-900">
        {texts[lang].title}
      </div>
      <div className="w-full h-4 bg-blue-100 rounded overflow-hidden mb-2">
        <div
          className={`h-4 transition-all duration-500 ease-out ${
            qualified ? 'bg-green-400' : 'bg-blue-400'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-blue-800 font-medium">
        {qualified
          ? texts[lang].qualified
          : texts[lang].almost(formattedAmount)}
      </div>
    </div>
  );
};

export default FreeShippingProgressBar;