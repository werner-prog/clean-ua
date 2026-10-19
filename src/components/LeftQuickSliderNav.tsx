import React from 'react';
import { Sparkles, Calculator, Layers, MessageSquare, Phone, ArrowDown } from 'lucide-react';

export const LeftQuickSliderNav: React.FC = () => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-2 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 shadow-2xl">
      <div className="text-[10px] font-black text-cyan-400 text-center uppercase tracking-wider px-1 pb-1 border-b border-slate-800 font-heading">
        Навігація
      </div>

      <a
        href="#services"
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 hover:border-blue-500 shadow-sm group relative"
        title="Всі послуги"
      >
        <Layers className="w-4 h-4 text-cyan-400 group-hover:text-white" />
        <span className="absolute left-12 bg-slate-950 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-800 shadow-lg pointer-events-none">
          Послуги клінінгу
        </span>
      </a>

      <a
        href="#dry-cleaning"
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 hover:border-blue-500 shadow-sm group relative"
        title="Хімчистка окремо"
      >
        <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-white" />
        <span className="absolute left-12 bg-slate-950 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-800 shadow-lg pointer-events-none">
          Хімчистка окремо
        </span>
      </a>

      <a
        href="#results"
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 hover:border-blue-500 shadow-sm group relative"
        title="10 робіт До / Після"
      >
        <span className="text-xs font-black text-cyan-400 group-hover:text-white font-heading">10</span>
        <span className="absolute left-12 bg-slate-950 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-800 shadow-lg pointer-events-none">
          10 робіт До/Після
        </span>
      </a>

      <a
        href="#calculator"
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 hover:border-blue-500 shadow-sm group relative"
        title="Калькулятор"
      >
        <Calculator className="w-4 h-4 text-emerald-400 group-hover:text-white" />
        <span className="absolute left-12 bg-slate-950 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-800 shadow-lg pointer-events-none">
          Онлайн калькулятор ₴
        </span>
      </a>

      <a
        href="#reviews"
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-800 hover:border-blue-500 shadow-sm group relative"
        title="Відгуки"
      >
        <MessageSquare className="w-4 h-4 text-pink-400 group-hover:text-white" />
        <span className="absolute left-12 bg-slate-950 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-slate-800 shadow-lg pointer-events-none">
          Відгуки та FAQ
        </span>
      </a>
    </div>
  );
};
