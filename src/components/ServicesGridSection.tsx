import React, { useState } from 'react';
import { 
  MAIN_SERVICES_LIST, 
  ServicePackage 
} from '../data/servicesData';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Home, 
  Building2, 
  Car, 
  ExternalLink 
} from 'lucide-react';

interface ServicesGridSectionProps {
  onOpenBooking: (serviceName: string) => void;
  onOpenThreeWorks: (serviceKey: string) => void;
}

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({
  onOpenBooking,
  onOpenThreeWorks
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'apartments' | 'business' | 'furniture_auto'>('all');

  const filteredServices = MAIN_SERVICES_LIST.filter(s => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0a0f1d]/75 backdrop-blur-sm text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from reference */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>НАШІ ПОСЛУГИ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Професійний клінінг для вашого простору
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Обирайте потрібну послугу або скористуйтеся популярними пакетами та отримайте гарантовану знижку за перше замовлення.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Всі послуги</span>
            </button>

            <button
              onClick={() => setActiveTab('apartments')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                activeTab === 'apartments'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Квартири та будинки</span>
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                activeTab === 'business'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Офіси та бізнес</span>
            </button>

            <button
              onClick={() => setActiveTab('furniture_auto')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                activeTab === 'furniture_auto'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Car className="w-4 h-4 text-cyan-400" />
              <span>Хімчистка меблів та авто</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                {pkg.coverImage && (
                  <img
                    src={pkg.coverImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Popular or Category Tag */}
                {pkg.popular && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wide">
                    Популярне
                  </div>
                )}

                {/* 3 Works button overlay */}
                <button
                  onClick={() => onOpenThreeWorks(pkg.id)}
                  className="absolute top-3 right-3 bg-slate-950/85 hover:bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg backdrop-blur-md border border-white/20 shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>То і що -&gt; Показати роботи</span>
                  <ExternalLink className="w-3 h-3 text-cyan-300" />
                </button>

                {/* Price pill inside image */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-[11px] text-slate-300 font-medium">Вартість:</div>
                  <div className="text-base font-extrabold font-heading text-amber-300">
                    {pkg.price > 0 ? `від ${pkg.price} ${pkg.unit}` : pkg.unit}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                    {pkg.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => onOpenThreeWorks(pkg.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 border border-blue-500/40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>То і що -&gt; Показати роботи</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking(pkg.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 border border-slate-700"
                  >
                    <span>Замовити</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
