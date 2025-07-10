import React, { useState } from 'react';

const RightAdBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleAdClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setVisible(false);
    window.open("YOUR_SECOND_AFFILIATE_LINK", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`hidden lg:flex flex-col items-center fixed right-4 top-36 z-30 w-[100px] h-[280px] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 bg-[#fff]
        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      style={{ minHeight: 180 }}
    >
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 left-2 z-50 text-[#1B1B1B] bg-[#B9FF39] hover:bg-[#1B1B1B] hover:text-[#B9FF39] rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 shadow"
        aria-label="Cerrar anuncio"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Green Brand Bar */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#B9FF39] z-10" />
      {/* Banner Content */}
      <a
        href="YOUR_SECOND_AFFILIATE_LINK"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdClick}
        className="relative z-30 flex flex-col justify-between h-full w-full px-2 py-3 text-[#1B1B1B] text-center"
        aria-label="Oferta especial"
      >
        {/* Logo/Brand Section */}
        <div className="mt-4 mb-1">
          <div className="font-bold text-base flex items-center justify-center gap-1">
            <span className="w-3 h-3 rounded bg-[#B9FF39] inline-block"></span>
            <span className="text-[#1B1B1B]">Oferta</span>
          </div>
          <div className="uppercase text-[8px] opacity-80 tracking-wide text-[#1B1B1B]">
            Exclusiva
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center mt-1 mb-1">
          <div className="font-bold text-xs leading-tight mb-1 bg-[#B9FF39]/10 px-1 py-1 rounded">
            ¡Aprovecha esta oferta!
          </div>
          <div className="text-[9px] opacity-90 mb-1">
            Descuentos exclusivos.<br />Solo por tiempo limitado.
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center">
          <span
            className="w-full mt-1 mb-2 py-1 rounded-full bg-[#B9FF39] text-[#1B1B1B] font-bold text-[10px] uppercase tracking-wide shadow hover:bg-[#1B1B1B] hover:text-[#B9FF39] transition-all duration-200"
            style={{ marginBottom: "10px" }}
          >
            Ver Oferta
          </span>
        </div>
      </a>
    </div>
  );
};

export default RightAdBanner;