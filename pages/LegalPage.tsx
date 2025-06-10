import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEGAL_POLICY_TYPES, SITE_NAME } from '../constants';
import { ArrowLeftIcon, ShieldCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';

const LegalPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const { language } = useSettings();

  let title = language === 'es' ? "Información Legal" : "Legal Information";
  let content = <p>{language === 'es' ? "Por favor seleccione un tipo de política válido." : "Please select a valid policy type."}</p>;
  let icon = <DocumentTextIcon className="h-12 w-12 text-purple-600 mb-4" />;

  const baseContentStyle = "prose prose-purple max-w-none text-gray-700 leading-relaxed";

  const t = (enText: string, esText: string) => language === 'es' ? esText : enText;

  if (policyType === LEGAL_POLICY_TYPES.TERMS) {
    title = t("Terms and Conditions", "Términos y Condiciones");
    icon = <DocumentTextIcon className="h-12 w-12 text-purple-600 mb-4" />;
    content = (
      <div className={baseContentStyle}>
        <h2>1. {t("Introduction", "Introducción")}</h2>
        <p>{t(`Welcome to ${SITE_NAME}. These terms and conditions outline the rules and regulations for the use of ${SITE_NAME}'s Website, located at [Your Website URL]. By accessing this website we assume you accept these terms and conditions. Do not continue to use ${SITE_NAME} if you do not agree to take all of the terms and conditions stated on this page.`, `Bienvenido a ${SITE_NAME}. Estos términos y condiciones describen las reglas y regulaciones para el uso del Sitio Web de ${SITE_NAME}, ubicado en [URL de tu sitio web]. Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando ${SITE_NAME} si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.`)}</p>
        
        <h2>2. {t("Intellectual Property Rights", "Derechos de Propiedad Intelectual")}</h2>
        <p>{t(`Other than the content you own, under these Terms, ${SITE_NAME} and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.`, `Aparte del contenido que posees, bajo estos Términos, ${SITE_NAME} y/o sus licenciantes poseen todos los derechos de propiedad intelectual y materiales contenidos en este Sitio Web. Se te concede una licencia limitada solo para fines de visualización del material contenido en este Sitio Web.`)}</p>

        <h2>3. {t("Restrictions", "Restricciones")}</h2>
        <p>{t("You are specifically restricted from all of the following:", "Estás específicamente restringido de todo lo siguiente:")}</p>
        <ul>
          <li>{t("Publishing any Website material in any other media;", "Publicar cualquier material del Sitio Web en cualquier otro medio;")}</li>
          <li>{t("Selling, sublicensing and/or otherwise commercializing any Website material;", "Vender, sublicenciar y/o comercializar de otra manera cualquier material del Sitio Web;")}</li>
          <li>{t("Publicly performing and/or showing any Website material;", "Realizar y/o mostrar públicamente cualquier material del Sitio Web;")}</li>
          <li>{t("Using this Website in any way that is or may be damaging to this Website;", "Usar este Sitio Web de cualquier manera que sea o pueda ser perjudicial para este Sitio Web;")}</li>
          <li>{t("Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;", "Usar este Sitio Web de manera contraria a las leyes y regulaciones aplicables, o de cualquier manera que pueda causar daño al Sitio Web, o a cualquier persona o entidad comercial;")}</li>
        </ul>
        <p><em>{t("This is a simplified placeholder. A full Terms and Conditions document is much more extensive.", "Este es un marcador de posición simplificado. Un documento completo de Términos y Condiciones es mucho más extenso.")}</em></p>
        <h2>4. {t("AI Travel Agent Disclaimer", "Descargo de Responsabilidad del Agente de Viajes IA")}</h2>
        <p>{t(`The AI Travel Agent feature provides information and suggestions based on available data. While we strive for accuracy, ${SITE_NAME} is not responsible for any inaccuracies, errors, or omissions in the information provided by the AI. Travel plans, bookings, and decisions should be verified with official sources and service providers. The AI's suggestions do not constitute professional travel advice that replaces your own due diligence.`, `La función de Agente de Viajes IA proporciona información y sugerencias basadas en los datos disponibles. Aunque nos esforzamos por la precisión, ${SITE_NAME} no se hace responsable de ninguna inexactitud, error u omisión en la información proporcionada por la IA. Los planes de viaje, reservas y decisiones deben verificarse con fuentes oficiales y proveedores de servicios. Las sugerencias de la IA no constituyen un asesoramiento profesional de viajes que reemplace tu propia diligencia debida.`)}</p>
      </div>
    );
  } else if (policyType === LEGAL_POLICY_TYPES.PRIVACY) {
    title = t("Privacy Policy", "Política de Privacidad");
    icon = <ShieldCheckIcon className="h-12 w-12 text-purple-600 mb-4" />;
    content = (
      <div className={baseContentStyle}>
        <h2>1. {t("Information We Collect", "Información que Recopilamos")}</h2>
        <p>{t("We collect information to provide better services to all our users. This includes information you provide when you create an account, make a purchase, or communicate with us (including through our AI chat services).", "Recopilamos información para proporcionar mejores servicios a todos nuestros usuarios. Esto incluye la información que proporcionas cuando creas una cuenta, realizas una compra o te comunicas con nosotros (incluso a través de nuestros servicios de chat IA).")}</p>
        <p>{t("Types of data we may collect:", "Tipos de datos que podemos recopilar:")}</p>
        <ul>
            <li>{t("Personal identification information (Name, email address, phone number, etc.)", "Información de identificación personal (Nombre, dirección de correo electrónico, número de teléfono, etc.)")}</li>
            <li>{t("Transactional information (Details of products and services you have purchased)", "Información transaccional (Detalles de los productos y servicios que has comprado)")}</li>
            <li>{t("Interaction data (Your communications with our customer service and AI Travel Agent)", "Datos de interacción (Tus comunicaciones con nuestro servicio al cliente y Agente de Viajes IA)")}</li>
            <li>{t("Usage data (Information about how you use our website and services)", "Datos de uso (Información sobre cómo utilizas nuestro sitio web y servicios)")}</li>
        </ul>
        <h2>2. {t("How We Use Information", "Cómo Usamos la Información")}</h2>
        <p>{t(`We use the information we collect to operate, maintain, and improve our services, to develop new ones, and to protect ${SITE_NAME} and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads (if applicable).`, `Utilizamos la información que recopilamos para operar, mantener y mejorar nuestros servicios, desarrollar nuevos y proteger a ${SITE_NAME} y a nuestros usuarios. También utilizamos esta información para ofrecerte contenido personalizado, como resultados de búsqueda y anuncios más relevantes (si aplica).`)}</p>
        <h2>3. {t("Information Sharing", "Intercambio de Información")}</h2>
        <p>{t(`We do not share personal information with companies, organizations, or individuals outside of ${SITE_NAME} except in the following cases: With your consent, for external processing (with trusted businesses or persons to process it for us, based on our instructions and in compliance with our Privacy Policy), or for legal reasons.`, `No compartimos información personal con empresas, organizaciones o individuos fuera de ${SITE_NAME} excepto en los siguientes casos: Con tu consentimiento, para procesamiento externo (con empresas o personas de confianza para que la procesen por nosotros, según nuestras instrucciones y de conformidad con nuestra Política de Privacidad), o por razones legales.`)}</p>
        <p><em>{t("This is a simplified placeholder. A full Privacy Policy is much more comprehensive and required by law.", "Este es un marcador de posición simplificado. Una Política de Privacidad completa es mucho más exhaustiva y requerida por ley.")}</em></p>
      </div>
    );
  } else if (policyType === LEGAL_POLICY_TYPES.RETURNS) {
    title = t("Return Policy", "Política de Devoluciones");
    content = (
      <div className={baseContentStyle}>
        <h2>{t("Our Return Policy", "Nuestra Política de Devoluciones")}</h2>
        <p>{t(`We want you to be happy with your purchase from ${SITE_NAME}. If you are not satisfied, you may return most new, unopened items within 30 days of delivery for a full refund. Items should be returned in their original product packaging.`, `Queremos que estés contento con tu compra de ${SITE_NAME}. Si no estás satisfecho, puedes devolver la mayoría de los artículos nuevos y sin abrir dentro de los 30 días posteriores a la entrega para obtener un reembolso completo. Los artículos deben devolverse en su embalaje original.`)}</p>
        <p><strong>{t("Exceptions:", "Excepciones:")}</strong> {t("Certain items may not be returnable, or may have specific return conditions. These will be noted on the product page.", "Ciertos artículos pueden no ser retornables o pueden tener condiciones de devolución específicas. Esto se indicará en la página del producto.")}</p>
        <p>{t("To initiate a return, please contact our customer service.", "Para iniciar una devolución, por favor contacta a nuestro servicio al cliente.")}</p>
        <p><em>{t("This is a basic placeholder. Ensure your actual return policy is clear and covers all necessary details.", "Este es un marcador de posición básico. Asegúrate de que tu política de devoluciones real sea clara y cubra todos los detalles necesarios.")}</em></p>
      </div>
    );
  } else if (policyType === LEGAL_POLICY_TYPES.SHIPPING) {
    title = t("Shipping Policy", "Política de Envíos");
    content = (
      <div className={baseContentStyle}>
        <h2>{t("Shipping Information", "Información de Envío")}</h2>
        <p>{t(`At ${SITE_NAME}, we aim to get your travel essentials to you as quickly and efficiently as possible.`, `En ${SITE_NAME}, nuestro objetivo es hacerte llegar tus esenciales de viaje de la manera más rápida y eficiente posible.`)}</p>
        <p><strong>{t("Processing Time:", "Tiempo de Procesamiento:")}</strong> {t("Orders are typically processed within 1-2 business days.", "Los pedidos se procesan típicamente en 1-2 días hábiles.")}</p>
        <p><strong>{t("Shipping Times:", "Tiempos de Envío:")}</strong> {t("Shipping times vary depending on your location and the shipping method selected at checkout. Estimated delivery times will be provided once your order is placed.", "Los tiempos de envío varían según tu ubicación y el método de envío seleccionado al finalizar la compra. Los tiempos de entrega estimados se proporcionarán una vez que se realice tu pedido.")}</p>
        <p><strong>{t("Shipping Costs:", "Costos de Envío:")}</strong> {t("Shipping costs are calculated based on the weight of your order and your destination. You will see the shipping cost at checkout before confirming your order.", "Los costos de envío se calculan según el peso de tu pedido y tu destino. Verás el costo de envío al finalizar la compra antes de confirmar tu pedido.")}</p>
        <p><em>{t("This is a basic placeholder. Detail your shipping options, costs, and international shipping if applicable.", "Este es un marcador de posición básico. Detalla tus opciones de envío, costos y envíos internacionales si aplica.")}</em></p>
      </div>
    );
  }


  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-6">
      <Link to="/shop" className="inline-flex items-center text-purple-600 hover:text-purple-800 hover:underline text-sm mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-2" /> {t("Back to Shop", "Volver a la Tienda")}
      </Link>
      <div className="text-center">
        {icon}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("Last Updated:", "Última Actualización:")} {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</p>
      </div>
      <hr className="my-6"/>
      <div>{content}</div>
    </div>
  );
};

export default LegalPage;
