/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGridSection } from './components/ServicesGridSection';
import { PopularPricesSection } from './components/PopularPricesSection';
import { BeforeAfterSliderSection } from './components/BeforeAfterSliderSection';
import { FeelCleanlinessSection } from './components/FeelCleanlinessSection';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { StandardsSection } from './components/StandardsSection';
import { ReviewsAndFaqSection } from './components/ReviewsAndFaqSection';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { Footer } from './components/Footer';
import { ThreeWorksModal } from './components/ThreeWorksModal';
import { BookingModal } from './components/BookingModal';
import { DryCleaningSection } from './components/DryCleaningSection';
import { LeftQuickSliderNav } from './components/LeftQuickSliderNav';
import { FloatingAssistantWidget } from './components/FloatingAssistantWidget';
import { CITIES_UA } from './data/servicesData';
import { Phone, Calendar, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string>('lviv');
  const [threeWorksServiceKey, setThreeWorksServiceKey] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceName, setBookingServiceName] = useState<string>('Хімчистка меблів Clean UA');
  const [calculatorEstimate, setCalculatorEstimate] = useState<{
    total: number;
    summary: string[];
  } | null>(null);

  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.defaultMuted = true;
      bgVideoRef.current.muted = true;
      bgVideoRef.current.play().catch(() => {});
    }
  }, []);

  const currentCity = CITIES_UA.find(c => c.id === selectedCity) || CITIES_UA[0];

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setBookingServiceName(serviceName);
    } else {
      setBookingServiceName('Професійний клінінг Clean UA');
    }
    setIsBookingOpen(true);
  };

  const handleOrderWithEstimate = (details: { total: number; summary: string[] }) => {
    setCalculatorEstimate(details);
    setBookingServiceName('Комплексне прибирання за калькулятором');
    setIsBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14]/70 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Fixed Background Video (Muted, Loop, Transparent Layer) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={bgVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-95 contrast-105"
        >
          <source src="/kling_20261015_VIDEO_6036.0.mp4" type="video/mp4" />
          <source src="/kling_20261015_VIDEO____________6036_0.mp4" type="video/mp4" />
          <source src="/kling_20261015_VIDEO_6036_0.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/ryhd9jhk/video/upload/v1792083805/kling_20261015_VIDEO____________6036_0.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#070b14]/50 backdrop-blur-[2px]" />
      </div>

      {/* Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Left Quick Slider Navigation */}
      <LeftQuickSliderNav />

      {/* Main Content with exact alternating background flow from reference */}
      <main className="flex-1">
        {/* 1. Hero: Deep dark night-navy */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          cityName={currentCity.name}
        />

        {/* 2. Services: Crisp clean white */}
        <ServicesGridSection
          onOpenBooking={handleOpenBooking}
          onOpenThreeWorks={(key) => setThreeWorksServiceKey(key)}
        />

        {/* 2.5 Standalone Dry Cleaning Block */}
        <DryCleaningSection
          onOpenBooking={handleOpenBooking}
          onOpenThreeWorks={(key) => setThreeWorksServiceKey(key)}
        />

        {/* 3. Popular Prices: Deep dark navy with blue glow */}
        <PopularPricesSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. Before/After 10 Works & Bonus Program */}
        <BeforeAfterSliderSection
          onBookService={handleOpenBooking}
          onOpenThreeWorks={(key) => setThreeWorksServiceKey(key)}
        />

        {/* 5. "Чистота, яку ви відчуваєте": Pure white */}
        <FeelCleanlinessSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Interactive Cost Calculator: Light slate */}
        <InteractiveCalculator
          onOrderWithEstimate={handleOrderWithEstimate}
        />

        {/* 7. Technology & Standards: Deep dark navy */}
        <StandardsSection />

        {/* 8. Reviews and FAQ: Pure white */}
        <ReviewsAndFaqSection
          onOpenBooking={() => handleOpenBooking()}
          phone={currentCity.phone}
        />

        {/* 9. Mobile App download banner: Electric blue / navy */}
        <AppDownloadBanner
          onOpenBooking={() => handleOpenBooking('Замовлення через додаток Clean UA')}
        />
      </main>

      {/* 10. Footer: Deep dark midnight */}
      <Footer
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* 3 Works Modal */}
      <ThreeWorksModal
        serviceKey={threeWorksServiceKey}
        onClose={() => setThreeWorksServiceKey(null)}
        onBookService={(name) => handleOpenBooking(name)}
      />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setCalculatorEstimate(null);
        }}
        initialService={bookingServiceName}
        initialCity={selectedCity}
        calculatorEstimate={calculatorEstimate}
      />

      {/* Floating Left Assistant / Consultant Widget (Viber, Telegram, WhatsApp) */}
      <FloatingAssistantWidget
        onOpenBooking={() => handleOpenBooking('Консультація чергового менеджера Clean UA')}
        phone={currentCity.phone}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          title="Вгору"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <a
          href={`tel:${currentCity.phone.replace(/[^0-9+]/g, '')}`}
          className="sm:hidden w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center transition active:scale-95 animate-pulse ring-4 ring-emerald-400/70"
          title="Зателефонувати"
        >
          <Phone className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs shadow-xl shadow-blue-600/30 transition cursor-pointer active:scale-95 font-heading"
        >
          <Calendar className="w-4 h-4" />
          <span>Швидкий виклик Clean UA</span>
        </button>
      </div>
    </div>
  );
}
