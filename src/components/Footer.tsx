import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CITIES_UA } from '../data/servicesData';

interface FooterProps {
  onSelectCity: (cityId: string) => void;
  selectedCity: string;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCity, selectedCity }) => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-sm text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight font-heading">
                clean<span className="text-blue-500">.ua</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Національна служба професійного клінінгу та глибинної хімчистки м'яких меблів, матраців і килимів в Україні. 
              Німецьке сертифіковане обладнання Kärcher та безпечна гіпоалергенна хімія.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                🇺🇦 Працюємо по всій Україні
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-semibold text-emerald-400">
                08:00 – 22:00 Без вихідних
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Послуги хімчистки
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services-10" className="hover:text-blue-400 transition">Хімчистка матраців та ліжок</a></li>
              <li><a href="#services-10" className="hover:text-blue-400 transition">Хімчистка прямих і кутових диванів</a></li>
              <li><a href="#services-10" className="hover:text-blue-400 transition">Чистка крісел та стільців</a></li>
              <li><a href="#services-10" className="hover:text-blue-400 transition">Прання килимів та ковроліну</a></li>
              <li><a href="#services-10" className="hover:text-blue-400 transition">Миття панорамних вікон</a></li>
              <li><a href="#services-10" className="hover:text-blue-400 transition">Генеральне прибирання кухні</a></li>
            </ul>
          </div>

          {/* Cities Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Міста обслуговування
            </h4>
            <ul className="space-y-2">
              {CITIES_UA.map(city => (
                <li key={city.id}>
                  <button
                    onClick={() => onSelectCity(city.id)}
                    className={`text-left hover:text-blue-400 transition flex items-center justify-between w-full cursor-pointer ${
                      selectedCity === city.id ? 'text-blue-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-600">{city.eta}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Контакти та диспетчерська
            </h4>
            <div className="space-y-2 text-slate-400">
              <a href="tel:+380967655322" className="flex items-center gap-2 hover:text-white transition font-medium">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>+380 (96) 765 53 22</span>
              </a>
              <a href="mailto:clenua10@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>clenua10@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Щодня з 08:00 до 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>ТОВ "КЛІН ЮА СЕРВІС"</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} clean.ua. Всі права захищені. Професійний клінінг в Україні.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Політика конфіденційності</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Публічна оферта</a>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Зроблено в Україні з любов'ю <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
