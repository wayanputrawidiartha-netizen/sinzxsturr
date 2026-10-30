import React from 'react';
import { WHATSAPP_BASE_URL } from '../utils/catalog';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip on desktop */}
      <div className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-slate-900/95 border border-emerald-500/30 text-white text-xs font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
        <span>Chat Admin Sinzxsturr</span>
      </div>

      {/* Floating Button */}
      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat dengan Admin Sinzxsturr melalui WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] transition-all transform hover:scale-105 active:scale-95 border-2 border-emerald-200/50"
      >
        {/* Soft pulse glow ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.939l-1.564 5.889 6.079-1.595c1.701.936 3.654 1.767 5.921 1.767 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#080F1E] rounded-full shadow" />
      </a>
    </div>
  );
};
