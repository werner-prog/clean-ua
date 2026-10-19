import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Check, Home, Armchair, Layers, RefreshCw } from 'lucide-react';

interface InteractiveCalculatorProps {
  onOrderWithEstimate: (details: {
    total: number;
    summary: string[];
  }) => void;
}

interface AreaCleaningType {
  id: string;
  name: string;
  rate: number; // грн за м² або год
  unit: string;
}

interface CalcExtraItem {
  id: string;
  title: string;
  price: number;
  unit: string;
}

// 1. Точний список додаткових послуг для прибирання приміщень за ТЗ користувача:
const HOUSEHOLD_ADDITIONAL_SERVICES: CalcExtraItem[] = [
  { id: 'hood_clean', title: 'Витяжка', price: 200, unit: 'грн (1 шт.)' },
  { id: 'oven_clean', title: 'Духовка', price: 250, unit: 'грн (1 шт.)' },
  { id: 'fridge_clean', title: 'Холодильник', price: 300, unit: 'грн (1 шт.)' },
  { id: 'microwave_clean', title: 'Мікрохвильовка', price: 200, unit: 'грн (1 шт.)' },
  { id: 'washing_machine', title: 'Пральна машинка', price: 250, unit: 'грн (1 шт.)' },
  { id: 'dishwasher', title: 'Посудомийна машинка', price: 300, unit: 'грн (1 шт.)' },
  { id: 'tile_grout', title: 'Шви плитки підлоги', price: 100, unit: 'грн / м²' },
  { id: 'dish_wash', title: 'Миття посуду', price: 150, unit: 'грн (1 год)' },
  { id: 'curtains_hang', title: 'Вішання штор або тюлю', price: 50, unit: 'грн (1 шт.)' },
  { id: 'win_season_m2', title: 'Миття вікон сезонне', price: 180, unit: 'грн / м²' },
  { id: 'win_repair_m2', title: 'Миття вікон після ремонту / будівництва', price: 110, unit: 'грн / м²' }
];

// 2. Окремі послуги хімчистки меблів та текстилю:
const DRY_CLEANING_SERVICES: CalcExtraItem[] = [
  { id: 'sofa_straight', title: 'Хімчистка диван прямий', price: 1800, unit: 'грн (1 шт.)' },
  { id: 'sofa_corner', title: 'Хімчистка кутовий диван', price: 2500, unit: 'грн (1 шт.)' },
  { id: 'sofa_3m', title: 'Диван 3 метри (великий)', price: 3500, unit: 'грн (1 шт.)' },
  { id: 'mattress_item', title: 'Хімчистка матрацу (двосторонній)', price: 1700, unit: 'грн (1 шт.)' },
  { id: 'carpet_item', title: 'Хімчистка килиму / ковроліну', price: 150, unit: 'грн / м²' },
  { id: 'armchair_item', title: 'Крісло мʼяке', price: 650, unit: 'грн (1 шт.)' },
  { id: 'chair_item', title: 'Стілець з мʼяким сидінням', price: 400, unit: 'грн (1 шт.)' },
  { id: 'pillow_item', title: 'Подушка (парова дезінфекція)', price: 250, unit: 'грн (1 шт.)' },
  { id: 'textile_dry', title: 'Сушка текстилю турбо-феном', price: 750, unit: 'грн (1 шт.)' },
  { id: 'car_detailing', title: 'Хімчистка салону авто', price: 4949, unit: 'грн' }
];

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ onOrderWithEstimate }) => {
  // Режими калькулятора: 'cleaning' (тільки прибирання), 'dry_cleaning' (тільки хімчистка), 'complex' (обидва)
  const [calcMode, setCalcMode] = useState<'cleaning' | 'dry_cleaning' | 'complex'>('cleaning');

  // Категорії площі приміщень
  const areaTypes: AreaCleaningType[] = [
    { id: 'renovation', name: 'Прибирання після ремонту / будівництва', rate: 110, unit: 'грн / м²' },
    { id: 'general', name: 'Генеральне прибирання', rate: 100, unit: 'грн / м²' },
    { id: 'short_rent', name: 'Під коротку оренду', rate: 100, unit: 'грн / м²' },
    { id: 'after_tenants', name: 'Після орендарів', rate: 115, unit: 'грн / м²' },
    { id: 'maintenance', name: 'Підтримуюче прибирання', rate: 50, unit: 'грн / м²' },
    { id: 'vip', name: 'VIP Деталізоване прибирання', rate: 350, unit: 'грн / м²' },
    { id: 'very_dirty', name: 'Дуже брудна квартира', rate: 650, unit: 'грн / м²' },
    { id: 'fire', name: 'Кухня від жиру', rate: 120, unit: 'грн / м²' },
    { id: 'win_season', name: 'Сезонне миття вікон', rate: 180, unit: 'грн / м²' },
    { id: 'win_repair', name: 'Миття вікон після ремонту / будівництва', rate: 110, unit: 'грн / м²' },
    { id: 'paving', name: 'Миття бруківки (за 1 год)', rate: 750, unit: 'грн / год' },
    { id: 'facade', name: 'Миття фасаду', rate: 300, unit: 'грн / м²' },
    { id: 'office', name: 'Миття офісів 1 раз/тиждень', rate: 0, unit: 'індивідуально' }
  ];

  const [selectedAreaType, setSelectedAreaType] = useState<string>('general');
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(15);

  // Кількість побутових додаткових послуг (витяжка, духовка тощо) - за замовчуванням порожньо (0)
  const [householdItems, setHouseholdItems] = useState<{ [id: string]: number }>({});

  // Кількість послуг хімчистки меблів (дивани, матраци тощо) - за замовчуванням 0
  const [dryCleaningCounts, setDryCleaningCounts] = useState<{ [id: string]: number }>({});

  const updateHouseholdCount = (id: string, delta: number) => {
    setHouseholdItems(prev => {
      const current = prev[id] || 0;
      if (current === 0 && delta > 0) {
        return { ...prev, [id]: 1 };
      }
      return {
        ...prev,
        [id]: Math.max(0, current + delta)
      };
    });
  };

  const setHouseholdItemDirect = (id: string, val: number) => {
    setHouseholdItems(prev => ({
      ...prev,
      [id]: Math.max(0, val)
    }));
  };

  const updateDryCleaningCount = (id: string, delta: number) => {
    setDryCleaningCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const applyRenovationWindowsPreset = () => {
    setCalcMode('cleaning');
    setSelectedAreaType('renovation');
    setAreaSquareMeters(65);
    setHouseholdItems({ win_repair_m2: 165 });
  };

  const resetAll = () => {
    setHouseholdItems({});
    setDryCleaningCounts({});
  };

  // Розрахунок:
  const currentAreaTypeObj = areaTypes.find(t => t.id === selectedAreaType) || areaTypes[0];

  // 1. Площа враховується ТІЛЬКИ коли обрано 'cleaning' або 'complex'. У режимі 'dry_cleaning' вартість площі = 0!
  const isAreaActive = calcMode === 'cleaning' || calcMode === 'complex';
  const areaCost = (isAreaActive && currentAreaTypeObj.rate > 0) ? currentAreaTypeObj.rate * areaSquareMeters : 0;

  // 2. Побутові допи (витяжка, духовка, холодильник тощо) враховуються при 'cleaning' або 'complex'
  const isHouseholdActive = calcMode === 'cleaning' || calcMode === 'complex';
  const householdCost = isHouseholdActive 
    ? HOUSEHOLD_ADDITIONAL_SERVICES.reduce((acc, item) => acc + (item.price * (householdItems[item.id] || 0)), 0)
    : 0;

  const isDryCleaningActive = calcMode === 'dry_cleaning' || calcMode === 'complex';
  const dryCleaningCost = DRY_CLEANING_SERVICES.reduce((acc, item) => acc + (item.price * (dryCleaningCounts[item.id] || 0)), 0);
  const subTotal = areaCost + householdCost + dryCleaningCost;

  // Загальна вартість та гнучка знижка
  const totalDryCleaningUnits = Object.values(dryCleaningCounts).reduce((a, b) => a + b, 0);
  const hasCleaning = isAreaActive && (areaCost > 0 || householdCost > 0);
  const hasDryCleaning = isDryCleaningActive && totalDryCleaningUnits > 0;

  let discountPercent = 0;
  let discountLabel = '';

  if (calcMode === 'complex' || (hasCleaning && hasDryCleaning)) {
    discountPercent = 0.15;
    discountLabel = 'Комплексна знижка (-15%)';
  } else if (calcMode === 'dry_cleaning' || hasDryCleaning) {
    if (totalDryCleaningUnits >= 2) {
      discountPercent = 0.10;
      discountLabel = 'Знижка за кілька позицій (-10%)';
    } else {
      discountPercent = 0.0;
      discountLabel = '';
    }
  } else if (calcMode === 'cleaning' || hasCleaning) {
    discountPercent = 0.05;
    discountLabel = 'Знижка на прибирання (-5%)';
  } else {
    discountPercent = 0.0;
    discountLabel = '';
  }

  const discountAmount = Math.round(subTotal * discountPercent);
  const finalTotal = subTotal > 0 ? subTotal - discountAmount : 0;

  const handleCheckout = () => {
    const summary: string[] = [];

    if (isAreaActive) {
      if (currentAreaTypeObj.rate > 0) {
        summary.push(`${currentAreaTypeObj.name}: ${areaSquareMeters} м² (${areaCost} грн)`);
      } else {
        summary.push(`${currentAreaTypeObj.name}: індивідуальний прорахунок`);
      }
    }

    if (isHouseholdActive) {
      HOUSEHOLD_ADDITIONAL_SERVICES.forEach(item => {
        const qty = householdItems[item.id] || 0;
        if (qty > 0) {
          const unitStr = item.unit.includes('м²') ? 'м²' : item.unit.includes('год') ? 'год' : 'шт';
          summary.push(`${item.title}: ${qty} ${unitStr} (${(item.price * qty).toLocaleString()} грн)`);
        }
      });
    }

    if (isDryCleaningActive) {
      DRY_CLEANING_SERVICES.forEach(item => {
        const qty = dryCleaningCounts[item.id] || 0;
        if (qty > 0) {
          summary.push(`${item.title}: ${qty} шт (${item.price * qty} грн)`);
        }
      });
    }

    onOrderWithEstimate({
      total: finalTotal,
      summary
    });
  };

  const winRepairQty = householdItems['win_repair_m2'] || 0;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#090e1c]/75 backdrop-blur-sm text-white border-b border-slate-800 relative overflow-hidden w-full box-border">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 box-border min-w-0">
        
        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>ОНЛАЙН КАЛЬКУЛЯТОР ВАРТОСТІ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Точний розрахунок вартості Clean UA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Оберіть бажану послугу: прибирання або хімчистку окремо, або замовте комплекс зі знижкою 15%!
          </p>
          <div className="text-cyan-400 font-bold text-lg mt-4 animate-pulse">
            Виберіть послугу ⬇️
          </div>

          {/* 3 окремі незалежні режими калькулятора */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-7">
            <button
              type="button"
              onClick={() => setCalcMode('cleaning')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                calcMode === 'cleaning'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Тільки прибирання (м²)</span>
            </button>

            <button
              type="button"
              onClick={() => setCalcMode('dry_cleaning')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                calcMode === 'dry_cleaning'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Armchair className="w-4 h-4 text-amber-400" />
              <span>Тільки хімчистка меблів</span>
            </button>

            <button
              type="button"
              onClick={() => setCalcMode('complex')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                calcMode === 'complex'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Комплекс (Прибирання + Хімчистка)</span>
            </button>
          </div>
        </div>

        {/* 2-колонковий макет */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0 box-border">
          
          {/* Ліва частина: Панель налаштування */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            
            {/* БЛОК 1: Прибирання за площею (Відображається ТІЛЬКИ у режимах 'cleaning' або 'complex') */}
            {isAreaActive && (
              <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 min-w-0 box-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">1</span>
                    <span>Оберіть тип прибирання за площею (м²):</span>
                  </h3>
                  <span className="text-xs font-semibold text-cyan-300 bg-blue-500/15 px-2.5 py-1 rounded-md border border-blue-500/30">
                    Чесні тарифи
                  </span>
                </div>

                {/* Вибір типу приміщення */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 min-w-0">
                  {areaTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedAreaType(type.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        selectedAreaType === type.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40'
                          : 'bg-slate-850 hover:bg-slate-800 border-slate-750 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold leading-snug">
                        {type.name}
                      </span>
                      <span className={`text-xs font-black mt-1.5 font-heading ${
                        selectedAreaType === type.id ? 'text-amber-300' : 'text-cyan-400'
                      }`}>
                        {type.rate > 0 ? `${type.rate} ${type.unit}` : type.unit}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Повзунок площі */}
                {currentAreaTypeObj.rate > 0 && (
                  <div className="pt-4 border-t border-slate-800 space-y-3 min-w-0">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                      <span>Площа приміщення:</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="5"
                          max="1000"
                          value={areaSquareMeters}
                          onChange={(e) => setAreaSquareMeters(Math.max(1, Number(e.target.value)))}
                          className="w-20 px-2 py-1 text-center font-black text-cyan-400 bg-slate-950 rounded-lg border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span>м²</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="1"
                      value={areaSquareMeters}
                      onChange={(e) => setAreaSquareMeters(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-400 font-semibold pt-1">
                      <button
                        type="button"
                        onClick={() => setAreaSquareMeters(15)}
                        className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          areaSquareMeters === 15 ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
                        }`}
                      >
                        15 м² (Студія)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAreaSquareMeters(40)}
                        className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          areaSquareMeters === 40 ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
                        }`}
                      >
                        40 м² (1-кімн.)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAreaSquareMeters(65)}
                        className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          areaSquareMeters === 65 ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
                        }`}
                      >
                        65 м² (2-кімн.)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAreaSquareMeters(90)}
                        className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          areaSquareMeters === 90 ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
                        }`}
                      >
                        90 м² (3-кімн.)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* БЛОК 2: Додаткові послуги прибирання */}
            {isHouseholdActive && (
              <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 min-w-0 box-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">2</span>
                    <span>Додаткові послуги (техніка, шви, посуд, вікна):</span>
                  </h3>
                  <span className="text-xs text-slate-400">Опціонально</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 min-w-0">
                  {HOUSEHOLD_ADDITIONAL_SERVICES.map((item) => {
                    const count = householdItems[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border transition flex items-center justify-between gap-2 min-w-0 ${
                          count > 0
                            ? 'bg-blue-950/60 border-cyan-400/80 shadow-md shadow-blue-950/50'
                            : 'bg-slate-850 border-slate-750 hover:border-slate-700'
                        }`}
                      >
                        <div className="min-w-0 pr-1">
                          <span className="text-xs font-bold text-slate-200 block truncate">
                            {item.title}
                          </span>
                          <span className="text-xs font-black text-amber-300 font-heading">
                            +{item.price} {item.unit}
                          </span>
                        </div>

                        {/* Лічильник (підтримує прямий ввід м² для миття вікон) */}
                        {item.unit.includes('м²') ? (
                          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 shadow-2xs shrink-0">
                            <button
                              type="button"
                              onClick={() => updateHouseholdCount(item.id, -1)}
                              disabled={count === 0}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm cursor-pointer"
                              title="Зменшити"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="0"
                              max="5000"
                              value={count}
                              onChange={(e) => setHouseholdItemDirect(item.id, Math.max(0, Number(e.target.value)))}
                              className="w-14 px-1 py-0.5 text-center text-xs font-black text-cyan-400 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            />
                            <span className="text-[10px] text-slate-400 font-bold">м²</span>
                            <button
                              type="button"
                              onClick={() => updateHouseholdCount(item.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-cyan-400 hover:text-white hover:bg-blue-600 font-bold text-sm cursor-pointer"
                              title="Збільшити"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 shadow-2xs shrink-0">
                            <button
                              type="button"
                              onClick={() => updateHouseholdCount(item.id, -1)}
                              disabled={count === 0}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm cursor-pointer"
                            >
                              −
                            </button>
                            <span className="w-5 text-center text-xs font-black text-white">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateHouseholdCount(item.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-cyan-400 hover:text-white hover:bg-blue-600 font-bold text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* БЛОК 3: Хімчистка меблів та текстилю */}
            {isDryCleaningActive && (
              <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 min-w-0 box-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">
                      {calcMode === 'dry_cleaning' ? '1' : '3'}
                    </span>
                    <span>Хімчистка меблів, матраців та килимів:</span>
                  </h3>
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/15 px-2.5 py-1 rounded-md border border-amber-500/30">
                    Kärcher + Chemspec
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 min-w-0">
                  {DRY_CLEANING_SERVICES.map((item) => {
                    const count = dryCleaningCounts[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border transition flex items-center justify-between gap-2 min-w-0 ${
                          count > 0
                            ? 'bg-blue-950/60 border-cyan-400/80 shadow-md shadow-blue-950/50'
                            : 'bg-slate-850 border-slate-750 hover:border-slate-700'
                        }`}
                      >
                        <div className="min-w-0 pr-1">
                          <span className="text-xs font-bold text-slate-200 block truncate">
                            {item.title}
                          </span>
                          <span className="text-xs font-black text-amber-300 font-heading">
                            {item.price} {item.unit}
                          </span>
                        </div>

                        {/* Лічильник */}
                        <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 shadow-2xs shrink-0">
                          <button
                            type="button"
                            onClick={() => updateDryCleaningCount(item.id, -1)}
                            disabled={count === 0}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-xs font-black text-white">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDryCleaningCount(item.id, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-cyan-400 hover:text-white hover:bg-blue-600 font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Права частина: Фіксована плашка підсумку */}
          <div className="lg:col-span-4 sticky top-24 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-5 sm:p-7 rounded-2xl shadow-2xl border border-slate-800 space-y-6 min-w-0 box-border">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {calcMode === 'cleaning' && '🧹 Тільки прибирання'}
                  {calcMode === 'dry_cleaning' && '🛋️ Тільки хімчистка'}
                  {calcMode === 'complex' && '✨ Комплексний розрахунок'}
                </span>
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Скинути допи</span>
                </button>
              </div>

              <h3 className="text-xl font-black text-white font-heading">
                Вартість замовлення
              </h3>
            </div>

            {/* Рядки розрахунку */}
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Рядок прибирання (тільки якщо активне) */}
              {isAreaActive && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>
                    {currentAreaTypeObj.name} ({areaSquareMeters} м²):
                  </span>
                  <span className="font-bold text-white font-mono">
                    {areaCost > 0 ? `${areaCost.toLocaleString()} грн` : 'індивідуально'}
                  </span>
                </div>
              )}

              {/* Рядок побутових допів (тільки якщо обрано) */}
              {isHouseholdActive && householdCost > 0 && (
                <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Додаткові послуги:</span>
                    <span className="font-bold text-white font-mono">
                      +{householdCost.toLocaleString()} грн
                    </span>
                  </div>
                  {/* Окремий виділений рядок для Миття вікон (тільки якщо користувач обрав > 0) */}
                  {winRepairQty > 0 && (
                    <div className="flex items-center justify-between text-xs text-cyan-300 bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/30">
                      <span>Миття вікон після ремонту / будівництва (110 грн × {winRepairQty} м²):</span>
                      <span className="font-extrabold font-mono text-amber-300">
                        {(winRepairQty * 110).toLocaleString()} грн
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Офіційний структурований кошторис Clean UA (тільки якщо користувач обрав миття вікон) */}
              {winRepairQty > 0 && (
                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-cyan-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between text-cyan-300 font-extrabold font-heading">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Офіційний кошторис Clean UA</span>
                    </span>
                    <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 font-mono">№ 165-CLN</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-200 divide-y divide-slate-800/80">
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Тип послуги:</span>
                      <strong className="text-white text-right font-medium">Миття вікон після ремонту / будівництва</strong>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Ціна миття вікон:</span>
                      <strong className="text-cyan-400 font-bold font-mono">110 грн / м²</strong>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Обсяг робіт (вікна):</span>
                      <strong className="text-white font-mono">{winRepairQty} м²</strong>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-amber-300">
                      <span>Підсумкова вартість вікон:</span>
                      <span className="font-mono">{(winRepairQty * 110).toLocaleString()} грн</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Рядок хімчистки (тільки якщо активна та обрана) */}
              {isDryCleaningActive && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>Хімчистка меблів:</span>
                  <span className="font-bold text-white font-mono">
                    {dryCleaningCost > 0 ? `+${dryCleaningCost.toLocaleString()} грн` : '0 грн'}
                  </span>
                </div>
              )}

              {/* Гнучка знижка */}
              {subTotal > 0 && discountPercent > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-bold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/25">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{discountLabel}:</span>
                  </span>
                  <span className="font-black font-mono">
                    -{discountAmount.toLocaleString()} грн
                  </span>
                </div>
              )}
            </div>

            {/* Загальна сума */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Разом до сплати:</div>
              <div className="text-3xl sm:text-4xl font-black text-white font-heading flex items-baseline gap-2">
                <span>{finalTotal > 0 ? finalTotal.toLocaleString() : 0}</span>
                <span className="text-lg text-amber-300 font-bold">грн</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Оплата після виконання робіт готівкою або карткою.
              </p>
            </div>

            {/* Кнопка замовлення */}
            <button
              onClick={handleCheckout}
              disabled={finalTotal === 0}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-98 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none font-heading"
            >
              <span>Замовити за цією ціною</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Без передоплати та прихованих платежів</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% матеріальна відповідальність за майно</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveCalculator;
