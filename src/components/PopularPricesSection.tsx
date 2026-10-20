import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Car } from 'lucide-react';
import { carDetailingImg } from '../data/servicesData';

interface PopularPricesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const PopularPricesSection: React.FC<PopularPricesProps> = ({ onOpenBooking }) => {
  const quickPrices = [
    { title: 'Генеральне прибирання', price: 'від 100 грн/м²' },
    { title: 'Прибирання після ремонту / будівництва', price: 'від 110 грн/м²' },
    { title: 'Під коротку оренду', price: 'від 100 грн/м²' },
    { title: 'Після орендарів', price: 'від 115 грн/м²' },
    { title: 'Підтримуюче', price: 'від 50 грн/м²' },
    { title: 'VIP Деталізоване', price: 'від 350 грн/м²' },
    { title: 'Дуже брудна квартира', price: 'від 650 грн/м²' },
    { title: 'Після пожежі', price: 'від 750 грн/м²' },
    { title: 'Миття вікон (пакет)', price: 'від 450 грн' },
    { title: 'Хімчистка дивану', price: 'від 1 800 грн' },
    { title: 'Хімчистка матрацу', price: 'від 1 700 грн' },
    { title: 'Хімчистка килиму', price: 'від 150 грн/м²' },
    { title: 'Сезонне миття вікон', price: '180 грн/м²' },
    { title: 'Миття вікон після ремонту / будівництва', price: '200 грн/м²' },
    { title: 'Зняття плівки з вікон', price: '135 грн/м²' }
  ];

  return (
    <section className="py-14 bg-slate-900/80 backdrop-blur-sm text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Актуальні ціни
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Чесні ціни. Якісна робота. Без прихованих платежів.
            </p>
          </div>

          <a
            href="#calculator"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition"
          >
            <span>Повний онлайн-калькулятор</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Layout: Price badges + Special Car detailing banner */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Quick prices pills */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {quickPrices.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenBooking(item.title)}
                className="p-3.5 rounded-xl bg-slate-800/80 backdrop-blur-sm hover:bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/80 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs font-bold text-slate-200 block truncate group-hover:text-white">
                    {item.title}
                  </span>
                  <span className="text-xs font-black text-amber-400 font-heading">
                    {item.price}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            ))}
          </div>

          {/* Right: Featured Car Detailing card */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-blue-500/40 shadow-xl group flex flex-col justify-end p-6 min-h-[260px]">
            <img
              src={carDetailingImg}
              alt="Хімчистка салону авто"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider font-heading">
                <Car className="w-3 h-3" />
                Хімчистка авто
              </span>
              <div className="text-2xl font-black text-white font-heading">
                від 4 949 грн
              </div>
              <p className="text-xs text-slate-300">
                Поверни своєму авто новий вигляд! Глибинна парова дезінфекція салону.
              </p>
              <button
                onClick={() => onOpenBooking('Хімчистка авто')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Детальніше & Замовити</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
