import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Home as HomeIcon, Store, Building2, Factory, Sun, Users, Wrench, Handshake, Package, ArrowRight } from 'lucide-react';

import { Btn, SectionHead, WRAP, ease } from './NeoUI';
import EnergyChain from './EnergyChain';
import WhatIsBESS from './WhatIsBESS';

import Banner from '../assets/Other banner images/PuREPower BESS_Banner.webp';

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

/* ======================================================================
   SCROLL REVEAL helpers
   ====================================================================== */
const fadeUp = (delay = 0, y = 20) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)', transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease } },
});

const HEAD_HIDDEN = {
  clipPath: 'inset(0% 0% 100% 0%)',
  y: 36,
  opacity: 0,
  filter: 'blur(10px)',
  transition: { duration: 0.3 },
};
const HEAD_SHOW = {
  clipPath: 'inset(-10% -5% -15% -5%)',
  y: 0,
  opacity: 1,
  filter: 'blur(0px)',
  transition: { duration: 1.05, ease },
};

const RevealHead = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  return (
    <div ref={ref}>
      <motion.div initial={HEAD_HIDDEN} animate={inView ? HEAD_SHOW : HEAD_HIDDEN}>
        {children}
      </motion.div>
    </div>
  );
};

const DoorsOpen = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const hidden = { clipPath: 'inset(0% 50% 0% 50% round 32px)', opacity: 0, transition: { duration: 0.3 } };
  const show = {
    clipPath: 'inset(-10% -6% -10% -6% round 32px)',
    opacity: 1,
    transition: { duration: 1.1, ease },
  };
  return (
    <div ref={ref} className={className}>
      <motion.div initial={hidden} animate={inView ? show : hidden}>
        {children}
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const v = fadeUp(delay, 24);
  return (
    <div ref={ref} className={className}>
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={v}>
        {children}
      </motion.div>
    </div>
  );
};

const MODES = [
  {
    id: 'without',
    label: 'BESS without solar',
    chain: ['Grid', 'PuREPower BESS', 'Essential Loads'],
    text: 'The BESS stores energy from the grid and supplies your selected loads when needed. No solar is required to consider PuREPower.',
  },
  {
    id: 'with',
    label: 'BESS + solar',
    chain: ['Solar Panels', 'PuREPower BESS', 'Grid', 'Essential Loads'],
    text: 'Solar energy is stored and used through the BESS, with the grid working alongside. Solar can also be added later wherever required.',
  },
];

const applications = [
  { icon: HomeIcon, label: 'Homes' },
  { icon: Store, label: 'Shops & offices' },
  { icon: Building2, label: 'Commercial buildings' },
  { icon: Factory, label: 'Industrial units' },
  { icon: Sun, label: 'Solar installations' },
];

const partners = [
  { icon: Users, title: 'EPC companies', text: 'PuREPower BESS supply for your projects.' },
  { icon: Wrench, title: 'Solar installers', text: 'Add energy storage to the systems you install.' },
  { icon: Handshake, title: 'Dealers / channel partners', text: 'Distribution and channel partnership enquiries.' },
  { icon: Package, title: 'Commercial & industrial', text: 'Supply for business and industrial requirements.' },
];

const PurePowerBESS = () => {
  const [modeId, setModeId] = useState('without');
  const mode = MODES.find((m) => m.id === modeId);

  const appsRef = useRef(null);
  const appsIn = useInView(appsRef, { once: false, amount: 0.2 });
  const partnersRef = useRef(null);
  const partnersIn = useInView(partnersRef, { once: false, amount: 0.2 });

  return (
    <main className="w-full overflow-x-hidden bg-white font-sans text-slate-900 antialiased">
      {/* ---------------- BRIGHT & CRISP HERO SECTION (ABOUTPAGE STYLING) ---------------- */}
      <section className="relative flex min-h-[85vh] w-full items-center overflow-x-clip overflow-y-hidden bg-slate-950 sm:min-h-screen">
        {/* Background Image */}
        <img
          src={Banner}
          alt="PuREPower BESS Energy Storage Installation"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.05] contrast-[1.08] saturate-[1.12]"
        />

        {/* Natural Depth Scrim & Bottom Fog Blend */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent md:w-[68%]" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
          style={{
            background:
              'linear-gradient(to top, #FFFFFF 0%, #FFFFFF 15%, rgba(255,255,255,0.6) 45%, transparent 100%)',
          }}
        />

        {/* Banner Content Container */}
        <div className="relative z-20 w-full px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
          <div className="max-w-4xl">
            {/* Crisp, High Contrast Headline with AboutPage Gradient Accent */}
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl">
              <SlideLine delay={0.25}>PuREPower BESS,</SlideLine>
              <SlideLine
                delay={0.45}
                className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#FBBF24] bg-clip-text text-transparent"
              >
                with or without solar
              </SlideLine>
            </h1>

            {/* Animated Gradient Bar from AboutPage */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 0.85 }}
              className="mt-8 block h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]"
            />

            {/* Subtitle Glass Card from AboutPage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1 }}
              className="relative mt-8 overflow-hidden rounded-3xl border border-white/20 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl max-w-xl"
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#F5B800] to-[#159447]" />
              <p className="pl-3 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
                Energy storage and backup, with or without solar. Supplied to customers, EPC companies, solar installers, dealers and commercial and industrial users.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is BESS? */}
      <WhatIsBESS />

      {/* ---------------- WITHOUT / WITH SOLAR ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F1FAF4] to-white py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#159447]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#073B73]/10 blur-3xl" />

        <div className={`${WRAP} relative`}>
          <RevealHead>
            <SectionHead
              tag="Two ways to use it"
              title="BESS without solar, or BESS with solar"
              text="Solar is not compulsory. Choose the arrangement that fits your requirement."
            />
          </RevealHead>

          <FadeIn delay={0.15} className="mt-10">
            <div className="inline-flex rounded-2xl border border-white bg-white/80 p-1.5 shadow-[0_10px_40px_-12px_rgba(7,59,115,0.25)] ring-1 ring-[#073B73]/10 backdrop-blur">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModeId(m.id)}
                  className={`relative cursor-pointer rounded-xl px-5 py-3 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159447] focus-visible:ring-offset-2 sm:px-7 ${
                    modeId === m.id ? 'text-white' : 'text-[#073B73] hover:text-[#159447]'
                  }`}
                >
                  {modeId === m.id && (
                    <motion.span
                      layoutId="pp-mode"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1DB35B] to-[#0E7A38] shadow-lg shadow-[#159447]/40"
                    />
                  )}
                  <span className="relative z-10">{m.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* panel: doors open from the centre */}
          <DoorsOpen className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-[32px] bg-gradient-to-br from-[#159447]/60 via-[#073B73]/20 to-amber-400/50 p-px shadow-[0_40px_80px_-40px_rgba(7,59,115,0.45)]"
              >
                <div className="relative overflow-hidden rounded-[31px] bg-white p-6 sm:p-10">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#073B73_1px,transparent_1px)] bg-[length:22px_22px] opacity-[0.045]" />
                  <div className="relative">
                    <EnergyChain key={mode.id} items={mode.chain} speed={1000} />
                    <p className="mt-8 max-w-2xl border-l-4 border-[#159447] pl-5 text-base leading-relaxed text-[#4C5B73]">
                      {mode.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </DoorsOpen>
        </div>
      </section>

      {/* ---------------- APPLICATIONS (FIXED HEADER TEXT VISIBILITY) ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052C57] via-[#073B73] to-[#0A4F4A] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:28px_28px] opacity-[0.06]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[#34D399]/20 blur-3xl" />

        <div className={`${WRAP} relative`}>
          {/* Header explicitly styled for dark background without class collisions */}
          <RevealHead>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-black uppercase text-emerald-300 shadow-md backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
                Applications
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Where PuREPower BESS is used
              </h2>
            </div>
          </RevealHead>

          {/* Cards tip up like flip-panels, then the icon pops */}
          <motion.ul
            ref={appsRef}
            initial="hidden"
            animate={appsIn ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
            className="mt-12 grid grid-cols-2 gap-4 [perspective:1000px] sm:gap-5 md:grid-cols-5"
          >
            {applications.map((a) => (
              <motion.li
                key={a.label}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 50,
                    rotateX: -65,
                    transformOrigin: '50% 100%',
                    transition: { duration: 0.25 },
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transformOrigin: '50% 100%',
                    transition: { duration: 0.9, ease },
                  },
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-xl shadow-black/10 backdrop-blur-md transition-colors duration-300 hover:border-emerald-300/60 hover:bg-white/20"
              >
                <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <motion.span
                  variants={{
                    hidden: { scale: 0, rotate: -90, transition: { duration: 0.2 } },
                    show: {
                      scale: 1,
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 260, damping: 15, delay: 0.3 },
                    },
                  }}
                  className="mx-auto block w-14"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399] to-[#159447] text-white shadow-lg shadow-emerald-900/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <a.icon className="h-7 w-7" />
                  </span>
                </motion.span>
                <motion.p variants={fadeUp(0.45, 12)} className="mt-4 text-sm font-bold leading-snug text-white">
                  {a.label}
                </motion.p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---------------- PARTNERS ---------------- */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#159447]/10 blur-3xl" />

        <div className={`${WRAP} relative`}>
          <RevealHead>
            <SectionHead
              tag="For EPC companies, dealers and solar installers"
              title="Supply and partnership"
              text="PuREPower BESS is supplied independently, so you can offer energy storage with or without solar."
            />
          </RevealHead>

          {/* Cards drop down like a curtain, then top bar, icon and text follow */}
          <motion.ul
            ref={partnersRef}
            initial="hidden"
            animate={partnersIn ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {partners.map((p) => (
              <motion.li
                key={p.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    clipPath: 'inset(0% 0% 100% 0% round 24px)',
                    transition: { duration: 0.3 },
                  },
                  show: {
                    opacity: 1,
                    clipPath: 'inset(-10% -10% -10% -10% round 24px)',
                    transition: { duration: 1, ease },
                  },
                }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#073B73]/10 bg-gradient-to-b from-white to-[#F3FAF5] p-7 shadow-[0_20px_50px_-30px_rgba(7,59,115,0.4)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-25px_rgba(21,148,71,0.45)]"
              >
                <motion.span
                  variants={{
                    hidden: { scaleX: 0, transition: { duration: 0.2 } },
                    show: { scaleX: 1, transition: { duration: 0.9, delay: 0.35, ease } },
                  }}
                  className="absolute inset-x-0 top-0 h-1.5 origin-left bg-gradient-to-r from-[#159447] via-[#34D399] to-amber-400"
                />
                <motion.span
                  variants={{
                    hidden: { scale: 0, rotate: 90, transition: { duration: 0.2 } },
                    show: {
                      scale: 1,
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 240, damping: 15, delay: 0.4 },
                    },
                  }}
                  className="block w-14"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#073B73] text-white shadow-lg shadow-[#073B73]/30 transition-colors duration-300 group-hover:bg-[#159447]">
                    <p.icon className="h-7 w-7" />
                  </span>
                </motion.span>
                <motion.h3 variants={fadeUp(0.5, 14)} className="mt-5 text-lg font-extrabold text-[#073B73]">
                  {p.title}
                </motion.h3>
                <motion.p variants={fadeUp(0.6, 14)} className="mt-2 flex-1 text-sm leading-relaxed text-[#4C5B73]">
                  {p.text}
                </motion.p>
                <ArrowRight className="mt-5 h-5 w-5 text-[#159447] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100" />
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-12">
            <FadeIn delay={0.1} className="inline-block">
              <div className="inline-block rounded-2xl shadow-xl shadow-[#159447]/30 transition-transform duration-300 hover:-translate-y-1">
                <Btn to="/contact?need=partner" variant="green">Partner enquiry</Btn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PurePowerBESS;