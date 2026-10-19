import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, Layers, ExternalLink } from 'lucide-react';
import { sofaImg, sofaGirlImg, sofa3mImg, mattressImg, carpetImg, armchairImg } from '../data/servicesData';

interface DryCleaningSectionProps {
  onOpenBooking: (serviceName: string) => void;
  onOpenThreeWorks?: (serviceKey: string) => void;
}

export const DryCleaningSection: React.FC<DryCleaningSectionProps> = ({ 
  onOpenBooking,
  onOpenThreeWorks 
}) => {
  // 5 specialized dry cleaning categories with distinct works
  const dryCleaningItems = [
    { 
      title: 'Хімчистка диван прямий', 
      price: '1 800 грн', 
      desc: 'Глибинна екстракція з виведенням плям, жиру та нейтралізацією запахів', 
      image: 'https://i.ibb.co/RkZVFPp1/1-D97-AEE0-1-E75-43-E9-9-B86-F233-FA296-D7-E.png',
      badge: 'Прямий',
      workKey: 'sofa_straight'
    },
    { 
      title: 'Хімчистка кутовий диван', 
      price: '2 500 грн', 
      desc: 'Повна чистка кутових конструкцій, спальних місць та мʼяких подушок', 
      image: 'https://i.ibb.co/G33fXLCx/IMG-5014.jpg',
      badge: 'Кутовий',
      workKey: 'sofa_corner'
    },
    { 
      title: 'Диван 3 метри (великий)', 
      price: '3 500 грн', 
      desc: 'Для великих просторих диванів та незнімних текстильних модулів', 
      image: 'https://i.ibb.co/ZzMPCr1K/IMG-5015.jpg',
      badge: '3 метри',
      workKey: 'sofa_corner'
    },
    { 
      title: 'Хімчистка матрацу', 
      price: '1 700 грн', 
      desc: 'Знищення пилових кліщів, бактерій, дезінфекція та чистка з обох боків', 
      image: 'https://i.ibb.co/TBWfdFKB/IMG-5021.jpg',
      badge: 'Ортопедичний',
      workKey: 'mattress'
    },
    { 
      title: 'Хімчистка килиму / ковроліну', 
      price: '150 грн / м²', 
      desc: 'Екстракторне прання та підняття втоптаного ворсу з виведенням бруду', 
      image: 'https://i.ibb.co/KxhJnBQP/IMG-5025.jpg',
      badge: 'Килими',
      workKey: 'carpet'
    },
    { 
      title: 'Крісло мʼяке / стілець', 
      price: 'від 400 грн', 
      desc: 'Делікатна чистка текстильної оббивки, велюру, оксамиту та стільців', 
      image: 'https://i.ibb.co/XfvxJ7dL/IMG-5027.jpg',
      badge: 'Крісла та стільці',
      workKey: 'armchair_chairs'
    }
  ];

  return (
    <section id="dry-cleaning" className="py-16 md:py-24 bg-[#050811]/75 backdrop-blur-sm text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>СПЕЦІАЛІЗОВАНИЙ БЛОК ХІМЧИСТКИ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Хімчистка окремо від інших послуг
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Професійна глибинна хімчистка м'яких меблів, матраців та килимів із застосуванням гіпоалергенної еко-хімії Chemspec та екстракторів Kärcher Puzzi.
          </p>
        </div>

        {/* Grid with 3 different sofa photos and authentic mattress */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dryCleaningItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Badge top left */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-400/40 text-[11px] font-black text-cyan-300 font-heading">
                  {item.badge}
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-[11px] text-slate-300 font-medium">Вартість:</span>
                  <div className="text-lg font-black font-heading text-amber-300">
                    {item.price}
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition font-heading">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  {/* Button «То і що -> Показати роботи» */}
                  {onOpenThreeWorks && (
                    <button
                      type="button"
                      onClick={() => onOpenThreeWorks(item.workKey || 'sofa_straight')}
                      className="w-full py-2 px-3 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-blue-500/30"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>То і що -&gt; Показати роботи</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenBooking(item.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98 font-heading"
                  >
                    <span>Замовити хімчистку</span>
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
