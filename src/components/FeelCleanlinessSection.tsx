import React, { useState } from 'react';
import { Sparkles, Shield, Heart, Wind, Check, Flame, Droplets, Info } from 'lucide-react';
import { sofaGirlImg } from '../data/servicesData';

interface FeelCleanlinessSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const FeelCleanlinessSection: React.FC<FeelCleanlinessSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'hygiene' | 'tactile' | 'safety'>('hygiene');

  return (
    <section id="feel-clean" className="py-16 md:py-24 bg-[#070b14]/75 backdrop-blur-sm text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Стандарти clean.ua</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Чистота, яку ви відчуваєте
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Справжня чистота — це не просто відсутність видимого пилу. Це свіже гірське повітря в кімнаті, 
            приємний дотик до оновленого оксамитового ворсу та абсолютний спокій за здоров'я вашої родини.
          </p>
        </div>

        {/* Core Layout: Visual on Left, Deep Value & Technical Perfection on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 ring-1 ring-blue-500/20 group">
              <img
                src={sofaGirlImg}
                alt="Майстер clean ua проводить хімчистку дивану"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Highlight contrast banner */}
              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white shadow-lg flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-xs font-bold font-heading">
                  Clean UA • Глибинна екстракція
                </span>
              </div>

              {/* Real-time comparison indicator callout */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-700/80">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-red-400 font-semibold flex items-center gap-1">
                    ← До: пил, плями, жир
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    Після: 100% чистота та свіжість →
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="w-1/2 bg-red-500" />
                  <div className="w-1/2 bg-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-300 mt-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  Майстер Clean UA працює в одноразових бахілах, рукавичках та фірмовій уніформі.
                </p>
              </div>
            </div>

            {/* Micro Badge for eco chemicals */}
            <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-400/40">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Еко-безпечно</span>
            </div>
          </div>

          {/* Value Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex rounded-xl bg-slate-900/90 p-1.5 border border-slate-800">
              <button
                onClick={() => setActiveTab('hygiene')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'hygiene' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Гігієна та здоров'я
              </button>
              <button
                onClick={() => setActiveTab('tactile')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'tactile' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Тактильний комфорт
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'safety' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Безпека дітей і тварин
              </button>
            </div>

            {/* Dynamic tab contents */}
            {activeTab === 'hygiene' && (
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Усунення пилових кліщів та алергенів на 99.9%</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Звичайний пилосос збирає лише 15% поверхневого бруду. Екстрактор під тиском промиває волокна на глибину до 5-7 см, ліквідуючи розсадники алергії.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Розщеплення біологічних плям та неприємних запахів</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Спеціальні ензими Chemspec розщеплюють молекули поту, сечі домашніх тварин, кави, шоколаду та вина без пошкодження фарби тканини.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tactile' && (
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">М'який та приємний на дотик ворс</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Після промивання нейтралізуючим кислотним ополіскувачем волокна розправляються, зникає жорсткість та засмальцьованість, відновлюється фабричний дотик.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Повернення соковитості та насиченості кольору</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Сірий пиловий наліт, що накопичувався роками, повністю вимивається у бак брудної води — ви знову бачите справжній колір вашого дивану.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Без фосфатів, хлору та різкого запаху</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Ми використовуємо засоби стандарту WoolSafe та Green Seal. Вони повністю безпечні для малюків, що граються на дивані, та чотирилапих друзів.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Обов'язкова нейтралізація залишків хімії</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Ніколи не залишаємо мильний розчин у меблях. Фінішне промивання кислотним кондиціонером повертає тканині природний нейтральний pH 5.5.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist of assurances */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Сертифікат МОЗ України</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Виїзд майстра з бахілами</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Сушка меблів за 2 год</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Оплата карткою або готівкою</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking('Хімчистка дивану та меблів')}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center justify-center gap-2 font-heading"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Замовити чистку меблів з гарантією</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
