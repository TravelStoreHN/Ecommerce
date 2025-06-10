import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { TruckIcon, CheckCircleIcon, ClockIcon, MapPinIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import { SITE_NAME } from '../constants';

interface TrackingEvent {
  timestamp: string;
  status: string;
  location?: string;
  icon: React.ElementType;
}

interface TrackingResult {
  orderId: string;
  currentStatus: string;
  estimatedDelivery?: string;
  history: TrackingEvent[];
}

const getMockTrackingData = (lang: string): Record<string, TrackingResult> => {
  const tStatus = (key: string, enText: string) => {
    const statusTranslations: Record<string, Record<string, string>> = {
      es: {
        inTransit: "En Tránsito",
        delivered: "Entregado",
        processing: "Procesando",
        outForDelivery: "Paquete en ruta de entrega",
        arrivedLocal: "Llegó al centro de distribución local",
        departedSorting: "Paquete salió de la instalación de clasificación",
        receivedByCarrier: "Paquete recibido por el transportista",
        orderConfirmedShipped: "Pedido Confirmado y Enviado",
        deliveredFrontDoor: "Entregado, dejado en la puerta principal",
        arrivedPostOffice: "Llegó a la oficina de correos local",
        shipped: "Enviado",
        paymentConfirmed: "Pago del pedido confirmado",
        orderPlaced: "Pedido Realizado",
      },
      en: { // Fallbacks
        inTransit: "In Transit",
        delivered: "Delivered",
        processing: "Processing",
        outForDelivery: "Package out for delivery",
        arrivedLocal: "Arrived at local distribution center",
        departedSorting: "Package departed sorting facility",
        receivedByCarrier: "Package received by carrier",
        orderConfirmedShipped: "Order Confirmed & Shipped",
        deliveredFrontDoor: "Delivered, left at front door",
        arrivedPostOffice: "Arrived at local post office",
        shipped: "Shipped",
        paymentConfirmed: "Order payment confirmed",
        orderPlaced: "Order Placed",
      }
    };
    return statusTranslations[lang]?.[key] || enText; // Fallback to English text
  };

  return {
  'TSHN123456789': {
    orderId: 'TSHN123456789',
    currentStatus: tStatus('inTransit', "In Transit"),
    estimatedDelivery: lang === 'es' ? '28 de Octubre, 2024' : 'October 28, 2024',
    history: [
      { timestamp: lang === 'es' ? 'Oct 26, 2024, 09:00 AM' : 'Oct 26, 2024, 09:00 AM', status: tStatus('outForDelivery', 'Package out for delivery'), location: lang === 'es' ? 'Tu Ciudad, TC' : 'Your City, YS', icon: TruckIcon },
      { timestamp: lang === 'es' ? 'Oct 25, 2024, 02:30 PM' : 'Oct 25, 2024, 02:30 PM', status: tStatus('arrivedLocal', 'Arrived at local distribution center'), location: lang === 'es' ? 'Tu Ciudad, TC' : 'Your City, YS', icon: MapPinIcon },
      { timestamp: lang === 'es' ? 'Oct 24, 2024, 11:15 AM' : 'Oct 24, 2024, 11:15 AM', status: tStatus('departedSorting', 'Package departed sorting facility'), location: lang === 'es' ? 'Centro Principal, CP' : 'Central Hub, CH', icon: TruckIcon },
      { timestamp: lang === 'es' ? 'Oct 23, 2024, 04:00 PM' : 'Oct 23, 2024, 04:00 PM', status: tStatus('receivedByCarrier', 'Package received by carrier'), location: lang === 'es' ? 'Almacén, AL' : 'Warehouse, WH', icon: CheckCircleIcon },
      { timestamp: lang === 'es' ? 'Oct 23, 2024, 03:00 PM' : 'Oct 23, 2024, 03:00 PM', status: tStatus('orderConfirmedShipped', 'Order Confirmed & Shipped'), location: lang === 'es' ? `Almacén ${SITE_NAME}` : `${SITE_NAME} Warehouse`, icon: CheckCircleIcon },
    ],
  },
  'TSHN987654321': {
    orderId: 'TSHN987654321',
    currentStatus: tStatus('delivered', "Delivered"),
    estimatedDelivery: lang === 'es' ? '25 de Octubre, 2024' : 'October 25, 2024',
    history: [
      { timestamp: lang === 'es' ? 'Oct 25, 2024, 01:15 PM' : 'Oct 25, 2024, 01:15 PM', status: tStatus('deliveredFrontDoor', 'Delivered, left at front door'), location: lang === 'es' ? 'Tu Dirección, TD' : 'Your Address, YS', icon: CheckCircleIcon },
      { timestamp: lang === 'es' ? 'Oct 25, 2024, 08:30 AM' : 'Oct 25, 2024, 08:30 AM', status: tStatus('outForDelivery', 'Out for delivery'), location: lang === 'es' ? 'Tu Ciudad, TC' : 'Your City, YS', icon: TruckIcon },
      { timestamp: lang === 'es' ? 'Oct 24, 2024, 07:00 PM' : 'Oct 24, 2024, 07:00 PM', status: tStatus('arrivedPostOffice', 'Arrived at local post office'), location: lang === 'es' ? 'Tu Ciudad, TC' : 'Your City, YS', icon: MapPinIcon },
      { timestamp: lang === 'es' ? 'Oct 23, 2024, 10:00 AM' : 'Oct 23, 2024, 10:00 AM', status: tStatus('shipped', 'Shipped'), location: lang === 'es' ? `Almacén ${SITE_NAME}` : `${SITE_NAME} Warehouse`, icon: CheckCircleIcon },
    ],
  },
   'TSHNPENDING01': {
    orderId: 'TSHNPENDING01',
    currentStatus: tStatus('processing', "Processing"),
    estimatedDelivery: lang === 'es' ? '30 de Octubre, 2024' : 'October 30, 2024',
    history: [
      { timestamp: lang === 'es' ? 'Oct 26, 2024, 11:00 AM' : 'Oct 26, 2024, 11:00 AM', status: tStatus('paymentConfirmed', 'Order payment confirmed'), location: lang === 'es' ? `Sistemas ${SITE_NAME}` : `${SITE_NAME} Systems`, icon: ClockIcon },
      { timestamp: lang === 'es' ? 'Oct 26, 2024, 10:00 AM' : 'Oct 26, 2024, 10:00 AM', status: tStatus('orderPlaced', 'Order Placed'), location: lang === 'es' ? `${SITE_NAME} En Línea` : `${SITE_NAME} Online`, icon: CheckCircleIcon },
    ],
  }
  };
};


const TrackOrderPage: React.FC = () => {
  const { trackingNumber: urlTrackingNumber } = useParams<{ trackingNumber?: string }>();
  const navigate = useNavigate();
  const { language } = useSettings();

  const [inputValue, setInputValue] = useState(urlTrackingNumber || '');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = (key: string, data?: any) => {
    const translations: Record<string, any> = {
      es: {
        pageTitle: "Rastrea Tu Pedido",
        pageSubtitle: "Ingresa tu número de rastreo abajo para verificar el estado de tu envío.",
        inputLabel: "Número de Rastreo",
        inputPlaceholder: "Ej., TSHN123456789",
        buttonTrack: "Rastrear Pedido",
        buttonTracking: "Rastreando...",
        errorPrompt: "Por favor, ingresa un número de rastreo.",
        errorNotFound: (num: string) => `Número de rastreo "${num}" no encontrado. Por favor verifica el número e intenta de nuevo.`,
        promptEnterNumber: "Por favor, ingresa tu número de rastreo y haz clic en 'Rastrear Pedido' para ver el estado de tu envío.",
        orderStatus: "Estado del Pedido:",
        orderIdLabel: "ID del Pedido:",
        estimatedDeliveryLabel: "Entrega Estimada:",
        trackingHistoryLabel: "Historial de Rastreo",
        locationLabel: "Ubicación:"
      },
      en: {
        pageTitle: "Track Your Order",
        pageSubtitle: "Enter your tracking number below to check the status of your shipment.",
        inputLabel: "Tracking Number",
        inputPlaceholder: "e.g., TSHN123456789",
        buttonTrack: "Track Order",
        buttonTracking: "Tracking...",
        errorPrompt: "Please enter a tracking number.",
        errorNotFound: (num: string) => `Tracking number "${num}" not found. Please verify the number and try again.`,
        promptEnterNumber: "Please enter your tracking number and click 'Track Order' to see your shipment status.",
        orderStatus: "Order Status:",
        orderIdLabel: "Order ID:",
        estimatedDeliveryLabel: "Estimated Delivery:",
        trackingHistoryLabel: "Tracking History",
        locationLabel: "Location:"
      }
    };
    let text = translations[language]?.[key] || translations['en'][key];
    if (typeof text === 'function' && data) return text(data);
    return text;
  };

  const fetchTrackingData = useCallback(async (currentTrackingNumber: string) => {
    if (!currentTrackingNumber.trim()) {
      setError(t('errorPrompt'));
      setTrackingResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackingResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockData = getMockTrackingData(language);
    const result = mockData[currentTrackingNumber.trim().toUpperCase()];

    if (result) {
      setTrackingResult(result);
    } else {
      setError(t('errorNotFound', currentTrackingNumber.trim().toUpperCase()));
    }
    setIsLoading(false);
  }, [language, t]); // Add t to dependency array

  useEffect(() => {
    if (urlTrackingNumber) {
      setInputValue(urlTrackingNumber);
      fetchTrackingData(urlTrackingNumber);
    } else {
      setInputValue('');
      if(!isLoading) {
        setTrackingResult(null);
        setError(null);
      }
    }
  }, [urlTrackingNumber, fetchTrackingData, isLoading]);
  
  // Re-fetch if language changes and a tracking number is present
  useEffect(() => {
    if (urlTrackingNumber && trackingResult) { // Only re-fetch if there was a previous result
        fetchTrackingData(urlTrackingNumber);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, urlTrackingNumber]); // Removed fetchTrackingData, trackingResult from deps to avoid loop on result set


  const handleTrackOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      setError(t('errorPrompt'));
      setTrackingResult(null);
      if (urlTrackingNumber) navigate('/shop/track-order');
      return;
    }
    navigate(`/shop/track-order/${trimmedInput.toUpperCase()}`);
  };
  
  const getStatusColor = (status: string): string => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('entregado') || lowerStatus.includes('delivered')) return 'text-green-600';
    if (lowerStatus.includes('tránsito') || lowerStatus.includes('transit') || lowerStatus.includes('delivery')) return 'text-blue-600';
    if (lowerStatus.includes('procesando') || lowerStatus.includes('processing') || lowerStatus.includes('confirmado') || lowerStatus.includes('confirmed')) return 'text-yellow-600';
    return 'text-gray-700';
  };


  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="bg-white p-6 rounded-xl shadow text-center">
        <TruckIcon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-purple-700">{t('pageTitle')}</h1>
        <p className="text-gray-600 mt-2">{t('pageSubtitle')}</p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow">
        <form onSubmit={handleTrackOrderSubmit} className="space-y-4">
          <div>
            <label htmlFor="trackingNumberInput" className="block text-sm font-medium text-gray-700 mb-1">
              {t('inputLabel')}
            </label>
            <input
              type="text"
              id="trackingNumberInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              aria-describedby="tracking-error"
            />
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? t('buttonTracking') : t('buttonTrack')}
          </Button>
        </form>
      </div>

      {error && !isLoading && (
        <div id="tracking-error" role="alert" className="bg-red-50 p-4 rounded-lg shadow border border-red-200 text-center">
          <div className="flex justify-center items-center mb-2">
            <XCircleIcon className="h-8 w-8 text-red-500 mr-2" />
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && !trackingResult && !urlTrackingNumber && (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          <p>{t('promptEnterNumber')}</p>
        </div>
      )}

      {trackingResult && !isLoading && (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('orderStatus')} <span className={getStatusColor(trackingResult.currentStatus)}>{trackingResult.currentStatus}</span></h2>
          <p className="text-sm text-gray-600 mb-1">{t('orderIdLabel')} <span className="font-medium">{trackingResult.orderId}</span></p>
          {trackingResult.estimatedDelivery && (
            <p className="text-sm text-gray-600 mb-6">{t('estimatedDeliveryLabel')} <span className="font-medium">{trackingResult.estimatedDelivery}</span></p>
          )}

          <h3 className="text-xl font-semibold text-gray-700 mb-4 pt-4 border-t border-gray-200">{t('trackingHistoryLabel')}</h3>
          <ul className="space-y-4">
            {trackingResult.history.map((event, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className={`mt-1 p-1.5 rounded-full ${event.icon === CheckCircleIcon ? 'bg-green-100' : 'bg-purple-100'}`}>
                    <event.icon className={`h-5 w-5 ${event.icon === CheckCircleIcon ? 'text-green-600' : 'text-purple-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{event.status}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                  {event.location && <p className="text-xs text-gray-500">{t('locationLabel')} {event.location}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;