import React, { useState } from "react";

const LeftAdBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  // Handler for ad click
  const handleAdClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setVisible(false);
    window.open("https://indrive.tpo.mx/eb2np7dG", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`hidden lg:flex flex-col items-center fixed left-4 top-36 z-30 w-[100px] h-[280px] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 bg-[#1B1B1B]
        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      style={{ minHeight: 180 }}
    >
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 z-50 text-[#1B1B1B] bg-[#B9FF39] hover:bg-[#1B1B1B] hover:text-[#B9FF39] rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 shadow"
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
        href="https://indrive.tpo.mx/eb2np7dG"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdClick}
        className="relative z-30 flex flex-col justify-between h-full w-full px-2 py-3 text-white text-center"
        aria-label="Viaja con inDrive"
      >
        {/* Logo Section */}
        <div className="mt-4 mb-1">
          <div className="font-bold text-base flex items-center justify-center gap-1">
            <span className="w-3 h-3 rounded bg-[#B9FF39] inline-block"></span>
            <span className="text-white">inDrive</span>
          </div>
          <div className="uppercase text-[8px] opacity-80 tracking-wide text-white">
            Viajes Justos
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center mt-1 mb-1">
          <div className="font-bold text-xs leading-tight mb-1 bg-[#B9FF39]/10 px-1 py-1 rounded">
            ¡TÚ Pones el Precio!
          </div>
          <div className="text-[9px] opacity-90 mb-1">
            Libertad de elección.<br />Precios transparentes.
          </div>
          <ul className="text-left text-[9px] mb-1 pl-1">
            <li className="text-[#B9FF39] font-semibold mb-1">✓ Negocia tu tarifa</li>
            <li className="text-[#B9FF39] font-semibold mb-1">✓ Viajes largos</li>
            <li className="text-[#B9FF39] font-semibold">✓ Tú eliges conductor</li>
          </ul>
          <div className="bg-[#B9FF39]/10 border border-[#B9FF39]/40 rounded-md px-1 py-1 mb-1">
            <div className="uppercase text-[8px] text-[#B9FF39] font-bold">
              650+ ciudades
            </div>
            <div className="uppercase text-[8px] text-[#B9FF39] font-bold">
              47 países
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center">
          <span
            className="w-full mt-1 mb-2 py-1 rounded-full bg-[#B9FF39] text-[#1B1B1B] font-bold text-[10px] uppercase tracking-wide shadow hover:bg-[#1B1B1B] hover:text-[#B9FF39] transition-all duration-200"
            style={{ marginBottom: "18px" }}
          >
            Descargar Gratis
          </span>
        </div>
      </a>
    </div>
  );
};

export default LeftAdBanner;