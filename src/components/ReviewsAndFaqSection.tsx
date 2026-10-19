import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, Check, Phone, ShieldCheck, Sparkles, Send, X, PlusCircle, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA } from '../data/servicesData';

interface ReviewsAndFaqProps {
  onOpenBooking: () => void;
  phone: string;
}

interface UserReview {
  name: string;
  city: string;
  date: string;
  service: string;
  text: string;
  rating: number;
}

export const ReviewsAndFaqSection: React.FC<ReviewsAndFaqProps> = ({ onOpenBooking, phone }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reviews, setReviews] = useState<UserReview[]>(REVIEWS_DATA);
  
  // Interactive Review Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewerService, setReviewerService] = useState('Хімчистка дивану та килимів');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerText, setReviewerText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerText.trim()) return;

    const newReview: UserReview = {
      name: reviewerName.trim(),
      city: reviewerCity.trim() || 'Україна',
      date: 'Щойно',
      service: reviewerService,
      text: reviewerText.trim(),
      rating: reviewerRating
    };

    setReviews([newReview, ...reviews]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormOpen(false);
      setReviewerName('');
      setReviewerCity('');
      setReviewerText('');
      setReviewerRating(5);
    }, 2000);
  };

  const faqs = [
    {
      q: 'Чи можна замовити прибирання на вихідні?',
      a: 'Так, ми приймаємо замовлення на вихідні та святкові дні за попереднім записом.'
    },
    {
      q: 'Чи входять мийні засоби та обладнання у вартість?',
      a: 'Так, ми привозимо професійне обладнання, мийні засоби та все необхідне для якісного прибирання.'
    },
    {
      q: 'Скільки часу триває прибирання?',
      a: 'Тривалість залежить від площі приміщення, рівня забруднення та обраного виду прибирання. Точний час узгодимо під час оформлення замовлення.'
    },
    {
      q: 'Чи потрібно бути присутнім під час прибирання?',
      a: 'Ні, ви можете займатися своїми справами. Наша команда виконає прибирання без вашої присутності за попередньою домовленістю.'
    },
    {
      q: 'Чи можна передати ключі від квартири клінінговій команді?',
      a: 'Так, ви можете передати ключі нашим працівникам і повернутися після завершення прибирання. Ми дбайливо ставимося до вашого майна та безпеки.'
    },
    {
      q: 'Скільки часу сохне диван або матрац після хімчистки?',
      a: 'За звичайної кімнатної температури тканина повністю висихає за 4–8 годин. Якщо ви замовляєте послугу турбо-сушки спеціальним клінінговим феном, меблями можна користуватися вже через 1–2 години після закінчення процедури.'
    },
    {
      q: 'Чи безпечна використовувана хімія для дітей та котів/собак?',
      a: 'Так, ми використовуємо виключно біорозкладну хімію Chemspec (США) та Kiehl (Німеччина), що не містить токсичних випарів чи фосфатів. Обов\'язковим етапом є фінішне промивання кислотним ополіскувачем, який нейтралізує луг та повертає тканині природний нейтральний pH.'
    },
    {
      q: 'Чи зникнуть застарілі плями від кави, вина або фломастерів?',
      a: 'Ми видаляємо до 98% складних застарілих плям. Майстер тестує плямовивідники локально. Якщо тканина не була раніше пропалена агресивними побутовими розчинниками (наприклад, Vanish чи Доместос), результат майже завжди 100% бездоганний.'
    },
    {
      q: 'Чи потрібно готувати меблі чи кімнату до приїзду майстра?',
      a: 'Вам достатньо лише звільнити доступ до меблів з обох боків та прибрати дрібні особисті речі. Майстер Clean UA самостійно підготує робочу зону, розстелить захисне покриття під техніку та одягне змінне взуття або бахіли.'
    },
    {
      q: 'Як здійснюється оплата?',
      a: 'Оплата відбувається виключно ПІСЛЯ виконання всіх робіт та особистого огляду клієнтом. Ви можете оплатити готівкою, банківською карткою через термінал або за реквізитами IBAN для юридичних осіб.'
    }
  ];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#0a0f1d]/75 backdrop-blur-sm text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Reviews Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Реальний досвід клієнтів</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Відгуки про сервіс Clean UA
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-normal">
            Середня оцінка 4.98 на основі 1 450+ виконаних замовлень по всій Україні.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer active:scale-98 font-heading"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isFormOpen ? 'Сховати форму' : 'Залишити свій відгук'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Add Review Form Modal/Dropdown */}
        {isFormOpen && (
          <div className="max-w-2xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-blue-500/60 shadow-2xl relative animate-in fade-in duration-200 text-slate-100">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white font-heading">
                    Ваш відгук про чистоту Clean UA
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Ваше ім'я та прізвище *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Оксана Шевченко"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Місто або область
                    </label>
                    <input
                      type="text"
                      placeholder="Київ (Оболонь) або Львів"
                      value={reviewerCity}
                      onChange={(e) => setReviewerCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Послуга, якою ви скористалися
                    </label>
                    <select
                      value={reviewerService}
                      onChange={(e) => setReviewerService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="Генеральне прибирання">Генеральне прибирання</option>
                      <option value="Прибирання після ремонту / будівництва">Прибирання після ремонту / будівництва</option>
                      <option value="Хімчистка дивану та килимів">Хімчистка дивану та килимів</option>
                      <option value="Хімчистка матрацу">Хімчистка матрацу</option>
                      <option value="Миття вікон та склопакетів">Миття вікон та склопакетів</option>
                      <option value="Очищення кухні від жиру">Очищення кухні від жиру</option>
                      <option value="Миття бруківки / фасаду">Миття бруківки / фасаду</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Ваша оцінка:
                    </label>
                    <div className="flex items-center gap-1.5 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewerRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer transition transform hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              (hoverRating || reviewerRating) >= star
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-black text-amber-300 font-heading">
                        {reviewerRating} з 5
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Текст вашого відгуку *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Опишіть якість прибирання, пунктуальність клінерів та враження від результату..."
                    value={reviewerText}
                    onChange={(e) => setReviewerText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-1.5 cursor-pointer font-heading"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Опублікувати відгук</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-black text-white font-heading">
                  Щиро дякуємо за ваш відгук!
                </h4>
                <p className="text-xs text-slate-300">
                  Ваш відгук успішно опубліковано на сайті Clean UA.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-white font-heading">{rev.name}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>{rev.city}</span>
                  <span className="text-cyan-400 font-medium">{rev.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-800">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Часті запитання (FAQ)
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Все, що потрібно знати перед замовленням клінінгу та хімчистки
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-cyan-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Contact Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-400/30">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Потрібна особиста консультація або швидкий виїзд?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Зателефонуйте черговому менеджеру прямо зараз або залиште онлайн-заявку зі знижкою 15%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-white/20 transition cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs sm:text-sm shadow-xl transition cursor-pointer font-heading"
            >
              Замовити дзвінок
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
