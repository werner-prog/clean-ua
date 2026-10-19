import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  BEFORE_AFTER_10_WORKS, 
  BeforeAfterWork 
} from '../data/servicesData';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeftRight, 
  CheckCircle2, 
  Heart, 
  Sparkles,
  Gift,
  Crown,
  Layers
} from 'lucide-react';

interface BeforeAfterSliderSectionProps {
  onBookService: (serviceName: string) => void;
  onOpenThreeWorks?: (serviceKey: string) => void;
}

export const BeforeAfterSliderSection: React.FC<BeforeAfterSliderSectionProps> = ({ 
  onBookService,
  onOpenThreeWorks 
}) => {
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentWork: BeforeAfterWork = BEFORE_AFTER_10_WORKS[selectedWorkIndex];

  // Core position calculation from pointer clientX with bounded 0..100%
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  // Modern Pointer Events API: supports mouse, touch (iOS/Android), stylus
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button for mouse, or any touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }
    updatePosition(e.clientX);
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    // Prevent browser touch gestures / scroll hijacking
    if (e.cancelable) {
      e.preventDefault();
    }
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  // Map category to 3-works key
  const getThreeWorksKey = (category: string): 'general' | 'renovation' | 'windows' => {
    if (category.includes('Скління')) return 'windows';
    if (category.includes('Післяремонтний') || category.includes('Підлоги')) return 'renovation';
    return 'general';
  };

  return (
    <section id="results" className="py-16 md:py-24 bg-[#080d1a]/75 backdrop-blur-sm text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>10 ПУНКТІВ ДО ТА ПІСЛЯ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            Реальний результат наших клієнтів ♡
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Проведіть пальцем по екрану телефону або мишкою на ПК, щоб оцінити стан <strong className="text-red-400">ДО</strong> та кришталеву чистоту <strong className="text-cyan-400">ПІСЛЯ</strong> прибирання Clean UA.
          </p>
        </div>

        {/* 10 Navigation Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {BEFORE_AFTER_10_WORKS.map((work, idx) => (
            <button
              key={work.id}
              onClick={() => {
                setSelectedWorkIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 border ${
                selectedWorkIndex === idx
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/40 ring-2 ring-cyan-400/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                selectedWorkIndex === idx ? 'bg-white text-blue-700' : 'bg-slate-800 text-cyan-400'
              }`}>
                {work.id}
              </span>
              <span>{work.title}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Display */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-14">
          
          {/* Left: The Before/After Visual Card with Modern Pointer Events Slider */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div 
              ref={containerRef}
              role="slider"
              aria-label={`Слайдер порівняння до та після: ${currentWork.title}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              style={{ touchAction: 'none' }}
              className="relative h-[380px] sm:h-[480px] md:h-[530px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 select-none bg-slate-950 touch-none group cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {/* 1. BOTTOM LAYER: BEFORE (Стан ДО - реальне фото брудного/запилюженого стану) */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                  src={currentWork.beforeImage || currentWork.image}
                  alt={`${currentWork.title} стан ДО`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* 2. TOP LAYER: AFTER (Стан ПІСЛЯ - кришталево чистий стан, розширюється в реальному часі через clip-path) */}
              <div 
                className="absolute inset-0 z-10 overflow-hidden select-none pointer-events-none will-change-[clip-path]"
                style={{ 
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                  WebkitClipPath: `inset(0 0 0 ${sliderPosition}%)`
                }}
              >
                <img
                  src={currentWork.afterImage || currentWork.image}
                  alt={`${currentWork.title} стан ПІСЛЯ Clean UA`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 via-transparent to-white/5 pointer-events-none" />
              </div>

              {/* Pinned ДО Badge (Top Left - Never overlapped by slider, extra contrast & shadows) */}
              <div className="absolute top-4 left-4 z-30 bg-slate-950/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-red-500/80 text-white shadow-[0_4px_20px_rgba(0,0,0,0.85)] flex items-center gap-2 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                <span className="text-xs sm:text-sm font-black text-red-400 font-heading tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  СТАН ДО
                </span>
              </div>

              {/* Pinned ПІСЛЯ Badge (Top Right - Never overlapped by slider, extra contrast & shadows) */}
              <div className="absolute top-4 right-4 z-30 bg-slate-950/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-cyan-400/80 text-white shadow-[0_4px_20px_rgba(0,0,0,0.85)] flex items-center gap-2 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="text-xs sm:text-sm font-black text-cyan-300 font-heading tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  ПІСЛЯ CLEAN UA
                </span>
              </div>

              {/* ULTRA-BRIGHT HIGH-CONTRAST DIVIDER LINE */}
              {/* Has heavy dark outline + electric cyan neon glow so it's 100% visible on any photo */}
              <div 
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ 
                  left: `${sliderPosition}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {/* Vertical Line with contrasting black halo and neon cyan center */}
                <div className="w-1.5 sm:w-2 h-full mx-auto bg-gradient-to-b from-cyan-300 via-white to-cyan-300 shadow-[0_0_0_2px_rgba(0,0,0,0.95),0_0_15px_#06b6d4,0_0_30px_#3b82f6]" />

                {/* Bright High-Contrast Circular Knob */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-950/95 border-[3px] border-cyan-300 shadow-[0_0_0_3px_rgba(0,0,0,0.95),0_0_20px_#06b6d4,0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center text-cyan-300 pointer-events-none transition-transform group-hover:scale-110 active:scale-95">
                  <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 stroke-[2.5] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" />
                </div>
              </div>


              {/* Bottom Quick Switcher Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-950/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-2xl flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPosition(95);
                  }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer text-[11px] font-black ${
                    sliderPosition > 80 ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Показати ДО
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPosition(50);
                  }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer text-[11px] font-black ${
                    sliderPosition >= 40 && sliderPosition <= 60 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Порівняти 50/50
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPosition(5);
                  }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer text-[11px] font-black ${
                    sliderPosition < 20 ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Показати ПІСЛЯ
                </button>
              </div>
            </div>

            {/* Quick arrow controls below image */}
            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <button
                onClick={() => setSelectedWorkIndex((prev) => (prev > 0 ? prev - 1 : BEFORE_AFTER_10_WORKS.length - 1))}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm cursor-pointer font-bold"
              >
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
                <span>Попередній пункт</span>
              </button>

              <div className="text-center font-semibold text-slate-300">
                <span className="text-slate-500 text-xs">Пункт {currentWork.id} з 10:</span>{' '}
                <strong className="text-white font-heading">{currentWork.title}</strong>
              </div>

              <button
                onClick={() => setSelectedWorkIndex((prev) => (prev < BEFORE_AFTER_10_WORKS.length - 1 ? prev + 1 : 0))}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm cursor-pointer font-bold"
              >
                <span>Наступний пункт</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Right: Technical Information, Portfolio & Ordering */}
          <div className="lg:col-span-4 bg-slate-900/90 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-blue-500/15 px-3 py-1 rounded-md border border-blue-500/30">
                Пункт #{currentWork.id} • {currentWork.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-3 font-heading">
                {currentWork.title}
              </h3>
            </div>

            {/* Problem & Solution details */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-750 text-xs">
                <p className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span>Стан ДО прибирання:</span>
                </p>
                <p className="text-slate-300 leading-relaxed">{currentWork.problem}</p>
                <p className="text-[11px] text-slate-400 italic mt-1.5 font-medium">«{currentWork.beforeDesc}»</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-750 text-xs">
                <p className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Результат ПІСЛЯ Clean UA:</span>
                </p>
                <p className="text-slate-300 leading-relaxed">{currentWork.solution}</p>
                <p className="text-[11px] text-slate-400 italic mt-1.5 font-medium">«{currentWork.afterDesc}»</p>
              </div>
            </div>

            {/* Action Buttons: «То і що -> Показати роботи» + «Замовити такий результат» */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              {onOpenThreeWorks && (
                <button
                  type="button"
                  onClick={() => onOpenThreeWorks(getThreeWorksKey(currentWork.category))}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>То і що -&gt; Показати роботи (2 роботи)</span>
                </button>
              )}

              <button
                onClick={() => onBookService(currentWork.title)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-98 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <span>Замовити такий результат</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* 10 Visual Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Оберіть будь-який із 10 об'єктів для перегляду:</span>
            </h3>
            <span className="text-xs font-semibold text-slate-400 hidden sm:block">
              Клікніть на картку для миттєвого відкриття
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {BEFORE_AFTER_10_WORKS.map((work, idx) => {
              const isSelected = selectedWorkIndex === idx;
              return (
                <div
                  key={work.id}
                  onClick={() => {
                    setSelectedWorkIndex(idx);
                    setSliderPosition(50);
                    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-blue-950/60 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-blue-900/40 scale-102'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-750 hover:bg-slate-850'
                  }`}
                >
                  <div className="relative h-28 rounded-xl overflow-hidden bg-slate-950 mb-2">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    />
                    
                    {/* Number badge */}
                    <div className="absolute top-1.5 left-1.5 bg-slate-950/90 text-cyan-300 text-[10px] font-black px-1.5 py-0.5 rounded font-heading border border-cyan-500/30">
                      #{work.id}
                    </div>

                    <div className="absolute bottom-1.5 inset-x-1.5 flex justify-between text-[9px] font-black text-white px-2 py-0.5 bg-slate-950/85 backdrop-blur-xs rounded border border-white/10">
                      <span className="text-red-400">ДО</span>
                      <span className="text-slate-500">|</span>
                      <span className="text-cyan-400">ПІСЛЯ</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate">
                      {work.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {work.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bonus Program & VIP status blocks */}
        <div className="grid md:grid-cols-12 gap-6 pt-4">
          
          {/* Бонусна програма */}
          <div className="md:col-span-7 bg-slate-900/90 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Бонусна програма
                  </h3>
                  <p className="text-xs text-slate-400">
                    Копи бонуси — отримуй знижки на клінінг!
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center my-4">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-750">
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 font-heading">10%</div>
                  <div className="text-[11px] text-slate-300 font-semibold mt-0.5">Бонусів на 1 замовлення</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-750">
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 font-heading">5%</div>
                  <div className="text-[11px] text-slate-300 font-semibold mt-0.5">Знижка на повторне</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-750">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-heading">15%</div>
                  <div className="text-[11px] text-slate-300 font-semibold mt-0.5">День народження та свята</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onBookService('Приєднання до бонусної програми Clean UA')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Приєднатися →
              </button>
              <span className="text-xs text-slate-400 font-medium">
                Бонуси нараховуються за номером телефону
              </span>
            </div>
          </div>

          {/* Преміум клієнт */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-blue-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Преміум клієнт
                  </h3>
                  <p className="text-xs text-blue-200">
                    Статус для вашого комфорту
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Crown className="w-5 h-5" />
                </div>
              </div>

              <ul className="space-y-2 text-xs text-blue-100 mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Пріоритетний запис на вихідні та свята</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Ексклюзивні знижки до 20%</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Персональний менеджер та черговий майстер</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Бонуси на кожне наступне замовлення</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onBookService('Отримання статусу Преміум клієнт Clean UA')}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-slate-950 text-xs font-black transition cursor-pointer font-heading shadow-md"
            >
              Стати преміум клієнтом
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
 // оновлено