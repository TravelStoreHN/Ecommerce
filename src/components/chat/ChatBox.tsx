import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { ChatMessage, MessageSender, GroundingChunk } from '../../types';
import geminiService from '../../services/geminiService';
import { useSettings } from '../../contexts/SettingsContext';

const ChatMessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const { language } = useSettings();
  const isUser = message.sender === MessageSender.USER;
  const groundingChunks = (message.metadata?.groundingChunks as GroundingChunk[]) || [];
  
  const sourcesText = language === 'es' ? 'Fuentes:' : 'Sources:';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow ${
          isUser ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none border border-gray-200'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {message.sender === MessageSender.AI && groundingChunks.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-300">
            <p className="text-xs text-gray-500 mb-1">{sourcesText}</p>
            <ul className="space-y-1">
              {groundingChunks.map((chunk, index) => {
                const uri = chunk.web?.uri || chunk.retrievedContext?.uri;
                const title = chunk.web?.title || chunk.retrievedContext?.title || uri;
                if (!uri) return null;
                return (
                  <li key={index} className="text-xs">
                    <a href={uri} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700 hover:underline truncate block">
                      {index + 1}. {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


const ChatBox: React.FC = () => {
  const { language } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const initialMessageText = language === 'es' 
    ? '¡Hola! ¿Cómo puedo ayudarte a planificar tu aventura en Honduras o a encontrar esenciales de viaje hoy?' 
    : 'Hello! How can I help you plan your Honduras adventure or find travel essentials today?';

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: MessageSender.AI, text: initialMessageText, timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     // Update initial message if language changes and no user messages yet
    if (messages.length === 1 && messages[0].id === '1') {
       setMessages([{ ...messages[0], text: initialMessageText }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessageText]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: String(Date.now()),
      sender: MessageSender.USER,
      text: inputValue,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Pass language to geminiService if it needs to tailor mock responses
      const aiResponse = await geminiService.sendMessage(inputValue, messages, language); 
      
      const newAiMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: MessageSender.AI,
        text: aiResponse.text,
        timestamp: Date.now(),
        metadata: { groundingChunks: aiResponse.groundingChunks }
      };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorText = language === 'es'
        ? "Lo siento, estoy teniendo problemas para conectarme en este momento. Por favor, inténtalo de nuevo más tarde."
        : "Sorry, I'm having trouble connecting right now. Please try again later.";
      const errorResponseMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: MessageSender.AI,
        text: errorText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, messages, language]);

  const toggleChat = () => setIsOpen(!isOpen);
  
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
        es: {
            toggleChatLabel: "Abrir/Cerrar Chat",
            chatTitle: "Asistente de Viaje",
            thinking: "Pensando...",
            inputPlaceholder: "Pregunta sobre Honduras o productos..."
        },
        en: {
            toggleChatLabel: "Toggle Chat",
            chatTitle: "Travel Assistant",
            thinking: "Thinking...",
            inputPlaceholder: "Ask about Honduras or products..."
        }
    };
    return translations[language]?.[key] || translations['en'][key];
  };


  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-[100] ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label={t('toggleChatLabel')}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-[100] border border-gray-200 overflow-hidden">
          <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <SparklesIcon className="h-6 w-6 mr-2" />
              <h3 className="font-semibold text-lg">{t('chatTitle')}</h3>
            </div>
            <button onClick={toggleChat} className="text-purple-200 hover:text-white">
              <XMarkIcon className="h-7 w-7" />
            </button>
          </header>

          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            {messages.map(msg => <ChatMessageItem key={msg.id} message={msg} />)}
            {isLoading && (
                 <div className="flex justify-start mb-3">
                    <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow bg-white text-gray-700 rounded-bl-none border border-gray-200">
                        <div className="flex items-center">
                            <div className="dot-pulse mr-2">
                                <div className="dot-pulse__dot"></div>
                            </div>
                            <span className="text-sm text-gray-500">{t('thinking')}</span>
                        </div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder={t('inputPlaceholder')}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ''}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </footer>
        </div>
      )}
      <style>{`
        .dot-pulse {
          position: relative;
          left: -9999px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9b59b6; /* purple */
          color: #9b59b6;
          box-shadow: 9999px 0 0 -5px;
          animation: dotPulse 1.5s infinite linear;
          animation-delay: .25s;
        }
        .dot-pulse::before, .dot-pulse::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9b59b6;
          color: #9b59b6;
        }
        .dot-pulse::before {
          box-shadow: 9984px 0 0 -5px;
          animation: dotPulseBefore 1.5s infinite linear;
          animation-delay: 0s;
        }
        .dot-pulse::after {
          box-shadow: 10014px 0 0 -5px;
          animation: dotPulseAfter 1.5s infinite linear;
          animation-delay: .5s;
        }
        @keyframes dotPulseBefore {
          0% { box-shadow: 9984px 0 0 -5px; }
          30% { box-shadow: 9984px 0 0 2px; }
          60%, 100% { box-shadow: 9984px 0 0 -5px; }
        }
        @keyframes dotPulse {
          0% { box-shadow: 9999px 0 0 -5px; }
          30% { box-shadow: 9999px 0 0 2px; }
          60%, 100% { box-shadow: 9999px 0 0 -5px; }
        }
        @keyframes dotPulseAfter {
          0% { box-shadow: 10014px 0 0 -5px; }
          30% { box-shadow: 10014px 0 0 2px; }
          60%, 100% { box-shadow: 10014px 0 0 -5px; }
        }
      `}</style>
    </>
  );
};

export default ChatBox;
