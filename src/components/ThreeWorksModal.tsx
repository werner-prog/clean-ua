import React, { useState, useEffect } from 'react';
import { THREE_WORKS_GALLERY, ThreeWorksService } from '../data/servicesData';
import { X, Sparkles, Clock, CheckCircle2, ChevronRight, ChevronLeft, Maximize2, Loader2, ImageOff, ExternalLink } from 'lucide-react';

const IBB_MAP: Record<string, string> = {
  'https://ibb.co/VpmMW0Xk': 'https://i.ibb.co/FqV8bkGd/IMG-4954.jpg',
  'https://ibb.co/TDS7rcPf': 'https://i.ibb.co/7x5Zbvrf/IMG-4953.jpg',
  'https://ibb.co/VcQFH346': 'https://i.ibb.co/rRcBbvr9/image.jpg',
  'https://ibb.co/0y6JhBtD': 'https://i.ibb.co/yFZsWhSf/IMG-4959.jpg',
  'https://ibb.co/WWYHSc1j': 'https://i.ibb.co/N6HFwLzb/IMG-4976.jpg',
  'https://ibb.co/7x9xMTZW': 'https://i.ibb.co/qLZLq4cs/IMG-4977.jpg',
  'https://ibb.co/QVtHgVw': 'https://i.ibb.co/GDNM6DS/IMG-4981.jpg',
  'https://ibb.co/vCgrhxWx': 'https://i.ibb.co/7x8TQJDJ/IMG-4978.jpg',
  'https://ibb.co/h19tZ045': 'https://i.ibb.co/Wp5YPCM9/IMG-4989.jpg',
  'https://ibb.co/xSpP0RXj': 'https://i.ibb.co/FbSNMjmw/IMG-4984.jpg',
  'https://ibb.co/YBLrs3GR': 'https://i.ibb.co/b5Kf9PnW/IMG-4986.jpg',
  'https://ibb.co/mCqqmWky': 'https://i.ibb.co/ynyyDjtk/IMG-4988.jpg',
  'https://ibb.co/HDfr2Vzj': 'https://i.ibb.co/Kjp9GXqJ/image.jpg',
  'https://ibb.co/WWM7ddR9': 'https://i.ibb.co/Y71JKKV9/IMG-4990.jpg',
  'https://ibb.co/spcdnr67': 'https://i.ibb.co/HLRf6QxZ/IMG-4997.jpg',
  'https://ibb.co/rR2Wbrqj': 'https://i.ibb.co/4nRQsrCq/IMG-4996.jpg',
  'https://ibb.co/rGN4JL59': 'https://i.ibb.co/3yQBH8SK/IMG-4998.jpg',
  'https://ibb.co/pjrTqttv': 'https://i.ibb.co/gZF8Y55M/496136-D1-E23-B-44-D7-9292-144922-AE6664.png',
  'https://ibb.co/5gm6wS9n': 'https://i.ibb.co/FL2KCyW0/4-F9-E12-DC-13-CE-4917-AD1-F-C04-DA34-B7-D5-F.png',
  'https://ibb.co/NgZqyz55': 'https://i.ibb.co/6cgSW5zz/A2-EE2-DAF-4-ADB-404-C-9996-D6925706-BEA0.png',
  'https://ibb.co/yc5SmbH0': 'https://i.ibb.co/1tK6YwFZ/A46303-B1-0908-4-DB7-9036-5751-BD72-A786.png',
  'https://ibb.co/qLnmbn5L': 'https://i.ibb.co/vCBL2BYC/4-AA787-D8-B1-ED-4339-8692-F3-F05-FB3-E355.png',
  'https://ibb.co/WpqjKC91': 'https://i.ibb.co/NnQbYRhz/6-DF447-A4-4-DBF-4294-8-F8-F-0-BE6-D0-D02-B84.png',
  'https://ibb.co/gLZyG8Hb': 'https://i.ibb.co/YFB26SY4/23-E0119-F-9-FD5-41-CC-A8-FE-A84-B9-F2-F4605.png',
  'https://ibb.co/Wb7NtPH': 'https://i.ibb.co/cGRKLCy/F3528-E63-2-E4-F-4-CDF-8057-4-F1-A5-B47-E793.png',
  'https://ibb.co/CXHVz34': 'https://i.ibb.co/TngPkxJ/97299640-921-A-4391-8-DBF-F32-E57-D7-E10-A.png',
  'https://ibb.co/4RG7Y61H': 'https://i.ibb.co/0yScFgsx/C6-E0-AEF8-9992-419-C-ACF4-9273-FB216-D82.png',
  'https://ibb.co/qF10LcKL': 'https://i.ibb.co/tPCZwvgw/D72-F27-A2-EDC3-4-E83-A1-A9-4-D19-FCC6023-D.png',
  'https://ibb.co/prB07z7q': 'https://i.ibb.co/Tqxvf8fy/E40771-B5-C2-A1-44-EF-AB3-C-F15400-B949-AA.png'
};

function resolveDirectWorkImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (IBB_MAP[trimmed]) return IBB_MAP[trimmed];
  const withoutWww = trimmed.replace('://www.ibb.co/', '://ibb.co/');
  if (IBB_MAP[withoutWww]) return IBB_MAP[withoutWww];
  return trimmed;
}

interface ThreeWorksModalProps {
  serviceKey: string | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ThreeWorksModal: React.FC<ThreeWorksModalProps> = ({
  serviceKey,
  onClose,
  onBookService
}) => {
  if (!serviceKey) return null;

  const galleryData: ThreeWorksService | undefined = THREE_WORKS_GALLERY[serviceKey];
  const [activeWorkIdx, setActiveWorkIdx] = useState(0);
  const [selectedSubPhotoIdx, setSelectedSubPhotoIdx] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [hasImgError, setHasImgError] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setSelectedSubPhotoIdx(0);
    setIsImgLoading(true);
    setHasImgError(false);
  }, [serviceKey, activeWorkIdx]);

  useEffect(() => {
    setIsImgLoading(true);
    setHasImgError(false);
  }, [selectedSubPhotoIdx]);

  if (!galleryData) return null;

  const currentWork = galleryData.works[activeWorkIdx] || galleryData.works[0];
  const workImages = (currentWork.images && currentWork.images.length > 0)
    ? currentWork.images
    : [currentWork.image];
  const currentSelectedImage = workImages[selectedSubPhotoIdx] || currentWork.image;
  const directImageUrl = resolveDirectWorkImageUrl(currentSelectedImage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-6 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs font-heading">
              2Р
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">
                {galleryData.serviceTitle}
              </h3>
              <p className="text-xs text-blue-300 font-semibold">
                Тариф: {galleryData.badge} • Фотозвіт (2 виконані роботи)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Work Switcher Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 shrink-0 overflow-x-auto">
          {galleryData.works.map((work, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkIdx(idx)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                activeWorkIdx === idx
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                activeWorkIdx === idx ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
              }`}>
                {idx + 1}
              </span>
              <span>{work.title || `Робота ${idx + 1}`}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-7 overflow-y-auto space-y-6">
          {/* Service Full Overview Block if available */}
          {galleryData.description && (
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-blue-900 font-heading mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Опис виконаного замовлення:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {galleryData.description}
                </p>
              </div>

              {galleryData.whatIsIncluded && galleryData.whatIsIncluded.length > 0 && (
                <div className="pt-2 border-t border-blue-200/60">
                  <h4 className="text-xs sm:text-sm font-extrabold text-blue-900 font-heading mb-2.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Що входить у послугу?</span>
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {galleryData.whatIsIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-blue-100">
                        <span className="text-blue-600 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {galleryData.featuresList && galleryData.featuresList.length > 0 && (
                <div className="pt-2 border-t border-blue-200/60">
                  <h4 className="text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
                    ОСОБЛИВОСТІ ВИКОНАННЯ:
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-2.5 text-xs">
                    {galleryData.featuresList.map((feat, fIdx) => (
                      <div key={fIdx} className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center gap-2 font-medium text-slate-800 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Main Visual Photo for this work - Increased by 40% */}
          <div className="relative w-full h-[450px] sm:h-[620px] md:h-[660px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
            {/* Loading placeholder */}
            {isImgLoading && !hasImgError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-3 z-10 animate-pulse">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-xs font-medium">Завантаження реального фото...</span>
              </div>
            )}

            {/* Error fallback */}
            {hasImgError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center gap-3">
                <ImageOff className="w-10 h-10 text-slate-500" />
                <p className="text-sm font-semibold text-slate-300">
                  Фото завантажується або тимчасово недоступне у вашому браузері
                </p>
                {directImageUrl && (
                  <a
                    href={directImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow"
                  >
                    <span>Відкрити фото напряму</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <img
                key={directImageUrl}
                src={directImageUrl}
                alt={currentWork.title}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                loading="eager"
                onLoad={() => setIsImgLoading(false)}
                onError={() => {
                  setIsImgLoading(false);
                  setHasImgError(true);
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isImgLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            
            {/* Top badges: «Робота 1/2» + Перемикач фото + «ПІСЛЯ» + «Clean UA» + Розгортання */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
              <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-white text-xs font-extrabold font-heading shadow-md">
                {currentWork.title}
              </div>

              {workImages.length > 1 && (
                <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-lg border border-white/20 shadow-md">
                  {workImages.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setSelectedSubPhotoIdx(pIdx)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                        selectedSubPhotoIdx === pIdx
                          ? 'bg-blue-600 text-white shadow-xs ring-1 ring-cyan-400'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      Фото {pIdx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <div className="bg-emerald-600/95 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md pointer-events-none flex items-center gap-1.5 border border-emerald-400/30">
                <span>ПІСЛЯ</span>
                <span className="text-emerald-200">•</span>
                <span>Clean UA</span>
              </div>
              {directImageUrl && !hasImgError && (
                <button
                  type="button"
                  onClick={() => setIsFullScreen(true)}
                  className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-blue-600 text-white transition backdrop-blur-md border border-white/20 shadow-md cursor-pointer"
                  title="Відкрити фото на весь екран"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bottom metadata - Reduced by 50% so it doesn't obstruct the photo */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white flex flex-wrap items-center justify-between gap-2 text-[10px] pointer-events-none">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Час: <strong className="text-white font-semibold">{currentWork.time}</strong></span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="truncate max-w-[280px] sm:max-w-none text-slate-200">
                Об'єм: <strong className="text-white font-semibold">{currentWork.area}</strong>
              </span>
            </div>
          </div>

          {/* Fullscreen lightroom view */}
          {isFullScreen && (
            <div 
              className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4"
              onClick={() => setIsFullScreen(false)}
            >
              <button
                onClick={() => setIsFullScreen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={directImageUrl}
                alt={currentWork.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-3 text-center text-xs text-slate-400">
                {currentWork.title} • {currentWork.area}
              </div>
            </div>
          )}

          {/* Description and checklist */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-slate-900 font-heading">
              Опис виконаного замовлення:
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {currentWork.desc}
            </p>

            {currentWork.features && currentWork.features.length > 0 && (
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Особливості виконання:
                </h5>
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {currentWork.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveWorkIdx(prev => (prev > 0 ? prev - 1 : galleryData.works.length - 1))}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
              title="Попередня робота"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-600">
              {activeWorkIdx + 1} з {galleryData.works.length}
            </span>
            <button
              onClick={() => setActiveWorkIdx(prev => (prev < galleryData.works.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
              title="Наступна робота"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              Закрити
            </button>

            <button
              onClick={() => {
                onClose();
                onBookService(galleryData.serviceTitle);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/25 transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Замовити таке прибирання</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
