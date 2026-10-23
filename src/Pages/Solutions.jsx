import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Home as HomeIcon, Store, Factory, Layers, PlugZap, BatteryCharging, Check, X, } from 'lucide-react';

import { WRAP, SYSTEM_CHAIN, ease } from './NeoUI';
import EnergyChain from './EnergyChain';

import Banner from '../assets/Other banner images/Solution_Banner.webp';

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

/* SCROLL REVEAL helpers  */
const fadeUp = (delay = 0, y = 20) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)', transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease } },
});

/* heading word that slides up out of a mask */
const MaskWord = ({ children, delay }) => (
  <span className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
    <motion.span
      variants={{
        hidden: { y: '115%', rotate: 4, transition: { duration: 0.2 } },
        show: { y: '0%', rotate: 0, transition: { duration: 0.85, delay, ease } },
      }}
      className="inline-block origin-bottom-left"
    >
      {children}
    </motion.span>
  </span>
);

const provide = (extra) => [
  'Energy assessment based on your actual load',
  'System design and sizing',
  ...extra,
  'Installation, testing and commissioning',
  'Monitoring and after-sales support',
];

const SOLUTIONS = [
  {
    id: 'residential',
    icon: HomeIcon,
    title: 'Residential Energy Solutions',
    need: 'complete',
    requirement: 'Homes that want dependable power for essential loads, less dependence on the grid, or both.',
    chain: ['Solar Panels', 'PuREPower BESS', 'AC Protection', 'Essential Loads'],
    how: 'Solar power supplies the home and charges the battery. The grid works alongside. When grid supply is unavailable, the battery supplies the essential loads you have selected.',
    provides: provide(['Supply of solar equipment and PuREPower BESS']),
  },
  {
    id: 'commercial',
    icon: Store,
    title: 'Commercial Energy Solutions',
    need: 'complete',
    requirement: 'Shops, offices and institutions that need steady power for lighting, computers, billing and cooling.',
    chain: ['Solar (optional)', 'Grid', 'PuREPower BESS', 'Essential Loads'],
    how: 'The BESS sits between the supply and the selected business loads, storing energy and supplying those loads when needed. Solar can be included to charge the system.',
    provides: provide(['Selection of critical loads to be backed up']),
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Energy Solutions',
    need: 'complete',
    requirement: 'Industrial units that need to support selected process or control loads and manage energy use.',
    chain: ['Solar Array', 'DCDB & Protection', 'PuREPower BESS', 'AC Protection', 'Process Loads'],
    how: 'Solar generation and grid supply are managed through the BESS, with protection on both DC and AC sides. Selected loads are supplied from the system as designed.',
    provides: provide(['Protection and earthing design', 'Supply of solar equipment and PuREPower BESS']),
  },
  {
    id: 'complete',
    icon: Layers,
    title: 'Complete Solar + BESS',
    need: 'complete',
    requirement: 'You want one partner to plan and deliver everything, from solar generation to energy storage and use.',
    chain: SYSTEM_CHAIN,
    how: 'Every stage from the solar structure to monitoring is designed as one system, so generation, protection, storage and loads are matched to each other.',
    provides: provide(['Supply of every component in the chain', 'Earthing, protection and monitoring']),
  },
  {
    id: 'upgrade',
    icon: PlugZap,
    title: 'Existing Solar + BESS Upgrade',
    need: 'existing',
    requirement: 'You already have solar and want to store energy for use when the sun is not available or when the grid is down.',
    chain: ['Existing Solar', 'Compatibility Check', 'PuREPower BESS', 'Essential Loads'],
    how: 'We first study your existing system, then integrate a PuREPower BESS so that stored energy can supply the loads you choose.',
    provides: [
      'Review of your existing solar system',
      'Sizing of the energy storage',
      'Supply and integration of PuREPower BESS',
      'Commissioning and monitoring setup',
      'After-sales support',
    ],
  },
  {
    id: 'backup',
    icon: BatteryCharging,
    title: 'Backup & Energy Storage',
    need: 'purepower',
    requirement: 'You do not need solar. You want energy storage and backup from a PuREPower BESS.',
    chain: ['Grid', 'PuREPower BESS', 'Essential Loads'],
    how: 'The BESS stores energy from the grid and supplies your essential loads when needed. Solar can be added later wherever required.',
    provides: [
      'Assessment of the loads to be backed up',
      'Selection of the right PuREPower capacity',
      'Supply, installation and commissioning',
      'Monitoring and after-sales support',
    ],
  },
];

/* one row of the detail card: rule draws, badge pops, label + content fade in.
   Own observer => each row reveals as it scrolls into view, every time. */
const Row = ({ n, label, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: {} }}
      className="relative grid gap-3 py-6 sm:grid-cols-[170px_1fr] sm:gap-6"
    >
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0, transition: { duration: 0.2 } },
          show: { scaleX: 1, transition: { duration: 1, ease } },
        }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-[#073B73]/15"
      />
      <p className="flex items-center gap-2.5 text-sm font-bold text-[#073B73]">
        <motion.span
          variants={{
            hidden: { scale: 0, rotate: -90, transition: { duration: 0.2 } },
            show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 14, delay: 0.1 } },
          }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5B800] text-[11px] font-bold text-[#0A1B3D]"
        >
          {n}
        </motion.span>
        <motion.span variants={fadeUp(0.15, 12)}>{label}</motion.span>
      </p>
      <motion.div variants={fadeUp(0.25, 18)}>{children}</motion.div>
    </motion.div>
  );
};

// ─── COMPARISON SECTION DATA & HELPERS ───────────────────────────────────────
const rows = [
  { label: 'Energy Storage', pure: 'Lithium-ion', inverter: 'Lead-Acid', dg: 'Fuel' },
  { label: 'Solar Ready', pure: 'yes', inverter: 'Depends on system', dg: 'no' },
  { label: 'Fast Transfer', pure: '10 ms on specified PUREPower models', inverter: 'Varies', dg: 'Typically delayed' },
  { label: 'Noise', pure: 'Silent electronic operation', inverter: 'Low', dg: 'High' },
  { label: 'Local Emissions at Use', pure: 'None', inverter: 'None', dg: 'Yes' },
  { label: 'Battery Maintenance', pure: 'Integrated lithium system', inverter: 'Regular attention / replacement', dg: 'N/A' },
  { label: 'Smart Monitoring', pure: 'Connected / cloud features', inverter: 'Usually limited', dg: 'Usually limited' },
  { label: 'Fuel Requirement', pure: 'no', inverter: 'no', dg: 'yes' },
  { label: 'Installation', pure: 'Integrated', inverter: 'Multiple components possible', dg: 'Generator + fuel / exhaust infrastructure' },
  { label: 'Future Solar Integration', pure: 'yes', inverter: 'System-dependent', dg: 'no' },
];

const accent = {
  bar: '#16A34A',
  text: '#15803D',
  soft: 'rgba(22, 163, 74, 0.08)',
  line: 'rgba(22, 163, 74, 0.22)',
};
const off = { text: '#DC2626', soft: 'rgba(239, 68, 68, 0.10)' };

const StatusCell = ({ value }) => {
  if (value === 'yes')
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 shadow-xs">
        <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
      </span>
    );
  if (value === 'no')
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: off.soft }}>
        <X className="h-3.5 w-3.5" style={{ color: off.text }} strokeWidth={3} />
      </span>
    );
  return <span className="text-[12.5px] font-medium leading-snug text-slate-600 sm:text-[13px]">{value}</span>;
};

// ─── MAIN SOLUTIONS COMPONENT ────────────────────────────────────────────────
const Solutions = () => {
  const [activeId, setActiveId] = useState(SOLUTIONS[0].id);
  const sol = SOLUTIONS.find((s) => s.id === activeId);

  /* observers (all on unclipped wrappers, replay on every scroll) */
  const selectorRef = useRef(null);
  const selectorIn = useInView(selectorRef, { once: false, amount: 0.2 });
  const detailRef = useRef(null);
  const detailIn = useInView(detailRef, { once: false, amount: 0.12 });
  const introRef = useRef(null);
  const introIn = useInView(introRef, { once: false, amount: 0.5 });
  const tableRef = useRef(null);
  const tableIn = useInView(tableRef, { once: false, amount: 0.1 });
  const noteRef = useRef(null);
  const noteIn = useInView(noteRef, { once: false, amount: 0.6 });

  const compareTitle = 'PUREPower vs Conventional Inverter vs Diesel Generator'.split(' ');

  return (
    <main className="w-full overflow-x-hidden bg-white font-sans text-slate-900">
      {/* ---------------- BRIGHT & CRISP HERO SECTION (ABOUTPAGE STYLING) ---------------- */}
      <section className="relative flex min-h-[85vh] w-full items-center overflow-x-clip overflow-y-hidden bg-slate-950 sm:min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <img
            src={Banner}
            alt="Complete Solar Architecture at Neo Solaris Live Energy Experience Centre"
            className="h-full w-full scale-[1.01] object-cover object-center brightness-[1.12] contrast-[1.05] saturate-[1.08] transition-opacity duration-500 opacity-100"
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
        </div>

        {/* Banner Content Container (AboutPage Heading & Glass Card Style) */}
        <div className="relative z-20 w-full px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
          <div className="max-w-4xl">
            {/* Crisp, High Contrast Headline with AboutPage Gradient Accent */}
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl">
              <SlideLine delay={0.25}>Complete systems,</SlideLine>
              <SlideLine
                delay={0.45}
                className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#FBBF24] bg-clip-text text-transparent"
              >
                designed around your requirement
              </SlideLine>
            </h1>

            {/* Animated Gradient Bar from AboutPage */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="mt-8 block h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]"
            />

            {/* Subtitle Glass Card from AboutPage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="relative mt-8 overflow-hidden rounded-3xl border border-white/20 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl max-w-xl"
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#F5B800] to-[#159447]" />
              <p className="pl-3 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
                Solutions are complete systems we design and integrate for you. Choose the one that matches your requirement to see how it works.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Body */}
      <section className="bg-white pb-16 sm:py-24">
        <div className={`${WRAP} grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12`}>
          {/* selector: buttons slide in from the left, one after another */}
          <motion.div
            ref={selectorRef}
            initial="hidden"
            animate={selectorIn ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:self-start lg:overflow-visible"
          >
            {SOLUTIONS.map((s) => {
              const on = s.id === activeId;
              return (
                <motion.div
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, x: -50, transition: { duration: 0.2 } },
                    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
                  }}
                  className="shrink-0"
                >
                  <button
                    onClick={() => setActiveId(s.id)}
                    className={`relative flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                      on ? 'border-transparent text-white' : 'border-[#073B73]/10 bg-white text-[#073B73] hover:border-[#159447]'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="solution-active"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#073B73] to-[#0A2A57]"
                      />
                    )}
                    <s.icon className={`relative z-10 h-5 w-5 shrink-0 ${on ? 'text-[#F5B800]' : 'text-[#159447]'}`} />
                    <span className="relative z-10 whitespace-nowrap text-sm font-bold lg:whitespace-normal">{s.title}</span>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* detail: card slides in from the right, then each row reveals as you scroll */}
          <div ref={detailRef}>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              animate={
                detailIn
                  ? { opacity: 1, x: 0, transition: { duration: 1, ease } }
                  : { opacity: 0, x: 70, transition: { duration: 0.3 } }
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease }}
                  className="rounded-3xl border border-[#073B73]/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(7,59,115,0.35)] sm:p-10"
                >
                  <h2 className="text-2xl font-bold text-[#073B73] sm:text-3xl">{sol.title}</h2>

                  <div className="mt-6">
                    <Row n="1" label="Customer requirement">
                      <p className="text-[15px] leading-relaxed text-[#4C5B73]">{sol.requirement}</p>
                    </Row>
                    <Row n="2" label="System architecture">
                      <EnergyChain key={sol.id} items={sol.chain} speed={1000} />
                    </Row>
                    <Row n="3" label="How it works">
                      <p className="text-[15px] leading-relaxed text-[#4C5B73]">{sol.how}</p>
                    </Row>
                    <Row n="4" label="What Neo Solaris provides">
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {sol.provides.map((p, i) => (
                          <motion.li
                            key={p}
                            variants={{
                              hidden: { opacity: 0, x: -20, transition: { duration: 0.2 } },
                              show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 + i * 0.08, ease } },
                            }}
                            className="flex items-start gap-2.5 text-sm font-medium text-[#073B73]"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#159447] text-white">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </Row>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT COMPARES SECTION ── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
          {/* Section Intro: pill pops, title words rise out of a mask, text fades up */}
          <motion.div
            ref={introRef}
            initial="hidden"
            animate={introIn ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: {} }}
            className="max-w-xl mb-10"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.6, filter: 'blur(6px)', transition: { duration: 0.2 } },
                show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
              }}
              className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 inline-block mb-2.5 origin-left"
            >
              How it compares
            </motion.span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {compareTitle.map((w, i) => (
                <MaskWord key={`${w}-${i}`} delay={0.15 + i * 0.07}>
                  {w}
                </MaskWord>
              ))}
            </h2>

            <motion.p
              variants={fadeUp(0.6)}
              className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              A quick, honest comparison so you can see exactly why PUREPower is a
              different — and better fit for most homes and businesses today.
            </motion.p>
          </motion.div>

          {/* Comparison Table: card rises, header badge pops, rows slide in one by one */}
          <motion.div
            ref={tableRef}
            initial="hidden"
            animate={tableIn ? 'show' : 'hidden'}
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 60, transition: { duration: 0.3 } },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease } },
            }}
            className="overflow-x-auto rounded-3xl bg-white border border-slate-200 shadow-xl"
          >
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-5 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 w-1/4 align-bottom">
                    Feature
                  </th>
                  <th
                    className="py-5 px-6 w-1/4 align-bottom relative"
                    style={{
                      background: accent.soft,
                      borderLeft: `1px solid ${accent.line}`,
                      borderRight: `1px solid ${accent.line}`,
                    }}
                  >
                    <motion.span
                      variants={{
                        hidden: { scale: 0, transition: { duration: 0.2 } },
                        show: {
                          scale: 1,
                          transition: { type: 'spring', stiffness: 300, damping: 14, delay: 0.5 },
                        },
                      }}
                      className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 bg-[#16A34A] text-white shadow-xs"
                    >
                      Best fit
                    </motion.span>
                    <p className="text-xl font-extrabold text-[#15803D]">PUREPower</p>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-700 w-1/4 align-bottom">
                    Lead-Acid Inverter
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-700 w-1/4 align-bottom">
                    Diesel Generator
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } } }}
                className="divide-y divide-slate-100"
              >
                {rows.map((row, idx) => (
                  <motion.tr
                    key={row.label}
                    variants={{
                      hidden: { opacity: 0, x: -30, transition: { duration: 0.15 } },
                      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
                    }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-xs sm:text-[13px] text-slate-900 font-bold">
                      {row.label}
                    </td>
                    <td
                      className="py-4 px-6"
                      style={{
                        background: accent.soft,
                        borderLeft: `1px solid ${accent.line}`,
                        borderRight: `1px solid ${accent.line}`,
                        borderBottom: idx === rows.length - 1 ? `1px solid ${accent.line}` : 'none',
                      }}
                    >
                      <StatusCell value={row.pure} />
                    </td>
                    <td className="py-4 px-6">
                      <StatusCell value={row.inverter} />
                    </td>
                    <td className="py-4 px-6">
                      <StatusCell value={row.dg} />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>

          <motion.p
            ref={noteRef}
            initial="hidden"
            animate={noteIn ? 'show' : 'hidden'}
            variants={fadeUp(0.1, 14)}
            className="mt-4 text-[12px] text-slate-500 font-medium"
          >
            Comparison is indicative and based on typical residential / commercial
            usage. Actual performance depends on system sizing and usage pattern —
            our team can walk you through your specific case.
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default Solutions;
