import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles, Send } from 'lucide-react';

interface FloatingAssistantWidgetProps {
  onOpenBooking: () => void;
  phone?: string;
}

export const FloatingAssistantWidget: React.FC<FloatingAssistantWidgetProps> = ({ 
  onOpenBooking,
  phone = '+380 (96) 765 53 22'
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Phone formatted for tel: and links
  const rawPhone = '380967655322';

  return (
    <aside 
      aria-label="Онлайн-консультант Clean UA"
      className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start font-sans"
    >
      {/* Expanded speech bubble popup (40% smaller on mobile) */}
      {isOpen ? (
        <div className="relative mb-2 sm:mb-3 w-[210px] sm:w-[320px] bg-slate-950/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 border border-cyan-500/40 shadow-2xl text-white animate-in slide-in-from-bottom-3 duration-300">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
            title="Згорнути помічника"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Consultant Header with Iryna's photo */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pr-5 sm:pr-0">
            <div className="relative shrink-0">
              <img
                src="/iryna.jpg"
                alt="Іра • Clean UA"
                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-cyan-400 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs font-bold text-white font-heading flex items-center gap-1.5 truncate">
                <span className="truncate">Іра • Clean UA</span>
                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-normal shrink-0">онлайн</span>
              </div>
              <div className="text-[9px] sm:text-[11px] text-slate-300 truncate">
                Черговий менеджер клінінгу
              </div>
            </div>
          </div>

          {/* Question / Message */}
          <div className="bg-slate-900/90 rounded-xl p-2 sm:p-3 border border-slate-800 text-[10px] sm:text-xs text-slate-200 mb-2 sm:mb-2.5 leading-snug sm:leading-relaxed">
            <span className="font-bold text-cyan-300 block mb-0.5">
              Чимось допомогти?
            </span>
            Підкажемо точну вартість прибирання або хімчистки за 1 хвилину!
          </div>

          {/* Promo Banner: «Акція: знижка -15%!» */}
          <div className="mb-2 sm:mb-3 p-1.5 sm:p-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex items-center justify-between border border-amber-300/30">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-100 shrink-0" />
              <span className="text-[10px] sm:text-xs font-black font-heading tracking-wide">
                Акція: знижка -15%!
              </span>
            </div>
            <span className="bg-white/25 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase">
              -15%
            </span>
          </div>

          {/* Messengers Buttons: Telegram, Viber, WhatsApp */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {/* Telegram */}
              <a
                href={`https://t.me/premiym0`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-1 sm:py-2.5 sm:px-2 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white text-[9px] sm:text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 shadow-md transition cursor-pointer active:scale-95"
                title="Написати у Telegram"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.97-3.44 3.79-1.63 4.58-1.91 5.1-1.92.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07-.01.16-.03.26z"/>
                </svg>
                <span>Telegram</span>
              </a>

              {/* Viber */}
              <a
                href={`viber://chat?number=%2B380685155154`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-1 sm:py-2.5 sm:px-2 rounded-xl bg-[#7360F2] hover:bg-[#6350e2] text-white text-[9px] sm:text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 shadow-md transition cursor-pointer active:scale-95"
                title="Написати у Viber"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.4 14.5c-.5-.3-1.5-.7-2.1-.4-.6.3-.9.9-1.3 1.3-.3.3-.6.4-.9.2-1.4-.7-2.5-1.8-3.2-3.2-.2-.3-.1-.6.2-.9.4-.4 1-.7 1.3-1.3.3-.6-.1-1.6-.4-2.1-.3-.6-.6-1.5-1.1-1.7-.5-.2-1.1 0-1.6.4-.9.7-1.3 1.7-1.3 2.7 0 2.2 1.1 4.3 2.7 5.9 1.6 1.6 3.7 2.7 5.9 2.7 1 0 2-.4 2.7-1.3.4-.5.6-1.1.4-1.6-.2-.5-1.1-.8-1.6-1m-7.4-12.5C5.4 2 0 7.4 0 14c0 2.8.9 5.3 2.5 7.4L1 23.5l2.4-1.4C5.4 23.4 7.6 24 10 24c6.6 0 12-5.4 12-12s-5.4-10-10-10"/>
                </svg>
                <span>Viber</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${rawPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-1 sm:py-2.5 sm:px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-[9px] sm:text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 shadow-md transition cursor-pointer active:scale-95"
                title="Написати у WhatsApp"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Direct Call Button */}
            <a
              href={`tel:${rawPhone}`}
              className="w-full py-1.5 px-2 sm:py-2 sm:px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-200 text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
              <span>Дзвінок: {phone}</span>
            </a>
          </div>
        </div>
      ) : null}

      {/* Floating Toggle Button with Iryna's small avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-2xl shadow-blue-600/50 border border-cyan-400/50 transition transform hover:scale-105 active:scale-95 cursor-pointer font-heading"
        title="Онлайн консультант Clean UA"
      >
        <div className="relative shrink-0">
          <img
            src="/iryna.jpg"
            alt="Іра"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-white/80"
          />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </div>
        <span className="text-[11px] sm:text-xs font-black tracking-wide">
          {isOpen ? 'Згорнути' : 'Іра • Clean UA'}
        </span>
      </button>
    </aside>
  );
};
