import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, MapPin, Sparkles, ShieldCheck, UploadCloud, User } from 'lucide-react';
import { CITIES_UA } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialCity?: string;
  calculatorEstimate?: {
    total: number;
    summary: string[];
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Професійний клінінг Clean UA',
  initialCity = 'kyiv',
  calculatorEstimate
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [city, setCity] = useState(initialCity);
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-heading">
                Clean UA • Онлайн-замовлення
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Замовлення клінінгу та хімчистки
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-4 font-normal">
              Менеджер зв'яжеться з вами протягом 10 хвилин для підтвердження часу та деталей.
            </p>

            {/* Promo banner with requested wording: «Акція на прибирання та хімчистку» */}
            <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-200 shrink-0" />
                <span className="text-xs sm:text-sm font-black font-heading tracking-wide">
                  Акція на прибирання та хімчистку (-15%)
                </span>
              </div>
              <span className="bg-white/25 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                Знижка
              </span>
            </div>

            {/* Calculator estimate banner if present */}
            {calculatorEstimate && calculatorEstimate.total > 0 && (
              <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Обраний розрахунок:</span>
                  <span className="text-sm font-black text-blue-600 font-heading">
                    {calculatorEstimate.total.toLocaleString()} грн
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  {calculatorEstimate.summary.slice(0, 3).map((item, idx) => (
                    <div key={idx}>• {item}</div>
                  ))}
                  {calculatorEstimate.summary.length > 3 && (
                    <div className="italic text-slate-500">+ ще {calculatorEstimate.summary.length - 3} позицій</div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Ваше ім'я *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Олександр або Тетяна"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Номер телефону *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 96 765 53 22"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">
                    Область / Регіон України *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition cursor-pointer"
                  >
                    {CITIES_UA.map(c => (
                      <option key={c.id} value={c.id} className="text-slate-900 bg-white font-medium py-1">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">
                    Бажана дата прибирання
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Адреса або тип приміщення / побажання
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Місто, вулиця, номер будинку чи квартири"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Photo upload: clean and neutral, no colored badges/marks */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Фото забруднення або об'єкта (необов'язково)</span>
                  <span className="text-[11px] text-slate-500 font-normal">до 5 фото</span>
                </label>
                
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 transition">
                  <div className="flex items-center gap-3">
                    <UploadCloud className="w-5 h-5 text-slate-500 shrink-0" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          const selectedFiles = Array.from(e.target.files).slice(0, 5);
                          setPhotos(selectedFiles);
                        }
                      }}
                      className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-slate-300 file:text-xs file:font-bold file:bg-white file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                {photos.length > 0 && (
                  <p className="text-[11px] text-emerald-700 mt-1.5 font-semibold">
                    ✓ Обрано фотографій: {photos.length}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Підтвердити замовлення</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Оплата тільки після прийому чистоти. Дані суворо конфіденційні.</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-heading">
              Дякуємо, {name || 'Шановний клієнте'}!
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Вашу заявку прийнято в обробку. Менеджер Clean UA зв'яжеться з вами за номером <strong className="text-slate-900 font-mono">{phone}</strong> протягом 10 хвилин для узгодження часу приїзду клінерів.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Регіон:</span>
                <span className="font-bold text-slate-800">
                  {CITIES_UA.find(c => c.id === city)?.name || city}
                </span>
              </div>
              {address && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Адреса:</span>
                  <span className="font-bold text-slate-800">{address}</span>
                </div>
              )}
              {calculatorEstimate && calculatorEstimate.total > 0 && (
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Розрахована сума:</span>
                  <span className="font-black text-blue-600">{calculatorEstimate.total.toLocaleString()} грн</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition cursor-pointer"
              >
                Зрозуміло, закрити
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
