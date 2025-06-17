
import { Product, BlogPost } from '../types';

// HNL_CONVERSION_RATE is used here to derive USD cost from original HNL cost comments.
const HNL_CONVERSION_RATE = 24.68; // 1 USD = 24.68 HNL (Example rate)

// Helper function to calculate new price based on HNL cost string (e.g., "L.28.39")
// Applies markup and rounds to the nearest .99
const calculatePrice = (hnlCostString: string): number => {
  const hnlCost = parseFloat(hnlCostString.replace('L.', ''));
  const usdCostBase = hnlCost / HNL_CONVERSION_RATE; // USD cost before markup
  const markedUpPrice = usdCostBase * 5.4; // Apply the 4x + 35% (which is * 5.4)
  // Round up to the nearest .99, but ensure small prices don't become -0.01 or too low
  const roundedPrice = Math.max(0.49, Math.ceil(markedUpPrice) - 0.01); 
  return parseFloat(roundedPrice.toFixed(2));
};

// Define sale products
const saleDiscount = 0.25; // 25% discount for sale items

// Product 1: Báscula Portátil de Viaje (ON SALE)
const regularPriceProd1 = calculatePrice('L.28.39'); 
const salePriceProd1 = parseFloat((regularPriceProd1 * (1 - saleDiscount)).toFixed(2)); 

// Product 3: Etiqueta de Identificación para Equipaje (ON SALE)
const regularPriceProd3 = calculatePrice('L.8.59');
const salePriceProd3 = parseFloat((regularPriceProd3 * (1 - saleDiscount)).toFixed(2));

// Product 5: Toalla de Viaje Magnética y Compacta (ON SALE)
const regularPriceProd5 = calculatePrice('L.52.09');
const salePriceProd5 = parseFloat((regularPriceProd5 * (1 - saleDiscount)).toFixed(2));


export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Báscula Digital para Equipaje de Acero Inoxidable',
    description: 'Asegura que tu equipaje cumpla con las regulaciones de peso con esta báscula digital de alta precisión. Diseñada para viajeros frecuentes y envíos, esta báscula combina durabilidad, precisión y facilidad de uso en un diseño compacto y portátil.',
    price: salePriceProd1, 
    originalPrice: regularPriceProd1,
    isSale: true,
    imageUrl: 'https://picsum.photos/seed/product1new/600/600',
    category: 'Accesorios de Viaje',
    rating: 4.5,
    reviews: 135,
    details: [
        'Capacidad: Hasta 50 kg (110 lbs).',
        'Precisión: Medición precisa con incrementos de 10 gramos (0.02 lbs).',
        'Material: Fabricada en acero inoxidable resistente para una larga durabilidad.',
        'Pantalla: Pantalla LCD retroiluminada para fácil lectura en cualquier condición de luz.',
        'Alarma: Alarma de sobrepeso para evitar cargos adicionales en aerolíneas.',
        'Función Tara: Permite restar el peso del contenedor para mediciones netas precisas.',
        'Energía: Funciona con baterías (incluidas) para portabilidad y conveniencia.',
        'Diseño: Compacto y ligero, ideal para llevar en viajes.',
        'Beneficio: Evita cargos por sobrepeso.',
        'Beneficio: Mediciones precisas para envíos y viajes.',
        'Beneficio: Durabilidad robusta para uso prolongado.',
        'Beneficio: Fácil de usar, interfaz intuitiva.',
        'Beneficio: Portátil, diseño compacto.',
        'Ideal para: Viajeros frecuentes, Envíos de paquetes, Uso doméstico.'
    ]
  },
  {
    id: 'prod-002',
    name: 'Atomizador de Perfume de Bolsillo de Aluminio Reutilizable de 5ml',
    description: 'Transporte su fragancia predilecta a cada destino con nuestro Atomizador de Perfume de Bolsillo de Aluminio de 5ml. Concebido como un artículo premium y reutilizable, este atomizador de dimensiones reducidas representa el acompañante perfecto para sus travesías. La manufactura de su cuerpo, base y cuello en aluminio asegura una perdurabilidad notable y una estética refinada, mientras que su tipo de sellado mediante bomba pulverizadora facilita la aplicación de perfumes, líquidos cosméticos o aceites esenciales. Ideal para conservar una presencia fresca y elegante, este elemento esencial de viaje constituye un aditamento indispensable en su equipaje. Su forma circular y capacidad de 5ml lo hacen óptimo para ser llevado en cualquier bolsillo o bolso.',
    price: calculatePrice('L.1.05'), 
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product2new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Fragrance',
    rating: 4.2,
    reviews: 95,
    details: [
        'Capacidad: 5ml.',
        'Material: Cuerpo, base y cuello de aluminio.',
        'Diseño: Premium, reutilizable, dimensiones reducidas, forma circular.',
        'Uso: Perfumes, líquidos cosméticos, aceites esenciales.',
        'Características: Sellado mediante bomba pulverizadora, perdurabilidad notable, estética refinada.',
        'Portabilidad: Óptimo para bolsillo o bolso.'
    ]
  },
  {
    id: 'prod-003',
    name: 'Etiqueta para Equipaje',
    description: 'En Travel Store HN, se ofrecen etiquetas de equipaje que combinan estilo y funcionalidad para sus viajes. Diseñadas para la resistencia y la identificación eficaz de sus pertenencias, estas etiquetas constituyen un artículo personalizado idóneo para bolsos, equipaje y pasaportes. Elaboradas con silicona ecológica o tela no tejida, se puede seleccionar entre estilos elegantes, contemporáneos o encantadores, y personalizarlas en formas y dimensiones adaptadas. Viaje con la tranquilidad de que su equipaje será fácilmente identificable.',
    price: salePriceProd3,
    originalPrice: regularPriceProd3,
    isSale: true,
    imageUrl: 'https://picsum.photos/seed/product3new/600/600',
    category: 'Accesorios de Viaje',
    rating: 4.6,
    reviews: 110,
    details: [
        'Materiales: Silicona ecológica y tela no tejida.',
        'Estilos: Elegante, contemporáneo, encantador.',
        'Personalización: Formas y dimensiones adaptadas.',
        'Adecuado para: Bolsos, equipaje, pasaportes.'
    ]
  },
  {
    id: 'prod-004',
    name: 'Correa Ajustable para Equipaje - ¡Tu Compañero de Viaje Ideal!',
    description: 'La Correa Ajustable para Equipaje es el accesorio esencial que combina seguridad, durabilidad y estilo para todas tus aventuras. Diseñada para ofrecer tranquilidad y protección a tu equipaje, esta correa es perfecta para maletas, bolsos y cualquier pieza de equipaje que necesite un extra de seguridad en tus trayectos.',
    price: calculatePrice('L.10.16'), 
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product4new/600/600',
    category: 'Accesorios de Viaje',
    rating: 4.3,
    reviews: 88,
    details: [
        'Material de Alta Calidad: Fabricada con PP (polipropileno).',
        'Diseño Ajustable y Práctico: Tamaño 180*5cm, ajuste fácil.',
        'Eco-Amigable: Opción Eco-Friendly.',
        'Estilo Versátil: Estilos FASHION, Clásico, PROFESIONAL y Vintage.',
        'Alta Calidad y Durabilidad: Soporta exigencias de viaje.',
        'Ligera y Compacta: Peso 0.084 kg por unidad.',
        'Ideal para: Asegurar equipaje, maletas, bolsos.'
    ]
  },
  {
    id: 'prod-005',
    name: 'Toallas Deportivas Jacquard de Algodón',
    description: 'El producto son toallas personalizadas de rizo grueso jacquard, confeccionadas con 100% algodón. Estas toallas se distinguen por sus características de secado rápido, ser ecológicas y ofrecer un efecto refrescante. Están disponibles en formas rectangulares y cuadradas, presentando un patrón deportivo y siendo adecuadas para adultos en diversas aplicaciones deportivas. Las toallas se pueden lavar a máquina o a mano. Son toallas tejidas con hilo teñido jacquard y se pueden personalizar con un logo.',
    price: salePriceProd5, 
    originalPrice: regularPriceProd5,
    isSale: true,
    imageUrl: 'https://picsum.photos/seed/product5new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Body Care',
    rating: 4.7,
    reviews: 150,
    details: [
        'Material: 100% algodón, rizo grueso jacquard, hilo teñido.',
        'Características: Secado rápido, ecológicas, efecto refrescante.',
        'Personalización: Se pueden personalizar con un logo.',
        'Formas: Rectangulares y cuadradas.',
        'Patrón: Deportivo.',
        'Uso: Adultos, aplicaciones deportivas.',
        'Cuidado: Lavables a máquina o a mano.'
    ]
  },
  {
    id: 'prod-006',
    name: 'Toalla de Microfibra Ultra Absorbente',
    description: 'Toalla de microfibra de secado rápido y alta absorción. Perfecta para viajes, gimnasio o playa. Ligera y compacta.',
    price: calculatePrice('L.23.44'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product6new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Body Care',
    rating: 4.4,
    reviews: 105,
    details: ['Tejido de secado rápido', 'Súper absorbente', 'Varios tamaños disponibles', 'Viene con un lazo para colgar']
  },
  {
    id: 'prod-007',
    name: 'Adaptador de Viaje Universal BOPU-1033 (Sin USB)',
    description: '¡Viaja sin preocupaciones con el Adaptador de Viaje Universal BOPU-1033! Este adaptador esencial está diseñado para que puedas cargar tus dispositivos en casi cualquier parte del mundo, eliminando las frustraciones de la incompatibilidad de enchufes.',
    price: calculatePrice('L.15.63'),
    isSale: false,
    imageUrl: 'https://github.com/TravelStoreHN/Ecommerce/blob/6c2d99d3d3f8455bfea7b1291ed5e483dce7f1f1/Media/Product%20Images/Adaptador%20Giratorio%20EU/1749528881468.png',
    category: 'Electrónicos',
    rating: 4.8,
    reviews: 210,
    details: [
        'Compatibilidad Global: EU (Europa), UK (Reino Unido), USA (Estados Unidos) y AU (Australia).',
        'Diseño Robusto y Compacto: Material ABS duradero, color negro, tamaño 1x1x1 cm, peso 0.012 kg.',
        'Potencia Confiable: Voltaje nominal 110-250V, corriente nominal 6A, potencia máxima aprox. 500 watts.',
        'Uso Multifuncional: Residencial/general y para viajes.',
        'Seguridad: Diseño simple y eficaz (no incluye puertos USB ni WiFi).'
    ]
  },
  {
    id: 'prod-008',
    name: 'Adaptador de Enchufe Giratorio EU 3 en 1',
    description: 'Presentamos el Adaptador de Enchufe Giratorio EU 3 en 1, un accesorio indispensable para cualquier viajero que busca comodidad y eficiencia. Este práctico dispositivo está diseñado para simplificar la carga de tus aparatos electrónicos mientras estás fuera de casa.',
    price: calculatePrice('L.2.09'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product8new/600/600',
    category: 'Electrónicos',
    rating: 4.1,
    reviews: 70,
    details: [
        'Diseño Giratorio de 180 Grados: Para espacios reducidos.',
        '3 Salidas de CA en 1: Convierte una toma europea en tres.',
        'Ultra Compacto y Ligero: 10x8x4 cm, 0.030 kg.',
        'Conexión Inalámbrica: Diseño "mini slim wireless".',
        'Construcción Segura: ABS y Cobre, Certificación CE.',
        'Especificaciones Técnicas: 250V, 10A.',
        'Colores: Negro, Blanco, Verde, Azul, Rojo, Amarillo.',
        'Nota: Advertencia Proposición 65 de California.'
    ]
  },
  {
    id: 'prod-009',
    name: 'Cepillo de Dientes de Bambú con Carbón Natural Eco Biodegradable Redondo',
    description: 'En Travel Store Hn, te presentamos el Cepillo de Dientes de Bambú con Carbón Natural Eco Biodegradable Redondo, el compañero de viaje perfecto para quienes buscan sostenibilidad y cuidado personal. Este cepillo de dientes ha sido diseñado pensando en tu bienestar y el del planeta. Sus cerdas son suaves y están fabricadas con nylon 610, mientras que su mango es de bambú Moso, un material naturalmente eco-biodegradable. Además, es libre de BPA, asegurando una experiencia de cepillado saludable. Con un tamaño regular de 17.5 cm de largo y un peso ligero de solo 11 gramos, es ideal para llevar en tus viajes, usar en casa o incluso como un regalo. Está disponible en colores variados para que elijas el que más te guste. Opta por una opción consciente para tu higiene oral, sin comprometer la efectividad ni tu huella ecológica.',
    price: calculatePrice('L.3.91'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product9new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Oral Care',
    rating: 4.6,
    reviews: 120,
    details: [
        'Material del Mango: Bambú Moso (eco-biodegradable).',
        'Material de Cerdas: Nylon 610 (suaves).',
        'Características: Libre de BPA, eco-biodegradable.',
        'Tamaño: 17.5 cm de largo.',
        'Peso: 11 gramos.',
        'Uso: Viajes, casa, regalo.',
        'Colores: Variados disponibles.'
    ]
  },
  {
    id: 'prod-010',
    name: 'Hilo Dental de Bambú Ecológico con Carbón y Púas',
    description: 'En Travel Store Hn, estamos comprometidos con ofrecer productos de alta calidad y sostenibles. Por ello, te presentamos nuestro Hilo Dental de Bambú Ecológico con Carbón y Púas. Este producto ha sido diseñado pensando en la limpieza diaria y el cuidado bucal de toda la familia, desde niños hasta adultos.',
    price: calculatePrice('L.3.13'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product10new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Oral Care',
    rating: 4.3,
    reviews: 90,
    details: [
        'Materiales Conscientes: Hilo de carbón de bambú, nylon, PP, PE, PTFE. Cerdas de nylon, Dupont, carbón y fibra de bambú.',
        'Eco-amigable y Vegano: Mango 100% biodegradable de bambú.',
        'Calidad y Confianza: Fabricante con 4 años de experiencia, producto "Hot Sale".'
    ]
  },
  {
    id: 'prod-011',
    name: 'Spray Bucal Refrescante de Viaje',
    description: 'Spray bucal de bolsillo para un aliento fresco instantáneo sobre la marcha. Ingredientes naturales y efecto duradero.',
    price: calculatePrice('L.8.86'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product11new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Oral Care',
    rating: 4.5,
    reviews: 100,
    details: ['Fórmula sin azúcar', 'Sabor natural a menta', 'Tamaño de viaje de 10ml', 'Elimina bacterias']
  },
  {
    id: 'prod-012',
    name: 'Bolsa Sanitaria Portátil de Emergencia',
    description: 'En Travel Store Hn, entendemos que la comodidad y la tranquilidad son clave en cada aventura. Por eso, te presentamos la Bolsa Sanitaria Portátil de Emergencia, la solución ideal para esos momentos inesperados en el camino.',
    price: calculatePrice('L.13.03'), 
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product12new/600/600',
    category: 'Salud y Bienestar',
    rating: 4.2,
    reviews: 65,
    details: [
        'Capacidad Óptima: 700ml a 800ml.',
        'Material Avanzado: PE y Polímero Súper Absorbente (transforman líquidos en gel).',
        'Control de Olores: Fragancia de limón o rosa.',
        'Uso Versátil: Viajes largos, atascos, aire libre, emergencias por vómitos.',
        'Para Todos: Hombres, mujeres, personas mayores, niños.',
        'Diseño Compacto y Discreto: Tamaño 30*13*0.2cm.',
        'Empaque Conveniente.'
    ]
  },
  {
    id: 'prod-013',
    name: 'Tapones para Oídos de Espuma de 38dB con Estuche, Desechables',
    description: 'En Travel Store Hn, sabemos que la comodidad es clave en cada viaje. Por eso, te presentamos nuestros Tapones para Oídos de Espuma de 38dB con Estuche, Desechables, tu aliado perfecto para un descanso y tranquilidad inigualables. Diseñados con material de espuma de poliuretano (PU) no tóxico, estos tapones son ligeros y densos, garantizando una comodidad superior incluso durante el uso prolongado. Su forma de bala facilita la inserción de tipo "push-in", adaptándose perfectamente a tu oído para un sellado óptimo. Lo más impresionante es su capacidad de reducción de ruido de 38dB SNR (Single Number Rating), lo que los hace ideales para bloquear el bullicio de los aviones, el ruido de los hoteles o cualquier sonido que pueda interrumpir tu paz mientras viajas o simplemente necesitas concentrarte. Además, cuentan con la certificación CE EN352-2, asegurando su calidad y eficacia. Al ser desechables, te ofrecen una solución higiénica y práctica para cada aventura. Vienen con un estuche que facilita su transporte y almacenamiento, manteniéndolos protegidos y listos para usar en cualquier momento.',
    price: calculatePrice('L.2.09'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product13new/600/600',
    category: 'Comodidad en Viaje',
    rating: 4.7,
    reviews: 180,
    details: [
        'Material: Espuma de poliuretano (PU) no tóxico.',
        'Reducción de Ruido: 38dB SNR.',
        'Diseño: Forma de bala, tipo "push-in", ligeros, densos.',
        'Características: Desechables, higiénicos, prácticos.',
        'Certificación: CE EN352-2.',
        'Incluye: Estuche para transporte y almacenamiento.'
    ]
  },
  {
    id: 'prod-014',
    name: 'Mascarilla de Vapor de Lavanda para Ojos de Autocalentamiento',
    description: 'Relájate y revitaliza tus ojos con la Mascarilla de Vapor de Lavanda para Ojos de Autocalentamiento, el complemento perfecto para tu rutina de cuidado personal o para esos momentos de descanso durante tus viajes. Diseñada para aliviar la fatiga ocular y con propiedades antienvejecimiento/antiarrugas, esta mascarilla de tipo lámina te ofrece una experiencia de spa en cualquier lugar. Su característica autocalentable proporciona un calor suave y reconfortante que ayuda a relajar los músculos alrededor de los ojos.',
    price: calculatePrice('L.8.34'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product14new/600/600',
    category: 'Comodidad en Viaje', 
    subCategory: 'Skincare', // Can also be general comfort
    rating: 4.8,
    reviews: 195,
    details: [
        'Función Principal: Aliviar la fatiga ocular, antienvejecimiento/antiarrugas.',
        'Característica: Autocalentable, proporciona calor suave.',
        'Ingrediente Principal: Vitamina C.',
        'Fragancia: Rosa.',
        'Material: Algodón.',
        'Apto para: Todo tipo de pieles.',
        'Uso Ideal: Viajes, conciliar sueño reparador.',
        'Vida Útil: 3 años.',
        'Tipo: Lámina.'
    ]
  },
  {
    id: 'prod-015',
    name: 'Hojas de Jabón de Papel Portátiles (Pack)',
    description: 'Prácticas y compactas hojas de jabón para lavarse las manos sobre la marcha. Solo añade agua. Vienen en un estuche apto para viajes.',
    price: calculatePrice('L.1.31'),
    isSale: false,
    imageUrl: 'https://picsum.photos/seed/product15new/600/600',
    category: 'Artículos de Tocador',
    subCategory: 'Hand Care',
    rating: 4.4,
    reviews: 115,
    details: ['Paquete de 50 hojas', 'Se disuelven rápidamente', 'Aroma ligero', 'Ideal para acampar y viajar']
  }
];

export const mockTravelKits: Product[] = [
  {
    id: 'kit-001',
    name: 'Kit Esencial de Aseo Personal de Viaje',
    description: 'Todo lo que necesitas para mantenerte fresco y limpio en tus viajes. Incluye versiones mini de champú, acondicionador, gel de baño, cepillo de dientes plegable y pasta dental.',
    price: calculatePrice('L.148.08'), // Approx 6 HNL * 24.68 (example sum)
    imageUrl: 'https://picsum.photos/seed/kit1/600/600',
    category: 'Kits de Viaje',
    rating: 4.6,
    reviews: 75,
    details: ['Champú (50ml)', 'Acondicionador (50ml)', 'Gel de Baño (50ml)', 'Cepillo de dientes plegable', 'Pasta dental (25g)', 'Bolsa de aseo reutilizable'],
    isSale: false,
  },
  {
    id: 'kit-002',
    name: 'Kit de Confort en Vuelo',
    description: 'Maximiza tu comodidad durante vuelos largos o viajes en autobús. Incluye una almohada de cuello inflable, antifaz para dormir y tapones para los oídos.',
    price: calculatePrice('L.123.40'), // Approx 5 HNL * 24.68
    imageUrl: 'https://picsum.photos/seed/kit2/600/600',
    category: 'Kits de Viaje',
    rating: 4.8,
    reviews: 90,
    details: ['Almohada de cuello inflable de terciopelo', 'Antifaz para dormir contorneado', 'Tapones para oídos de silicona con estuche', 'Bolsa de transporte compacta'],
    isSale: false,
  },
  {
    id: 'kit-003',
    name: 'Kit de Aventurero Digital',
    description: 'Mantén tus dispositivos cargados y organizados. Incluye un cargador portátil (power bank), adaptador universal y una pequeña bolsa organizadora de cables.',
    price: calculatePrice('L.296.16'), // Approx 12 HNL * 24.68
    imageUrl: 'https://picsum.photos/seed/kit3/600/600',
    category: 'Kits de Viaje',
    rating: 4.5,
    reviews: 60,
    details: ['Power Bank 10000mAh', 'Adaptador de viaje universal (US/EU/UK/AU)', 'Bolsa organizadora de electrónicos resistente al agua', 'Correas de velcro para cables (x3)'],
    isSale: false,
  }
];


export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'top-5-destinations-honduras',
    title: 'Top 5 Destinos Imperdibles en Honduras',
    date: '2024-07-15',
    author: 'Juana Pérez, Entusiasta de Viajes',
    excerpt: 'Descubre las joyas ocultas y los paisajes impresionantes de Honduras. Desde ruinas antiguas hasta playas vírgenes, ¡planifica tu próxima aventura!',
    content: 'Honduras es una joya centroamericana que ofrece una diversa gama de atracciones. Aquí están nuestras 5 mejores selecciones...\n\n1. Ruinas de Copán: Explora la magnífica ciudad maya, Patrimonio de la Humanidad por la UNESCO.\n2. Roatán: Sumérgete en la Barrera de Coral Mesoamericana, la segunda más grande del mundo.\n3. Parque Nacional Pico Bonito: Camina por exuberantes selvas tropicales y descubre impresionantes cascadas.\n4. Lago de Yojoa: Un paraíso para los observadores de aves y amantes de la naturaleza.\n5. Cayos Cochinos: Islas vírgenes que ofrecen una auténtica experiencia caribeña.',
    imageUrl: 'https://picsum.photos/seed/blog1/800/400',
    tags: ['Honduras', 'Viajes', 'Aventura', 'Destinos']
  },
  {
    id: '2',
    slug: 'packing-essentials-smart-travel',
    title: 'Esenciales de Empaque para un Viaje Inteligente y Sin Estrés',
    date: '2024-06-28',
    author: 'Juan García, Viajero Experimentado',
    excerpt: 'Aprende a empacar ligero e inteligentemente para cualquier viaje. Nuestra lista de verificación asegura que tengas todos los esenciales sin empacar de más.',
    content: 'Empacar puede ser una tarea desalentadora, pero con la estrategia correcta, se convierte en una brisa. Concéntrate en capas de ropa versátiles, artículos de tocador esenciales en tamaños de viaje y gadgets cruciales...\n\n- Capas de ropa versátiles\n- Artículos de tocador en tamaño de viaje\n- Adaptador universal (¡como nuestro Adaptador de Viaje Universal!)\n- Botella de agua reutilizable (¡echa un vistazo a nuestra Toalla Magnética!)\n- Botiquín de primeros auxilios\n- Documentos importantes y copias',
    imageUrl: 'https://picsum.photos/seed/blog2/800/400',
    tags: ['Empaque', 'Consejos', 'Equipo de Viaje', 'Esenciales']
  },
  {
    id: '3',
    slug: 'digital-nomad-honduras',
    title: 'Honduras para Nómadas Digitales: ¿Un Centro en Auge?',
    date: '2024-08-01',
    author: 'Alejandra Chen, Trabajadora Remota',
    excerpt: 'Explorando los pros y contras de elegir Honduras como tu próximo destino de nómada digital. Costo de vida, internet y comunidad.',
    content: 'Con su costo de vida asequible y su impresionante belleza natural, Honduras está atrayendo la atención de los nómadas digitales. Ciudades como Tegucigalpa y San Pedro Sula ofrecen comodidades urbanas, mientras que pueblos costeros como Utila y La Ceiba brindan un ambiente más relajado. La conectividad a Internet está mejorando, pero investiga ubicaciones específicas. La cultura local es acogedora y hay una creciente comunidad de trabajadores remotos...',
    imageUrl: 'https://picsum.photos/seed/blog3/800/400',
    tags: ['Nómada Digital', 'Honduras', 'Trabajo Remoto', 'Estilo de Vida']
  }
];
