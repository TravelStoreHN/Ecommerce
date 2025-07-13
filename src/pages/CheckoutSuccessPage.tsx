import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getCheckoutSession } from '../services/stripeService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      const data = await getCheckoutSession(sessionId!);
      setSessionData(data);
      
      // Clear the cart after successful payment
      if (data.payment_status === 'paid') {
        clearCart();
      }
    } catch (err) {
      console.error('Error fetching session data:', err);
      setError('Error al obtener los detalles del pago');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error en el Pago
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No se pudo verificar el estado del pago.'}
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/cart">
              <Button variant="primary">Volver al Carrito</Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary">Continuar Comprando</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const isSuccessful = sessionData.payment_status === 'paid';

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        {isSuccessful ? (
          <>
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              ¡Pago Exitoso!
            </h1>
            <p className="text-gray-600 mb-6">
              Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-lg mb-4">Detalles del Pedido</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ID de Sesión:</span>
                  <span className="font-mono text-sm">{sessionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold">
                    ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{sessionData.customer_email}</span>
                </div>
                {sessionData.shipping && (
                  <div className="flex justify-between">
                    <span>Envío a:</span>
                    <span>{sessionData.shipping.name}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Recibirás un email de confirmación en breve con los detalles de tu pedido y información de seguimiento.
            </p>
          </>
        ) : (
          <>
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Pago Pendiente o Fallido
            </h1>
            <p className="text-gray-600 mb-6">
              Tu pago no se ha completado. Estado: {sessionData.payment_status}
            </p>
          </>
        )}

        <div className="flex gap-4 justify-center">
          <Link to="/products">
            <Button variant="primary">Continuar Comprando</Button>
          </Link>
          <Link to="/account">
            <Button variant="secondary">Ver Mis Pedidos</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
