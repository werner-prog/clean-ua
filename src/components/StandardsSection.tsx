import React from 'react';
import { ShieldCheck, Cpu, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StandardsSection: React.FC = () => {
  return (
    <section id="standards" className="py-16 md:py-24 bg-slate-900/75 backdrop-blur-sm text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Безкомпромісна якість
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 font-heading tracking-tight">
            Чому клієнти в Україні довіряють clean.ua
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Ми не просто маскуємо бруд освіжувачами, а повністю вимиваємо його з глибини волокон професійною європейською технікою.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/80 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 font-heading">
              Німецька техніка Kärcher
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Потужні турбіни створюють розрідження до 236 мбар, витягуючи вологу разом з пилом та розчиненими плямами.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/80 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 font-heading">
              Хімія Chemspec (США)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Світовий лідер хімчистки. Безпечні біорозкладні формули, сертифіковані за стандартом WoolSafe та екологічними нормами ЄС.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/80 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 font-heading">
              Страхування майна 500 000 ₴
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Кожне замовлення застраховане. Якщо тканина чи оздоблення пошкодяться з вини клінера — повна компенсація гарантована.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/80 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 font-heading">
              Штатні майстри з досвідом
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Усі клінери clean ua проходять 3-тижневе навчання, перевірку служби безпеки та працюють виключно у фірмовій уніформі.
            </p>
          </div>

        </div>

        {/* 4 Steps timeline banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-800/90 border border-slate-700">
          <h3 className="text-base sm:text-lg font-bold font-heading mb-6 text-center text-white">
            Як проходить хімчистка у вашому домі:
          </h3>
          
          <div className="grid sm:grid-cols-4 gap-6 text-center relative">
            <div className="space-y-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black inline-flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm font-bold text-white">Діагностика тканини</h4>
              <p className="text-xs text-slate-400">
                Визначаємо тип волокна (велюр, льон, бавовна) та підбираємо рівень pH.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black inline-flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm font-bold text-white">Нанесення преспрею</h4>
              <p className="text-xs text-slate-400">
                Розпилення активного розчину, що розм'якшує застарілі плями та жир.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black inline-flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm font-bold text-white">Екстракція під тиском</h4>
              <p className="text-xs text-slate-400">
                Подача чистої води під тиском 5 бар та миттєве всмоктування бруду у вакуумний бак.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black inline-flex items-center justify-center">
                4
              </span>
              <h4 className="text-sm font-bold text-white">Ополіскування та сушка</h4>
              <p className="text-xs text-slate-400">
                Нейтралізація кислотним кондиціонером і сушка феном за бажанням замовника. Примітка: це рахується окрема ціна за сушку !
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
