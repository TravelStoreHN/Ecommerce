
import React, { useEffect, useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Notification: React.FC = () => {
  const { notification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2800); // Start fade out slightly before context clears it

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [notification]);

  if (!notification) {
    return null;
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-300';
      case 'error':
        return 'bg-red-50 border-red-300';
      case 'info':
        return 'bg-blue-50 border-blue-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };
   const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };


  return (
    <div 
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[200] transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`max-w-md w-full ${getBackgroundColor()} p-4 rounded-lg shadow-xl border flex items-start space-x-3`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>{notification.message}</p>
        </div>
        {/* Optional close button if manual dismissal is desired alongside auto-dismiss 
        <button 
          onClick={() => setIsVisible(false)} // This would manually hide it, context clears it eventually
          className="text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        */}
      </div>
    </div>
  );
};

export default Notification;
