import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  House,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Tag,
  Waves,
  WashingMachine,
  X,
} from "lucide-react";

const managerPhoto = "https://images.pexels.com/photos/9462192/pexels-photo-9462192.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const apartmentPhoto = "https://images.pexels.com/photos/7533848/pexels-photo-7533848.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const apartmentPhotoAlt = "https://images.pexels.com/photos/7167073/pexels-photo-7167073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const cityWindowPhoto = "https://images.pexels.com/photos/39589737/pexels-photo-39589737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const sofaPhoto = "https://images.pexels.com/photos/4401535/pexels-photo-4401535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const windowPricePhoto = "https://res.cloudinary.com/ryhd9jhk/image/upload/f_auto/q_auto/dcc2d857999a74e4f6d0e41d85713c85.jpg";

const portfolioCategories = {
  repair: {
    label: "Після ремонту",
    title: "Повертаємо простору чистоту після ремонту",
    description: "Прибираємо будівельний пил, сліди фарби та все, що залишилося після оновлення вашого дому.",
    image: apartmentPhoto,
    before: "Будівельний пил та плями",
    after: "Чистий простір для життя",
  },
  windows: {
    label: "Миття вікон після ремонту",
    title: "Вікна, крізь які хочеться дивитися",
    description: "Очищуємо скло, рами, підвіконня та складні зони після ремонту без розводів.",
    image: cityWindowPhoto,
    before: "Сліди ремонту на вікнах",
    after: "Прозоре скло та краєвид",
  },
  upholstery: {
    label: "Хімчистка матраца / дивана",
    title: "Оновлюємо меблі та текстиль",
    description: "Делікатно видаляємо плями, запахи й забруднення з матраців, диванів та крісел.",
    image: sofaPhoto,
    before: "Плями та сліди щоденного використання",
    after: "Свіжа та чиста оббивка",
  },
};

type PortfolioKey = keyof typeof portfolioCategories;
type ServiceMode = "cleaning" | "upholstery" | "complex";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioKey>("repair");
  const [serviceMode, setServiceMode] = useState<ServiceMode>("cleaning");
  const [area, setArea] = useState(60);
  const [managerOpen, setManagerOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);

  const total = useMemo(() => {
    const base = serviceMode === "cleaning" ? 45 : serviceMode === "upholstery" ? 380 : 45 + 380;
    const calculated = serviceMode === "upholstery" ? base : base * area;
    return serviceMode === "complex" ? Math.round(calculated * 0.85) : calculated;
  }, [area, serviceMode]);

  const selectedPortfolio = portfolioCategories[portfolio];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Cleanua на головну">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>clean<span>ua</span></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Послуги</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Наші роботи</a>
          <a href="#prices" onClick={() => setMenuOpen(false)}>Ціни</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Як це працює</a>
        </nav>
        <div className="topbar-actions">
          <a className="phone-link" href="tel:+380685155154"><Phone size={16} /> 068 515 51 54</a>
          <a className="button button-dark button-small" href="#calculator">Замовити <ArrowRight size={15} /></a>
        </div>
        <button className="menu-button" aria-label="Відкрити меню" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Професійний клінінг в Україні</p>
            <h1>Чистота, яку<br /><em>відчуваєш.</em></h1>
            <p className="hero-lead">Прибираємо квартири, будинки та офіси так, щоб ви поверталися не просто в чистий простір, а в місце для життя.</p>
            <div className="hero-actions">
              <a className="button button-orange" href="#calculator">Розрахувати вартість <ArrowRight size={17} /></a>
              <a className="text-link" href="#portfolio">Подивитися роботи <ArrowDown size={16} /></a>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>А</span><span>М</span><span>О</span><span>+</span></div><div><strong>Понад 55 000</strong><small>задоволених клієнтів в Україні</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src={apartmentPhoto} alt="Світла чиста квартира" /><div className="image-badge"><Star size={15} fill="currentColor" /><span><strong>4.9/5</strong><small>середня оцінка</small></span></div></div>
            <div className="floating-note"><CircleCheck size={18} /><span><strong>Безпечно для дітей</strong><small>Еко-засоби та турбота</small></span></div>
            <div className="hero-circle" />
          </div>
        </section>

        <section className="service-strip">
          <div><span className="strip-icon"><House size={20} /></span><span><strong>Квартири та будинки</strong><small>Регулярне та генеральне</small></span></div>
          <div><span className="strip-icon"><Waves size={20} /></span><span><strong>Хімчистка меблів</strong><small>Дивани, матраци, килими</small></span></div>
          <div><span className="strip-icon"><Sparkles size={20} /></span><span><strong>Миття вікон</strong><small>До блиску, без розводів</small></span></div>
          <div className="strip-promo"><Tag size={19} /><span><strong>Комплексне прибирання</strong><small>Знижка 15% на комбо</small></span></div>
        </section>

        <section className="section-pad services" id="services">
          <div className="section-heading"><div><p className="eyebrow">Наші послуги</p><h2>Все, що потрібно<br /><em>для чистоти.</em></h2></div><p>Від регулярного прибирання до складної хімчистки — одна команда для всього дому.</p></div>
          <div className="service-grid">
            <article className="service-card service-card-large"><img src={apartmentPhotoAlt} alt="Сучасна квартира після прибирання" /><div className="service-overlay"><span className="card-number">01</span><h3>Квартира<br />та будинки</h3><p>Підтримуюче, генеральне<br />та прибирання після ремонту</p><ArrowRight size={23} /></div></article>
            <article className="service-card"><img src={windowPricePhoto} alt="Професійне миття вікон" /><div className="service-overlay"><span className="card-number">02</span><h3>Миття<br />вікон</h3><p>Вікна, балкони<br />та фасадне скління</p><ArrowRight size={23} /></div></article>
            <article className="service-card"><img src={sofaPhoto} alt="Хімчистка дивана" /><div className="service-overlay"><span className="card-number">03</span><h3>Хімчистка<br />меблів</h3><p>Дивани, матраци,<br />крісла та килими</p><ArrowRight size={23} /></div></article>
          </div>
        </section>

        <section className="calculator-section section-pad" id="calculator">
          <div className="calculator-intro"><p className="eyebrow">Онлайн-калькулятор</p><h2>Порахуйте свою<br /><em>чистоту.</em></h2><p>Оберіть бажану послугу: прибирання або хімчистку окремо (вони не змішуються), або замовте комплекс зі знижкою 15%!</p><div className="choose-hint"><span>Виберіть послугу</span><ArrowDown size={24} /></div></div>
          <div className="calculator-card">
            <div className="mode-tabs"><button className={serviceMode === "cleaning" ? "active" : ""} onClick={() => setServiceMode("cleaning")}><House size={17} />Тільки прибирання <small>(м²)</small></button><button className={serviceMode === "upholstery" ? "active" : ""} onClick={() => setServiceMode("upholstery")}><WashingMachine size={17} />Тільки хімчистка меблів</button><button className={serviceMode === "complex" ? "active" : ""} onClick={() => setServiceMode("complex")}><Sparkles size={17} />Комплекс <small>(-15%)</small></button></div>
            {serviceMode !== "upholstery" ? <div className="area-control"><div className="control-label"><span>Площа приміщення</span><strong>{area} м²</strong></div><input aria-label="Площа приміщення" type="range" min="20" max="300" step="5" value={area} onChange={(event) => setArea(Number(event.target.value))} /><div className="range-labels"><span>20 м²</span><span>300 м²</span></div></div> : <div className="upholstery-choice"><span className="choice-icon"><BedDouble size={20} /></span><div><strong>Хімчистка дивана або матраца</strong><small>Остаточна ціна залежить від розміру та матеріалу</small></div><span className="choice-price">від 380 грн</span></div>}
            <div className="calculator-result"><span>Орієнтовна вартість</span><strong>{total.toLocaleString("uk-UA")} <small>грн</small></strong><a className="button button-orange" href="tel:+380685155154">Замовити розрахунок <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="section-pad prices" id="prices"><div className="section-heading"><div><p className="eyebrow">Прозорі ціни</p><h2>Актуальні <em>ціни.</em></h2></div><p>Фінальну вартість підтверджуємо після короткої консультації. Жодних прихованих доплат.</p></div><div className="price-grid"><PriceCard icon={<House />} title="Прибирання квартир" price="від 45" unit="грн / м²" items={["Підтримуюче прибирання", "Генеральне прибирання", "Після ремонту"]} /><PriceCard icon={<Sparkles />} title="Хімчистка меблів" price="від 380" unit="грн / предмет" items={["Диван або матрац", "Крісло", "Килим"]} featured /><PriceCard icon={<WashingMachine />} title="Миття вікон" price="від 165" unit="грн / м²" items={["Сезонне миття вікон", "Миття вікон після ремонту — 200 грн/м²", "Рами та підвіконня"]} /></div></section>

        <section className="section-pad portfolio" id="portfolio"><div className="section-heading"><div><p className="eyebrow">Наші роботи</p><h2>Результат, який<br /><em>говорить сам.</em></h2></div><p>Кожен простір має свою історію. Ми допомагаємо почати її з чистого аркуша.</p></div><div className="portfolio-tabs">{(Object.keys(portfolioCategories) as PortfolioKey[]).map((key) => <button key={key} className={portfolio === key ? "active" : ""} onClick={() => setPortfolio(key)}>{portfolioCategories[key].label}</button>)}</div><div className="portfolio-showcase"><div className="portfolio-copy"><span className="portfolio-index">0{(Object.keys(portfolioCategories) as PortfolioKey[]).indexOf(portfolio) + 1} / 03</span><h3>{selectedPortfolio.title}</h3><p>{selectedPortfolio.description}</p><div className="before-after"><span><i className="dot dot-before" />{selectedPortfolio.before}</span><span><i className="dot dot-after" />{selectedPortfolio.after}</span></div><div className="portfolio-arrows"><button aria-label="Попередня робота" onClick={() => setPortfolio(portfolio === "repair" ? "upholstery" : portfolio === "windows" ? "repair" : "windows")}><ChevronLeft size={18} /></button><button aria-label="Наступна робота" onClick={() => setPortfolio(portfolio === "repair" ? "windows" : portfolio === "windows" ? "upholstery" : "repair")}><ChevronRight size={18} /></button></div></div><div className="portfolio-image"><img src={selectedPortfolio.image} alt={selectedPortfolio.label} /><span className="result-label">Результат</span></div></div></section>

        <section className="process-section section-pad" id="process"><div className="section-heading centered"><p className="eyebrow">Простий процес</p><h2>Як проходить хімчистка<br /><em>у вашому домі.</em></h2></div><div className="process-grid"><ProcessStep number="01" icon={<Phone />} title="Заявка та консультація" text="Розпитуємо про ваш запит, підбираємо послугу та погоджуємо час." /><ProcessStep number="02" icon={<Sparkles />} title="Делікатне очищення" text="Наш спеціаліст приїжджає з професійною технікою та безпечними засобами." /><ProcessStep number="03" icon={<Check />} title="Ополіскування та сушка" text="Нейтралізація кислотним кондиціонером і сушка феном за бажанням замовника" note="Сушка феном рахується як окрема послуга за окремою ціною" /></div></section>

        <section className="cta-section section-pad"><div className="cta-card"><div><p className="eyebrow">Готові до чистоти?</p><h2>Ваш дім заслуговує<br /><em>на найкраще.</em></h2><p>Залиште заявку — менеджер Ірина відповість протягом 10 хвилин.</p></div><a className="button button-light" href="tel:+380685155154">Зателефонувати <Phone size={17} /></a></div></section>
      </main>

      <footer className="footer section-pad"><div className="footer-main"><div><a className="brand" href="#top"><span className="brand-mark"><Sparkles size={17} /></span><span>clean<span>ua</span></span></a><p>Чистий простір.<br />Вільний час для вас.</p></div><div className="footer-links"><div><strong>Навігація</strong><a href="#services">Послуги</a><a href="#portfolio">Наші роботи</a><a href="#prices">Ціни</a></div><div><strong>Контакти</strong><a href="tel:+380685155154">068 515 51 54</a><a href="mailto:clenua10@gmail.com">clenua10@gmail.com</a><span>Telegram: premiym0</span><span>Viber: 068-515-515-4</span></div></div></div><div className="footer-bottom"><span>© 2024 cleanua. Всі права захищені.</span><span className="socials"><Instagram size={17} /><MessageCircle size={17} /></span></div></footer>

      {managerOpen && <div className="manager-widget"><button className="manager-close" aria-label="Закрити віконце" onClick={() => setManagerOpen(false)}><X size={13} /></button><img src={managerPhoto} alt="Ірина, менеджер cleanua" /><div className="manager-content"><span>Ваш менеджер</span><strong>Ірина</strong><p>Акція на прибирання та хімчистку <b>(-15%)</b></p><a href="tel:+380685155154">Написати менеджеру <ArrowRight size={14} /></a></div></div>}
      <button className="price-fab" onClick={() => setPriceOpen(!priceOpen)}><Tag size={18} /> <span>Знижка -15%</span></button>
      {priceOpen && <div className="price-popover"><button onClick={() => setPriceOpen(false)} aria-label="Закрити"><X size={16} /></button><strong>Комплексне прибирання</strong><span>Прибирання + хімчистка зі знижкою 15%</span><a href="#calculator" onClick={() => setPriceOpen(false)}>Розрахувати <ArrowRight size={14} /></a></div>}
    </div>
  );
}

function PriceCard({ icon, title, price, unit, items, featured = false }: { icon: React.ReactNode; title: string; price: string; unit: string; items: string[]; featured?: boolean }) {
  return <article className={featured ? "price-card featured" : "price-card"}><span className="price-icon">{icon}</span><h3>{title}</h3><div className="price-value">{price} <small>{unit}</small></div><ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><a className="card-link" href="#calculator">Детальніше <ArrowRight size={15} /></a></article>;
}

function ProcessStep({ number, icon, title, text, note }: { number: string; icon: React.ReactNode; title: string; text: string; note?: string }) {
  return <article className="process-step"><span className="step-number">{number}</span><span className="step-icon">{icon}</span><h3>{title}</h3><p>{text}</p>{note && <small>({note})</small>}</article>;
}

export default App;
