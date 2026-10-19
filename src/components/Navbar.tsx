import React, { useState } from 'react';
import { Sparkles, Phone, MapPin, Calendar, Clock, Menu, X, ShieldCheck, Droplets } from 'lucide-react';
import { CITIES_UA } from '../data/servicesData';

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentCityObj = CITIES_UA.find(c => c.id === selectedCity) || CITIES_UA[0];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900/90 text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Клінінгова компанія №1 в Україні • Понад 55 000 задоволених клієнтів
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {currentCityObj.eta}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-300 font-bold">Акція -15% на перше замовлення</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Працюємо 7 днів на тиждень</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Brand Logo with Droplet & CleanUA as in reference */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <Droplets className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-heading">
                  Clean<span className="text-cyan-400">UA</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase -mt-1 hidden sm:block font-heading">
                ЧИСТОТА, ЯКУ ВИ ВІДЧУВАЄТЕ
              </p>
            </div>
          </a>
          {/* Social Links */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>чим можемо допомогти:</span>
            <a href="https://viber.com" className="hover:text-cyan-400">Viber</a>
            <a href="https://t.me" className="hover:text-cyan-400">Telegram</a>
            <a href="https://whatsapp.com" className="hover:text-cyan-400">WhatsApp</a>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition">
            Послуги
          </a>
          <a href="#results" className="hover:text-cyan-400 transition flex items-center gap-1.5 text-white">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>10 робіт До/Після</span>
          </a>
          <a href="#feel-clean" className="hover:text-cyan-400 transition">
            Стандарти
          </a>
          <a href="#calculator" className="hover:text-cyan-400 transition">
            Калькулятор ₴
          </a>
          <a href="#reviews" className="hover:text-cyan-400 transition">
            Відгуки
          </a>
        </nav>

        {/* City selector + Phone & CTA buttons */}
        <div className="flex items-center gap-3">
          {/* City select dropdown */}
          <div className="relative hidden md:flex items-center">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              className="pl-8 pr-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 cursor-pointer focus:ring-2 focus:ring-blue-500 transition appearance-none"
            >
              {CITIES_UA.map(city => (
                <option key={city.id} value={city.id} className="bg-slate-900 text-white">
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Call Button with exact reference phone */}
          <a
            href={`tel:${currentCityObj.phone.replace(/[^0-9+]/g, '')}`}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white border border-slate-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentCityObj.phone}</span>
          </a>

          {/* Main CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white text-xs sm:text-sm font-black shadow-lg shadow-blue-600/30 transition cursor-pointer font-heading"
          >
            <span>Замовити прибирання</span>
            <span>→</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-medium text-slate-400">Ваше місто:</span>
            <select
              value={selectedCity}
              onChange={(e) => {
                onSelectCity(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-white bg-slate-800 rounded px-2.5 py-1.5 border border-slate-700"
            >
              {CITIES_UA.map(city => (
                <option key={city.id} value={city.id} className="bg-slate-900">{city.name}</option>
              ))}
            </select>
          </div>

          <nav className="flex flex-col gap-2 font-bold text-slate-200">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Всі послуги клінінгу
            </a>
            <a
              href="#results"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-between"
            >
              <span>10 робіт До / Після</span>
              <span className="text-[10px] bg-cyan-400 text-slate-900 px-2 py-0.5 rounded-full font-black">ФОТО</span>
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Онлайн калькулятор вартості
            </a>
            <a
              href="#feel-clean"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Чистота, яку ви відчуваєте
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Відгуки задоволених клієнтів
            </a>
          </nav>

          <div className="pt-2">
            <a
              href={`tel:${currentCityObj.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              {currentCityObj.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
