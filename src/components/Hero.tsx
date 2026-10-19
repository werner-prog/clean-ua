import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Droplets, 
  Clock, 
  Home, 
  Wrench, 
  Flame, 
  Heart,
  ChevronRight,
  Calculator,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  generalLivingImg, 
  teamRenovationImg, 
  sofaImg, 
  mattressImg, 
  windowsImg 
} from '../data/servicesData';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
  cityName: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, cityName }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // 5 distinct relevant photos for the 5 points on the main screen
  const hero5Items = [
    {
      id: 1,
      title: 'Генеральне прибирання',
      tag: '100 грн / м²',
      desc: 'Повне знепилення, миття поверхонь, кухонної зони та санвузлів',
      image: generalLivingImg
    },
    {
      id: 2,
      title: 'Прибирання після ремонту / будівництва',
      tag: '110 грн / м²',
      desc: 'Очищення від будівельного пилу, фарби, цементу та затирки',
      image: teamRenovationImg
    },
    {
      id: 3,
      title: 'Хімчистка диванів',
      tag: 'від 1 800 грн',
      desc: 'Глибинне видалення плям, запахів та бруду екстракторами Kärcher',
      image: sofaImg
    },
    {
      id: 4,
      title: 'Хімчистка матраців',
      tag: 'від 1 700 грн',
      desc: 'Антибактеріальна санація, знищення пилових кліщів та алергенів',
      image: mattressImg
    },
    {
      id: 5,
      title: 'Миття вікон',
      tag: 'від 450 грн',
      desc: 'Кришталево чисте скло, рами, ущільнювачі та підвіконня без розводів',
      image: 'https://res.cloudinary.com/ryhd9jhk/image/upload/f_auto/q_auto/dcc2d857999a74e4f6d0e41d85713c85.jpg'
    }
  ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  // Promo countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Video auto-playback notice:', err);
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotate the 5 hero showcase items smoothly
  useEffect(() => {
    const rotater = setInterval(() => {
      setActiveHeroIdx(prev => (prev + 1) % hero5Items.length);
    }, 4500);
    return () => clearInterval(rotater);
  }, [hero5Items.length]);

  const currentHeroItem = hero5Items[activeHeroIdx];

  const featurePills = [
    { title: 'Генеральне прибирання', href: '#services' },
    { title: 'Прибирання після ремонту / будівництва', href: '#services' },
    { title: 'Хімчистка меблів та килимів', href: '#services' },
    { title: 'Хімчистка матраців', href: '#services' },
    { title: 'Миття вікон', href: '#services' },
    { title: 'Миття підлоги роторною машиною', href: '#services' },
    { title: 'Професійне устаткування', href: '#feel-clean' },
    { title: 'Гарантія якості 100%', href: '#feel-clean' },
    { title: 'Безпечна еко-хімія', href: '#feel-clean' }
  ];

  return (
    <section className="relative overflow-hidden bg-transparent text-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-800/80">
      {/* Absolute Background Video (Muted, Loop, Transparent, Multiple Sources) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter brightness-95"
        >
          <source src="/kling_20261015_VIDEO_6036.0.mp4" type="video/mp4" />
          <source src="/kling_20261015_VIDEO____________6036_0.mp4" type="video/mp4" />
          <source src="/kling_20261015_VIDEO_6036_0.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/ryhd9jhk/video/upload/v1792083805/kling_20261015_VIDEO____________6036_0.mp4" type="video/mp4" />
        </video>
        {/* Soft subtle gradient to make foreground elements and text pop while video remains clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/40 via-transparent to-[#070b14]/70 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-cyan-300 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>КЛІНІНГОВА КОМПАНІЯ №1 в УКРАЇНІ</span>
          </div>
          <span className="text-xs font-bold text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Понад 55 000 задоволених клієнтів в Україні
          </span>
        </div>

        {/* 2-Column Hero layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-heading drop-shadow-md">
              Професійний клінінг для вашого простору
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              Професійний клінінг квартир, будинків, офісів та глибинна хімчистка меблів, авто. Гарантія 100% якості та безпеки для вашого комфорту.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/85 p-2.5 rounded-xl border border-slate-750 backdrop-blur-md shadow-lg">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Професійне обладнання</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/85 p-2.5 rounded-xl border border-slate-750 backdrop-blur-md shadow-lg">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Еко-засоби без хімії</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/85 p-2.5 rounded-xl border border-slate-750 backdrop-blur-md shadow-lg">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Досвідчені професіонали</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/85 p-2.5 rounded-xl border border-slate-750 backdrop-blur-md shadow-lg">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Гарантія результату 100%</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-98 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/40 transition cursor-pointer font-heading"
              >
                <span>Замовити прибирання</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#calculator"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white border border-slate-700 font-bold text-sm sm:text-base transition backdrop-blur-md shadow-lg"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Розрахувати ціну</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero 5 Items Showcase with 5 DIFFERENT RELEVANT PHOTOS */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/80 group backdrop-blur-md bg-slate-950/80 min-h-[460px] flex flex-col justify-between">
              
              {/* Active Image from 5 distinct relevant photos */}
              <div className="absolute inset-0 z-0">
                <img
                  src={currentHeroItem.image}
                  alt={currentHeroItem.title}
                  className="w-full h-full object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              </div>

              {/* Top Controls: 5 distinct items tabs */}
              <div className="relative z-20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-white text-xs font-bold font-heading flex items-center gap-1.5 shadow-lg">
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                    <span>5 ТОП-послуг Clean UA</span>
                  </div>

                  <span className="bg-amber-400/90 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-md font-heading shadow-md">
                    {currentHeroItem.tag}
                  </span>
                </div>

                {/* 5 Tab buttons for 5 distinct photos */}
                <div className="flex items-center gap-1.5 bg-slate-950/85 p-1.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
                  {hero5Items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveHeroIdx(idx)}
                      className={`flex-1 py-1.5 px-1 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
                        activeHeroIdx === idx
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                      title={item.title}
                    >
                      <span>#{item.id}</span>
                      <span className="hidden sm:inline truncate">{item.title.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Card Info & Promo Banner */}
              <div className="relative z-20 p-4 space-y-3 mt-auto">
                <div className="bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-sm sm:text-base font-heading text-white">
                      {currentHeroItem.title}
                    </h3>
                    <span className="text-xs font-bold text-cyan-300 font-heading">
                      {currentHeroItem.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                    {currentHeroItem.desc}
                  </p>

                  <button
                    onClick={() => onOpenBooking(currentHeroItem.title)}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Замовити «{currentHeroItem.title}»</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Promo Banner with Countdown Timer */}
                <div className="bg-blue-950/95 backdrop-blur-md p-3 rounded-2xl border border-blue-400/40 text-white shadow-2xl flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-cyan-300 tracking-wider block">
                      АКЦІЯ НА ПРИБИРАННЯ ТА ХІМЧИСТКУ
                    </span>
                    <div className="text-sm font-black font-heading text-amber-300">
                      -15% ЗНИЖКА НА ВСЕ
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-[11px] font-black font-mono">
                      <span className="bg-slate-950/90 px-1.5 py-0.5 rounded text-cyan-300 border border-slate-800">
                        {String(timeLeft.days).padStart(2, '0')}д
                      </span>
                      <span>:</span>
                      <span className="bg-slate-950/90 px-1.5 py-0.5 rounded text-cyan-300 border border-slate-800">
                        {String(timeLeft.hours).padStart(2, '0')}г
                      </span>
                      <span>:</span>
                      <span className="bg-slate-950/90 px-1.5 py-0.5 rounded text-cyan-300 border border-slate-800">
                        {String(timeLeft.minutes).padStart(2, '0')}хв
                      </span>
                      <span>:</span>
                      <span className="bg-slate-950/90 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800">
                        {String(timeLeft.seconds).padStart(2, '0')}с
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating bonus badge top left */}
            <div className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-blue-400/40 hidden sm:flex items-center gap-1.5 z-20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Бонус -10% на перше замовлення</span>
            </div>
          </div>

        </div>

        {/* Moving Marquee Ticker: «Бігунок на відео/банері» */}
        {/* Has high contrast dark background + neon styling so it NEVER gets washed out on video or light themes */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 shadow-2xl py-3 px-2">
          <div className="animate-ticker flex items-center gap-10 whitespace-nowrap text-xs sm:text-sm font-black font-heading tracking-wide">
            {[1, 2, 3].map((rep) => (
              <div key={rep} className="flex items-center gap-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                <span className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border border-cyan-400/40 shadow-sm">
                    Підтверджена статистика
                  </span>
                  <span className="text-white text-xs sm:text-sm font-extrabold tracking-wide">
                    Понад <strong className="text-cyan-300 font-black">55 тисяч об'єктів</strong> прибрано по Україні протягом <strong className="text-amber-300 font-black">8 років</strong> прибрано + <strong className="text-emerald-400 font-black">1 мільйон квадратів</strong> і більше <strong className="text-cyan-300 font-black">1000+ хімчисток</strong>
                  </span>
                </span>

                <span className="text-cyan-400 font-black">★★★</span>

                <span className="flex items-center gap-2 text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Clean UA — №1 в Україні з прибирання та хімчистки</span>
                </span>

                <span className="text-cyan-400 font-black">★★★</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Strip with exact updated numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-750 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-heading">55 000+</div>
            <div className="text-xs text-slate-200 font-medium mt-1">об'єктів прибрано по Україні</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-750 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">+1 000 000 м²</div>
            <div className="text-xs text-slate-200 font-medium mt-1">прибраних квадратів</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-750 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-heading">8 років</div>
            <div className="text-xs text-slate-200 font-medium mt-1">досвіду та довіри</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-750 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-heading">1 000+</div>
            <div className="text-xs text-slate-200 font-medium mt-1">хімчисток меблів</div>
          </div>
        </div>

        {/* Interactive service pills strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
            {featurePills.map((pill, idx) => (
              <a
                key={idx}
                href={pill.href}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-750 backdrop-blur-md whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{pill.title}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

