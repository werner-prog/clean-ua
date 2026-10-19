import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface AppDownloadBannerProps {
  onOpenBooking: () => void;
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-slate-900/80 backdrop-blur-sm text-white py-12 border-t border-blue-700/60 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Heading and store buttons */}
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <span className="text-[11px] font-black tracking-widest text-cyan-300 uppercase bg-blue-950/80 px-3 py-1 rounded-full border border-blue-600/40 font-heading">
              Мобільний сервіс Clean UA
            </span>

            <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
              Завантажуйте додаток Clean UA
            </h3>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Швидке замовлення за 2 кліки, накопичення бонусних гривень, відстеження приїзду клінера на карті та онлайн-оплата.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white border border-slate-700 text-xs font-bold transition flex items-center gap-2.5 shadow-md cursor-pointer"
              >
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase">Доступно в</div>
                  <div className="text-xs font-black">App Store</div>
                </div>
              </button>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white border border-slate-700 text-xs font-bold transition flex items-center gap-2.5 shadow-md cursor-pointer"
              >
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase">Завантажити з</div>
                  <div className="text-xs font-black">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Feature Pillars & Tagline from reference */}
          <div className="space-y-5 text-center lg:text-right">
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-700/60 text-xs">
                <span className="font-bold text-cyan-300 block">Швидке замовлення</span>
                <span className="text-[11px] text-slate-300">Виклик майстра за 30 секунд</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-700/60 text-xs">
                <span className="font-bold text-cyan-300 block">Зручна оплата</span>
                <span className="text-[11px] text-slate-300">Apple Pay, Google Pay, картка</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-700/60 text-xs">
                <span className="font-bold text-cyan-300 block">Відстеження статусу</span>
                <span className="text-[11px] text-slate-300">Сповіщення про прибуття</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-700/60 text-xs">
                <span className="font-bold text-cyan-300 block">Бонуси та знижки</span>
                <span className="text-[11px] text-slate-300">Кешбек з кожного чека</span>
              </div>
            </div>

            <p className="text-sm font-black text-cyan-200 tracking-wide font-heading flex items-center justify-center lg:justify-end gap-1.5">
              <span>Clean UA завжди поруч</span>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
