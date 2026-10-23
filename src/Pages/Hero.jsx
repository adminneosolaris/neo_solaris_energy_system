import React, { useEffect, useState, useRef, useCallback } from 'react';

// Banner Images
import banner1 from '../assets/BannerImage/Golden_Hour_Smart_Energy_Home_1920x800.webp';
import banner2 from '../assets/BannerImage/PURE_BESS_banner_1920x800.webp';
import banner3 from '../assets/BannerImage/Futuristic Smart Grid Energy Storage.webp';

const slides = [
  {
    id: 1,
    eyebrow: 'LIVE ENERGY EXPERIENCE CENTRE',
    title1: 'ENERGY',
    title2: 'EXPERIENCED LIVE',
    desc: 'From complete solar-powered energy systems to standalone battery energy storage, Neo Solaris provides solutions based on real energy requirements.',
    image: banner1,
    shatterStyle: 'cross-grid',
  },
  {
    id: 2,
    eyebrow: 'AUTHORISED BESS BRAND · PUREPOWER',
    title1: 'REPLACEMENT OF',
    title2: 'UPS & DIESEL GENERATOR',
    desc: 'A Battery Energy Storage System stores power and supplies it back the instant your grid supply drops — automatically, silently, reliably.',
    image: banner2,
    shatterStyle: 'blade-slice',
  },
  {
    id: 3,
    eyebrow: 'RELIABLE ENERGY SOLUTIONS',
    title1: 'SIZED FOR YOUR',
    title2: 'ACTUAL NEEDS',
    desc: 'From homes to industries, every Neo Solaris system is sized to your real load — not a one-size-fits-all package.',
    image: banner3,
    shatterStyle: 'column-swap',
  },
];

const imgBrightLook = 'brightness-[1.05] contrast-[1.05] saturate-[1.08]';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const coreMatrixRef = useRef(null);

  // Preload banner assets
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Slide மாறும் போது previous slide-ஐ அடியில் வைக்க update செய்கிறோம்
  const changeSlide = useCallback((nextIdx) => {
    setCurrent((prev) => {
      setPrevIndex(prev);
      return nextIdx;
    });
  }, []);

  // =========================
  // AUTO SLIDER ENGINE
  // =========================
  const initSliderEngine = useCallback(() => {
    if (coreMatrixRef.current) clearInterval(coreMatrixRef.current);
    coreMatrixRef.current = setInterval(() => {
      setCurrent((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % slides.length;
      });
    }, 7000);
  }, []);

  useEffect(() => {
    initSliderEngine();
    return () => clearInterval(coreMatrixRef.current);
  }, [initSliderEngine]);

  // =========================
  // MANUAL CONTROLS
  // =========================
  const manuallyOverride = (idx) => {
    if (idx === current) return;
    changeSlide(idx);
    initSliderEngine();
  };

  const nextSlide = () => {
    changeSlide((current + 1) % slides.length);
    initSliderEngine();
  };

  const prevSlide = () => {
    changeSlide((current - 1 + slides.length) % slides.length);
    initSliderEngine();
  };

  const slide = slides[current];

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[calc(100vh-76px)] overflow-hidden select-none">
      {/* ========================= */}
      {/* BACKGROUND SLICE SYSTEM */}
      {/* ========================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* முந்தைய இமேஜை அடியில் நிலைநிறுத்தும் Underlay Base Image (Zero Black Gaps) */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover lg:bg-[length:100%_100%] bg-center will-change-transform z-0 ${imgBrightLook}`}
          style={{ backgroundImage: `url(${slides[prevIndex].image})` }}
        />

        {slides.map((item, idx) => {
          const isActive = idx === current;

          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* 1. CROSS GRID EFFECT */}
              {item.shatterStyle === 'cross-grid' && (
                <div className="absolute inset-0 flex flex-col w-full h-full">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="relative flex-1 w-full overflow-hidden transition-transform duration-1000 ease-out"
                      style={{
                        transform: isActive
                          ? 'translateY(0%) scaleY(1)'
                          : `translateY(${i % 2 === 0 ? '-100%' : '100%'}) scaleY(0.7)`,
                        transitionDelay: `${i * 70}ms`,
                      }}
                    >
                      <div
                        className={`absolute w-full h-full bg-cover lg:bg-[length:100%_100%] bg-center will-change-transform ${imgBrightLook}`}
                        style={{
                          height: '400%',
                          top: `-${i * 100}%`,
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 2. BLADE SLICE EFFECT */}
              {item.shatterStyle === 'blade-slice' && (
                <div
                  className={`w-full h-full bg-cover lg:bg-[length:100%_100%] bg-center will-change-transform transition-all duration-1000 ease-out ${imgBrightLook}`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    clipPath: isActive
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%)',
                  }}
                />
              )}

              {/* 3. COLUMN SWAP EFFECT */}
              {item.shatterStyle === 'column-swap' && (
                <div className="absolute inset-0 flex w-full h-full">
                  {/* Left Column */}
                  <div
                    className="relative w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-out"
                    style={{
                      transform: isActive ? 'translateY(0%)' : 'translateY(-100%)',
                    }}
                  >
                    <div
                      className={`absolute w-[200%] h-full bg-cover lg:bg-[length:100%_100%] bg-center will-change-transform ${imgBrightLook}`}
                      style={{
                        backgroundImage: `url(${item.image})`,
                        left: 0,
                      }}
                    />
                  </div>

                  {/* Right Column */}
                  <div
                    className="relative w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-out"
                    style={{
                      transform: isActive ? 'translateY(0%)' : 'translateY(100%)',
                    }}
                  >
                    <div
                      className={`absolute w-[200%] h-full bg-cover lg:bg-[length:100%_100%] bg-center will-change-transform ${imgBrightLook}`}
                      style={{
                        backgroundImage: `url(${item.image})`,
                        left: '-100%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Global Subtle Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/25 md:bg-black/15" />

        {/* Text Contrast Gradient (Responsive) */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:bg-gradient-to-r lg:from-black/85 lg:via-black/45 lg:to-transparent lg:w-[62%]" />
      </div>

      {/* ========================= */}
      {/* SLIDE TEXT CONTENT */}
      {/* ========================= */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex items-end lg:items-center justify-start pb-16 lg:pb-0 w-full">
        <div key={slide.id} className="max-w-2xl text-left">
          {/* Live Centre Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#159447]/40 bg-white/95 backdrop-blur-md px-3.5 py-1 text-[11px] sm:text-xs font-bold text-[#12793B] shadow-md animate-[fadeIn_0.5s_ease-out]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#159447] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#159447]" />
            </span>
            {slide.eyebrow}
          </div>

          {/* Titles */}
          <h1 className="text-white text-3xl sm:text-5xl lg:text-[68px] font-black leading-[1.05] tracking-tight mb-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {slide.title1}
          </h1>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ADE80] via-[#22c55e] to-[#159447] text-3xl sm:text-5xl lg:text-[68px] font-black leading-[1.05] tracking-tight mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            {slide.title2}
          </h1>

          {/* Accent Divider Bar */}
          <div className="h-1 sm:h-1.5 w-20 sm:w-28 rounded-full bg-gradient-to-r from-[#F5B800] via-[#159447] to-transparent mb-3 sm:mb-4" />

          {/* Description */}
          <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed font-semibold mb-6 max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] line-clamp-3 sm:line-clamp-none">
            {slide.desc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 bg-[#159447] hover:bg-[#12793B] text-white font-bold text-xs sm:text-sm tracking-wide uppercase px-6 py-3 rounded-lg shadow-[0_8px_25px_-6px_rgba(21,148,71,0.7)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Solutions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* NAVIGATION ARROWS (Desktop only) */}
      {/* ========================= */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/35 hover:bg-[#159447] border border-white/40 hover:border-[#159447] backdrop-blur-md items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
      >
        <svg className="w-5 h-5 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/35 hover:bg-[#159447] border border-white/40 hover:border-[#159447] backdrop-blur-md items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
      >
        <svg className="w-5 h-5 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ========================= */}
      {/* BOTTOM DOT INDICATORS */}
      {/* ========================= */}
      <div className="absolute right-4 sm:right-8 lg:right-16 bottom-5 lg:bottom-8 z-30 flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => manuallyOverride(idx)}
              className="group focus:outline-none py-2 cursor-pointer bg-transparent border-none"
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute border transition-all duration-500 ease-out ${
                    current === idx
                      ? 'w-6 h-6 sm:w-7 sm:h-7 border-[#159447] scale-100 opacity-100 rotate-45'
                      : 'w-3 h-3 sm:w-4 sm:h-4 border-white/0 scale-50 opacity-0 group-hover:opacity-40 group-hover:scale-75 group-hover:border-white'
                  }`}
                />
                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ease-out ${
                    current === idx ? 'bg-[#159447] scale-125' : 'bg-white/70 group-hover:bg-white'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="text-white font-mono text-[10px] sm:text-xs tracking-widest block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="text-[#4ADE80] font-bold">0{current + 1}</span> / 0{slides.length}
        </div>
      </div>
    </div>
  );
};

export default Hero;