import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductDetailsModal from '../ProductSection/Productdetailsmodal';
import sections from '../data/products.json';

import Banner from '../assets/Other banner images/Products_Banner.webp';
import { Helmet } from 'react-helmet-async';

// ─── HERO SLIDE FROM RIGHT EDGE HELPER ──────────────────────────────────────
const SlideLine = ({ children, delay = 0, className = '' }) => (
  <motion.span
    initial={{ opacity: 0, x: '100vw' }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1],
      delay,
    }}
    className={`block will-change-transform ${className}`}
  >
    {children}
  </motion.span>
);

const heroImageUrl = Banner;

// ─── FEATURES STRIP ──────────────────────────────────────────────────────────
const features = [
  {
    title: 'Solar integration',
    desc: 'Seamless integration of solar generation with advanced energy storage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Smart energy management',
    desc: 'Intelligent monitoring and management for efficient energy usage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: 'Battery energy storage',
    desc: 'Store energy and make it available when you need reliable power.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Grid compatible',
    desc: 'Designed to work seamlessly with grid-connected energy systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Reliable backup power',
    desc: 'Dependable backup power for homes, businesses and critical applications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v6m-2-3h4"/>
      </svg>
    ),
  },
  {
    title: 'Scalable solutions',
    desc: 'Flexible energy solutions designed for changing power requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l5-5 4 4 7-7"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8h5v5"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16"/>
      </svg>
    ),
  },
];

const revealScale = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const ProductsShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
    <Helmet>
      <title>Products Showcase - Neo Solaris</title>
      <meta name="description" content="Browse high-efficiency solar panels, BESS units, and sustainable energy products." />
    </Helmet>

    <div className="w-full min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* ---------------- BRIGHT & CRISP HERO SECTION (ABOUTPAGE STYLING) ---------------- */}
      <section className="relative min-h-[85vh] sm:min-h-screen w-full flex items-center overflow-x-clip overflow-y-hidden bg-slate-950">
        <img
          src={heroImageUrl}
          alt="PuREPower by Neo Solaris"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] brightness-[1.2] contrast-[1.08] saturate-[1.12]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent md:w-[68%]" />
        <div className="absolute inset-0 bg-black/10" />

        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #F8FAFC 0%, #F8FAFC 10%, rgba(248,250,252,0.6) 40%, transparent 100%)',
          }}
        />

        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-24 sm:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl xl:text-7xl">
              <SlideLine delay={0.25}>Power that stays on,</SlideLine>
              <SlideLine
                delay={0.45}
                className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#FBBF24] bg-clip-text text-transparent"
              >
                whatever the grid does.
              </SlideLine>
            </h1>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="mt-8 block h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="relative mt-8 overflow-hidden rounded-3xl border border-white/20 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl max-w-xl"
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#F5B800] to-[#159447]" />
              <p className="pl-3 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
                Intelligent battery storage and hybrid backup solutions built for round-the-clock dependability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MODERN DYNAMIC PRODUCT CATALOG ── */}
      <div className="px-6 sm:px-12 lg:px-20 py-10 lg:py-14 space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {section.products.map((product, productIndex) => (
                <motion.div
                  key={product.id}
                  variants={revealScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: productIndex * 0.05 }}
                  tabIndex={0}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative flex flex-col cursor-pointer
                    outline-none rounded-[28px] bg-white
                    border border-slate-200/80
                    shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]
                    hover:border-emerald-400/80
                    hover:-translate-y-3
                    hover:shadow-[0_28px_70px_-18px_rgba(16,185,129,0.28)]
                    transition-all duration-500 ease-out
                    overflow-hidden
                    focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {/* Stage with Neon Glow */}
                  <div className="relative w-full h-[370px] flex items-center justify-center overflow-hidden px-6 bg-gradient-to-b from-white via-white to-slate-50">

                    {/* Soft premium glow */}
                    <div className="absolute w-56 h-56 rounded-full
                      bg-emerald-300/0 blur-3xl
                      group-hover:bg-emerald-300/25
                      group-hover:scale-125
                      transition-all duration-700">
                    </div>

                    {/* Subtle gold light */}
                    <div className="absolute bottom-10 w-40 h-1
                      rounded-full bg-amber-400/0 blur-md
                      group-hover:bg-amber-400/70
                      transition-all duration-700">
                    </div>

                    {/* Keep your existing product image here */}
                    <img
                      src={product.image}
                      alt={`${product.name} ${product.value}`}
                      className="relative z-10 h-[105%] w-auto max-w-[92%]
                        object-contain
                        drop-shadow-[0_8px_12px_rgba(15,23,42,0.08)]
                        group-hover:scale-110
                        group-hover:-translate-y-3
                        group-hover:drop-shadow-[0_24px_22px_rgba(15,23,42,0.18)]
                        transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Card Content & Specs */}
                  <div className="px-6 pb-6 pt-2 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-slate-900 text-2xl font-extrabold tracking-tight group-hover:text-emerald-700 transition-colors duration-300">
                          {product.name} <span className="font-black text-slate-950">{product.value}</span>
                        </h3>
                      </div>

                      <p className="text-slate-500 text-xs leading-snug font-normal line-clamp-1 mb-3.5">
                        {product.type}
                      </p>

                      <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-50/90 rounded-2xl border border-slate-100 mb-4">
                        {product.keySpecs?.slice(0, 4).map((spec, kIdx) => (
                          <div key={kIdx} className="flex flex-col items-center text-center py-0.5">
                            <span className="text-[12.5px] text-slate-900 font-extrabold leading-tight">{spec.value}</span>
                            <span className="text-[8.5px] uppercase font-bold text-slate-400 mt-0.5">{spec.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-bold">WARRANTY</span>
                        <span className="text-[11px] font-bold text-slate-700">
                          {product.specs?.warranty} Std · {product.specs?.extendedWarranty} Ext
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="
                          group/btn relative inline-flex items-center justify-center
                          gap-2 overflow-hidden
                          rounded-xl px-5 py-2.5
                          text-xs font-extrabold tracking-wide
                          text-white
                          bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-500
                          border border-emerald-400/40
                          shadow-[0_4px_15px_rgba(5,150,105,0.20)]
                          transition-all duration-300 ease-out
                          hover:-translate-y-0.5
                          hover:from-emerald-600 hover:via-green-500 hover:to-emerald-400
                          hover:shadow-[0_8px_25px_rgba(16,185,129,0.35)]
                          hover:border-amber-300/70
                          active:scale-95
                          focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-emerald-400
                          focus-visible:ring-offset-2 cursor-pointer
                        "
                      >
                        {/* Subtle shine effect */}
                        <span
                          className="
                            absolute inset-0 -translate-x-full
                            bg-gradient-to-r from-transparent
                            via-white/20 to-transparent
                            transition-transform duration-700
                            group-hover/btn:translate-x-full
                          "
                        />

                        <span className="relative z-10">
                          Explore
                        </span>

                        <span
                          className="
                            relative z-10 flex h-5 w-5 items-center
                            justify-center rounded-full
                            border border-white/30 bg-white/10
                            transition-all duration-300
                            group-hover/btn:border-amber-200/70
                            group-hover/btn:bg-amber-300
                            group-hover/btn:text-slate-950
                            group-hover/btn:translate-x-0.5
                          "
                        >
                          <svg
                            className="h-3 w-3 transition-transform duration-300
                              group-hover/btn:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* ── BRAND FEATURES ── */}
        <motion.div
          className="pt-10 border-t border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold tracking-widest text-emerald-800 uppercase mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            What every system shares
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
            {features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-emerald-200/80 bg-emerald-50/60 text-emerald-700 shadow-xs transition-transform group-hover:scale-105">
                  <div className="w-4 h-4">{feat.icon}</div>
                </div>
                <div>
                  <h4 className="text-[14.5px] font-semibold text-slate-900 mb-0.5">{feat.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    {selectedProduct && (
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    )}
    </>
  );
};

export default ProductsShowcase;