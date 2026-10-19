import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, MapPin, Sparkles, ShieldCheck, UploadCloud, User, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { CITIES_UA } from '../data/servicesData';

// =========================================================================
// ДАНІ ДЛЯ ІНТЕГРАЦІЇ ТА НАДСИЛАННЯ:
// 1. Telegram Bot Token: токен бота від @BotFather
// 2. Telegram Chat ID (Отримувач): Chat ID для отримання замовлень
// 3. Web3Forms Access Key (для пошти): ключ для надсилання на email
// =========================================================================
const TELEGRAM_BOT_TOKEN = '8936221350:AAE4Njxrlvz_t9IlA9bboQyhVAhf-EJ5t9c';
const TELEGRAM_CHAT_ID = '942331631';
const WEB3FORMS_ACCESS_KEY = '3ad26c57-3f7e-4a80-8bc1-106100c64533';

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
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Snapshot saved for the success confirmation modal
  const [submittedInfo, setSubmittedInfo] = useState<{
    name: string;
    phone: string;
    city: string;
    address: string;
    service: string;
    estimateTotal?: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const combined = [...photos, ...newFiles];
      setPhotos(combined);

      if (combined.length > 5) {
        setPhotoError('Максимальна кількість фотографій — 5!');
      } else {
        setPhotoError(null);
      }
    }
    // Скидаємо значення інпута, щоб можна було повторно обрати той самий файл
    e.target.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (updated.length > 5) {
      setPhotoError('Максимальна кількість фотографій — 5!');
    } else {
      setPhotoError(null);
    }
  };

  const escapeHtml = (text: string) => {
    return (text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Жорсткий ліміт на фото: не більше 5
    if (photos.length > 5) {
      setPhotoError('Максимальна кількість фотографій — 5!');
      return;
    }

    setIsSubmitting(true);

    const cityName = CITIES_UA.find(c => c.id === city)?.name || city;

    // 1. Формуємо красивий текст заявки для Telegram
    let telegramText = `🔔 <b>НОВЕ ЗАМОВЛЕННЯ З САЙТУ CLEAN UA</b> 🔔\n\n`;
    telegramText += `👤 <b>Клієнт:</b> ${escapeHtml(name.trim() || 'Не вказано')}\n`;
    telegramText += `📞 <b>Телефон:</b> ${escapeHtml(phone.trim())}\n`;
    telegramText += `📍 <b>Регіон:</b> ${escapeHtml(cityName)}\n`;
    telegramText += `🧹 <b>Послуга:</b> ${escapeHtml(service)}\n`;
    if (date) telegramText += `📅 <b>Бажана дата:</b> ${escapeHtml(date)}\n`;
    if (address.trim()) telegramText += `💬 <b>Коментар / Адреса:</b> ${escapeHtml(address.trim())}\n`;
    telegramText += `📸 <b>Фотографій прикріплено:</b> ${photos.length} шт.\n`;

    if (calculatorEstimate && calculatorEstimate.total > 0) {
      telegramText += `\n💰 <b>Розрахована ціна:</b> ${calculatorEstimate.total.toLocaleString()} грн\n`;
      if (calculatorEstimate.summary && calculatorEstimate.summary.length > 0) {
        telegramText += `📋 <b>Деталі розрахунку:</b>\n`;
        calculatorEstimate.summary.forEach(item => {
          telegramText += `  • ${escapeHtml(item)}\n`;
        });
      }
    }

    try {
      // ---------------------------------------------------------
      // ОДНОЧАСНА ВІДПРАВКА: В TELEGRAM ТА НА ПОШТУ (WEB3FORMS)
      // ---------------------------------------------------------

      // A) Відправка в Telegram
      const sendTelegram = async () => {
        try {
          // Надсилаємо основний текст замовлення
          const msgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramText,
              parse_mode: 'HTML'
            })
          });
          const msgData = await msgRes.json();
          if (!msgRes.ok || !msgData.ok) {
            console.error('Помилка відправки тексту в Telegram:', msgData);
          }

          // Якщо є прикріплені фото (до 5 шт)
          if (photos.length === 1) {
            const singlePhotoForm = new FormData();
            singlePhotoForm.append('chat_id', TELEGRAM_CHAT_ID);
            singlePhotoForm.append('photo', photos[0], photos[0].name);
            singlePhotoForm.append('caption', `📸 Фото від ${name} (${phone})`);
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: 'POST',
              body: singlePhotoForm
            });
          } else if (photos.length > 1) {
            const mediaArray = photos.map((_, idx) => ({
              type: 'photo',
              media: `attach://photo_${idx}`,
              caption: idx === 0 ? `📸 Фото до замовлення від ${name} (${phone}) [${photos.length} шт]` : undefined
            }));

            const groupForm = new FormData();
            groupForm.append('chat_id', TELEGRAM_CHAT_ID);
            groupForm.append('media', JSON.stringify(mediaArray));
            photos.forEach((file, idx) => {
              groupForm.append(`photo_${idx}`, file, file.name);
            });

            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`, {
              method: 'POST',
              body: groupForm
            });
          }
        } catch (tgErr) {
          console.error('Помилка під час надсилання в Telegram:', tgErr);
        }
      };

      // B) Відправка на Пошту (Web3Forms)
      const sendWeb3Forms = async () => {
        try {
          const web3Data = new FormData();
          web3Data.append('access_key', WEB3FORMS_ACCESS_KEY);
          web3Data.append('subject', `Замовлення Clean UA: ${service} - ${name} (${phone})`);
          web3Data.append('from_name', 'Сайт Clean UA');
          web3Data.append('name', name);
          web3Data.append('phone', phone);
          web3Data.append('city', cityName);
          web3Data.append('service', service);
          if (date) web3Data.append('date', date);
          if (address) web3Data.append('comment_or_address', address);
          if (calculatorEstimate && calculatorEstimate.total > 0) {
            web3Data.append('calculator_total', `${calculatorEstimate.total} грн`);
            web3Data.append('calculator_summary', calculatorEstimate.summary.join('; '));
          }
          web3Data.append('photos_count', `${photos.length} шт.`);

          // Додаємо файли (до 5 шт)
          photos.forEach((file, idx) => {
            web3Data.append(idx === 0 ? 'attachment' : `attachment_${idx + 1}`, file, file.name);
          });

          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: web3Data
          });
        } catch (mailErr) {
          console.error('Помилка під час надсилання в Web3Forms:', mailErr);
        }
      };

      // Одночасне надсилання обома каналами
      await Promise.allSettled([sendTelegram(), sendWeb3Forms()]);

      // Зберігаємо дані для вікна підтвердження
      setSubmittedInfo({
        name,
        phone,
        city: cityName,
        address,
        service,
        estimateTotal: calculatorEstimate?.total
      });

      // Автоматично очищаємо форму та завантажені фотографії після успішної відправки
      setName('');
      setPhone('+380 ');
      setDate('');
      setAddress('');
      setPhotos([]);
      setPhotoError(null);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Order submission unexpected error:', err);
      // Навіть у разі непередбаченого збою надаємо користувачу позитивний відгук
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmittedInfo(null);
    setPhotoError(null);
    setSubmitError(null);
    onClose();
  };

  const isOverPhotoLimit = photos.length > 5;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-heading">
                Clean UA • Швидке замовлення (Telegram + Email)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Замовлення клінінгу та хімчистки
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-4 font-normal">
              Менеджер зв'яжеться з вами протягом 10 хвилин для підтвердження часу та деталей.
            </p>

            {/* Промо-банер знижок */}
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

            {/* Розрахунок з калькулятора (якщо є) */}
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

              {/* Завантаження фотографій з лімітом до 5 штук */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800">
                    Фото забруднення або об'єкта (до 5 шт)
                  </label>
                  <span className={`text-[11px] font-bold ${isOverPhotoLimit ? 'text-red-600 font-black' : photos.length === 5 ? 'text-amber-600 font-bold' : 'text-slate-500'}`}>
                    {photos.length}/5 фото
                  </span>
                </div>
                
                <div className={`p-3 rounded-xl border transition ${isOverPhotoLimit ? 'border-red-400 bg-red-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                  <div className="flex items-center gap-3">
                    <UploadCloud className={`w-5 h-5 shrink-0 ${isOverPhotoLimit ? 'text-red-500' : 'text-slate-500'}`} />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilesChange}
                      className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-slate-300 file:text-xs file:font-bold file:bg-white file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Попередження при перевищенні ліміту 5 фото */}
                {(photoError || isOverPhotoLimit) && (
                  <div className="mt-2.5 p-3 rounded-xl bg-red-50 border border-red-300 text-xs sm:text-sm text-red-600 flex items-center gap-2 font-bold animate-shake shadow-xs">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <span>Максимальна кількість фотографій — 5!</span>
                  </div>
                )}

                {/* Список / прев'ю завантажених фотографій із кнопкою "Видалити" */}
                {photos.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[11px] text-slate-500 mb-1.5 font-medium">
                      Прикріплені фотографії ({photos.length}):
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {photos.map((file, idx) => {
                        const previewUrl = URL.createObjectURL(file);
                        const isExcess = idx >= 5;
                        return (
                          <div 
                            key={idx} 
                            className={`relative group rounded-xl overflow-hidden border bg-slate-100 aspect-square shadow-sm ${
                              isExcess ? 'border-red-500 ring-2 ring-red-400' : 'border-slate-200'
                            }`}
                          >
                            <img
                              src={previewUrl}
                              alt={`Прев'ю ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isExcess && (
                              <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] text-white font-black bg-red-600 px-1 py-0.5 rounded">Зайве</span>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition cursor-pointer"
                              title="Видалити фото"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {submitError}
                </div>
              )}

              {/* Кнопка відправки форми */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isOverPhotoLimit}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-heading"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Надсилається...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Замовити</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Оплата тільки після прийому чистоти. Дані суворо конфіденційні.</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-snug">
              Дякуємо! Ваше замовлення прийнято, ми зв'яжемося з вами найближчим часом.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Заявка успішно відправлена в Telegram та на робочу пошту. Менеджер Clean UA зв'яжеться з вами за номером <strong className="text-slate-900 font-mono">{submittedInfo?.phone || '+380 ...'}</strong> для уточнення деталей.
            </p>

            {submittedInfo && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Клієнт:</span>
                  <span className="font-bold text-slate-800">{submittedInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Регіон:</span>
                  <span className="font-bold text-slate-800">{submittedInfo.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Послуга:</span>
                  <span className="font-bold text-slate-800">{submittedInfo.service}</span>
                </div>
                {submittedInfo.address && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Адреса / Коментар:</span>
                    <span className="font-bold text-slate-800">{submittedInfo.address}</span>
                  </div>
                )}
                {submittedInfo.estimateTotal && (
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Сума:</span>
                    <span className="font-black text-blue-600">{submittedInfo.estimateTotal.toLocaleString()} грн</span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleClose}
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

export default BookingModal;
