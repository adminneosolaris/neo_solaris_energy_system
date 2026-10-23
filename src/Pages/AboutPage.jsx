import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion';
import { Layers, BatteryCharging, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SectionHead, WRAP, STRENGTHS, ease } from './NeoUI';

import image1 from '../assets/Other banner images/About_Banner.webp';

/* ======================================================================
   HERO helper — smooth slide from absolute screen right edge (100vw)
   ====================================================================== */
const SlideLine = ({ children, delay = 0, className = '' }) => (
  <motion.span
    initial={{ opacity: 0, x: '100vw' }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1], // Ultra-smooth luxury deceleration curve
      delay,
    }}
    className={`block will-change-transform ${className}`}
  >
    {children}
  </motion.span>
);

/* SCROLL REVEAL helpers */
const fadeUp = (delay = 0, y = 20) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)', transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease } },
});

/* Section heading: unveils top-to-bottom, rises and un-blurs */
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

/* ======================================================================
   VERTICALS — "energy spine" zig-zag (content மாறல)
   ====================================================================== */
const VERTICALS = [
  {
    icon: Layers,
    title: 'Complete Energy Solutions – Solar + BESS',
    text: "From solar generation to energy storage and utilisation, designed and delivered around the customer's actual requirement.",
    to: '/solutions',
    cta: 'View solutions',
    tint: 'from-[#E4F4EA] via-white to-white',
  },
  {
    icon: BatteryCharging,
    title: 'PuREPower BESS',
    text: 'Standalone energy storage and backup, supplied to customers, EPC companies, solar installers, dealers and commercial and industrial users.',
    to: '/purepower',
    cta: 'View PuREPower BESS',
    tint: 'from-[#E4EEFA] via-white to-white',
  },
];

/* one spine row: node pops, connector draws, card wipes in from its side */
const SpineItem = ({ v, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const right = i % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: {} }}
      className="relative pb-14 last:pb-0 md:pb-24"
    >
      {/* Node */}
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: -90, transition: { duration: 0.2 } },
          show: {
            scale: 1,
            rotate: 0,
            transition: { type: 'spring', stiffness: 220, damping: 16 },
          },
        }}
        className="absolute left-0 top-8 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#159447] bg-white text-[#159447] shadow-xl shadow-[#159447]/20 md:left-1/2 md:-ml-7"
      >
        <v.icon className="h-6 w-6" />
      </motion.span>

      {/* Connector (draws out of the node) */}
      <motion.span
        variants={{
          hidden: { scaleX: 0, transition: { duration: 0.2 } },
          show: { scaleX: 1, transition: { duration: 0.5, delay: 0.3, ease } },
        }}
        className={`absolute top-[3.75rem] left-14 h-px w-6 origin-left bg-[#159447]/50 md:w-9 ${
          right ? 'md:left-[calc(50%+1.75rem)]' : 'md:left-[calc(50%-4rem)]'
        }`}
      />

      {/* Card */}
      <motion.article
        variants={{
          hidden: {
            opacity: 0,
            x: right ? 60 : -60,
            clipPath: right
              ? 'inset(0% 0% 0% 100% round 2rem)'
              : 'inset(0% 100% 0% 0% round 2rem)',
            transition: { duration: 0.3 },
          },
          show: {
            opacity: 1,
            x: 0,
            clipPath: 'inset(-10% -10% -10% -10% round 2rem)',
            transition: { duration: 1, delay: 0.25, ease },
          },
        }}
        whileHover={{ y: -6 }}
        className={`group relative overflow-hidden rounded-[2rem] border border-[#073B73]/10 bg-gradient-to-br p-8 shadow-[0_30px_60px_-34px_rgba(7,59,115,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(21,148,71,0.45)] sm:p-10 ml-20 md:w-[calc(50%-4rem)] ${v.tint} ${
          right ? 'md:ml-auto' : 'md:ml-0'
        }`}
      >
        {/* Top accent (draws across) */}
        <motion.span
          variants={{
            hidden: { scaleX: 0, transition: { duration: 0.2 } },
            show: { scaleX: 1, transition: { duration: 0.9, delay: 0.6, ease } },
          }}
          className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-[#159447] via-[#159447] to-[#F5B800]"
        />
        {/* Watermark icon */}
        <v.icon
          strokeWidth={0.8}
          className="pointer-events-none absolute -bottom-12 -right-10 h-60 w-60 text-[#159447]/[0.08] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
        />

        <motion.h3
          variants={fadeUp(0.55)}
          className="relative max-w-md text-2xl font-bold leading-snug text-[#073B73] sm:text-[28px]"
        >
          {v.title}
        </motion.h3>
        <motion.p
          variants={fadeUp(0.7)}
          className="relative mt-4 max-w-md text-[15px] leading-relaxed text-[#4C5B73] sm:text-base"
        >
          {v.text}
        </motion.p>

        <motion.div variants={fadeUp(0.85)} className="relative mt-8">
          <Link
            to={v.to}
            className="inline-flex items-center gap-2 rounded-full bg-[#073B73] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#073B73]/25 transition-colors duration-300 hover:bg-[#159447] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159447] focus-visible:ring-offset-2"
          >
            {v.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.article>
    </motion.div>
  );
};

const VerticalSpine = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.55'],
  });

  return (
    <div ref={ref} className="relative mt-16 sm:mt-20">
      {/* Spine track + scroll-filled energy line */}
      <span className="absolute bottom-0 left-[calc(1.75rem-0.5px)] top-0 w-px bg-[#073B73]/15 md:left-[calc(50%-0.5px)]" />
      <motion.span
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-0 left-[calc(1.75rem-1.5px)] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#159447] via-[#159447] to-[#F5B800] md:left-[calc(50%-1.5px)]"
      />

      {VERTICALS.map((v, i) => (
        <SpineItem key={v.title} v={v} i={i} />
      ))}
    </div>
  );
};

/* ======================================================================
   STRENGTHS — tinted masonry (varying heights)
   ====================================================================== */
const TINTS = [
  'bg-white',
  'bg-gradient-to-br from-[#E4F4EA] to-white',
  'bg-gradient-to-br from-[#E4EEFA] to-white',
  'bg-gradient-to-br from-[#FFF4D2] to-white',
];
const HEIGHTS = ['min-h-[14rem]', 'min-h-[18rem]', 'min-h-[16rem]'];

/* ======================================================================
   PAGE
   ====================================================================== */
const AboutPage = () => {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();

  // Parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  // Strengths grid: replays on every scroll in/out
  const strengthsRef = useRef(null);
  const strengthsIn = useInView(strengthsRef, { once: false, amount: 0.08 });

  return (
    <main className="w-full bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* ---------------- BRIGHT & CRISP HERO SECTION ---------------- */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] w-full items-center overflow-x-clip overflow-y-hidden bg-slate-950 sm:min-h-screen"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.5, ease, delay: 0.2 }}
            className="h-full w-full"
          >
            <motion.img
              src={image1}
              alt="Energy storage and solar infrastructure"
              style={reduce ? undefined : { y: imageY }}
              className="h-full w-full scale-[1.01] object-cover object-center brightness-[1.12] contrast-[1.05] saturate-[1.08]"
            />
          </motion.div>

          {/* Solutions Scrim Depth & Bottom Fog Blend */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent md:w-[68%]" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
            style={{
              background:
                'linear-gradient(to top, #FFFFFF 0%, #FFFFFF 15%, rgba(255,255,255,0.6) 45%, transparent 100%)',
            }}
          />
        </div>

        {/* Ambient Orbit ring */}
        {!reduce && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
            className="pointer-events-none absolute right-16 top-24 z-10 hidden h-44 w-44 rounded-full border border-dashed border-[#159447]/40 lg:block"
          >
            <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B800] shadow-[0_0_20px_5px_rgba(245,184,0,0.55)]" />
          </motion.div>
        )}

        {/* Banner Content Container (Full Viewport Edge-to-Center Slide Animation) */}
        <div className="relative z-20 w-full px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl">
              <SlideLine delay={0.25}>An energy-solutions company,</SlideLine>
              <SlideLine
                delay={0.45}
                className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#FBBF24] bg-clip-text text-transparent"
              >
                not only a solar installer
              </SlideLine>
            </h1>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 0.85 }}
              className="mt-8 block h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]"
            />

            {/* Subtitle Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1 }}
              className="relative mt-8 overflow-hidden rounded-3xl border border-white/20 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl max-w-xl"
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#F5B800] to-[#159447]" />
              <p className="pl-3 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
                Neo Solaris Energy Systems provides complete Solar + BESS energy solutions and supplies PuREPower BESS independently, based on real energy requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- TWO VERTICALS — energy spine ---------------- */}
      <section className="relative z-20 rounded-t-[2.5rem] bg-white pt-20">
        <div className={WRAP}>
          <RevealHead>
            <SectionHead
              tag="What we do"
              title="Two business verticals, one energy approach"
              text="We handle each requirement through assessment, system design, sizing, supply, installation, commissioning and support."
            />
          </RevealHead>
          <VerticalSpine />
        </div>
      </section>

      {/* ---------------- STRENGTHS — tinted masonry ---------------- */}
      <section className="relative z-30 overflow-hidden rounded-t-[2.5rem] bg-[#F3FAF5] pb-24 pt-20 sm:rounded-t-[4rem]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#159447_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#159447]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <div className={`${WRAP} relative`}>
          <RevealHead>
            <SectionHead
              tag="Our strengths"
              title="What you can rely on"
              text="Practical strengths you can see and verify, including at our Live Energy Experience Centre."
            />
          </RevealHead>

          <motion.ul
            ref={strengthsRef}
            initial="hidden"
            animate={strengthsIn ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3"
          >
            {STRENGTHS.map((s, i) => (
              <motion.li
                key={s.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 60,
                    rotate: i % 2 === 0 ? -2.5 : 2.5,
                    scale: 0.93,
                    filter: 'blur(8px)',
                    transition: { duration: 0.25 },
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.85, ease },
                  },
                }}
                whileHover={{ y: -6 }}
                className={`group relative mb-5 flex break-inside-avoid flex-col overflow-hidden rounded-[1.75rem] border border-[#073B73]/10 p-7 shadow-[0_22px_44px_-30px_rgba(7,59,115,0.5)] transition-shadow duration-500 hover:shadow-[0_32px_54px_-28px_rgba(21,148,71,0.55)] ${TINTS[i % TINTS.length]} ${HEIGHTS[i % HEIGHTS.length]}`}
              >
                {/* Watermark */}
                <s.icon
                  strokeWidth={0.8}
                  className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 text-[#159447]/[0.08] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
                />

                {/* icon pops */}
                <motion.span
                  variants={{
                    hidden: { scale: 0, rotate: -60, transition: { duration: 0.2 } },
                    show: {
                      scale: 1,
                      rotate: 0,
                      transition: { type: 'spring', stiffness: 260, damping: 15, delay: 0.25 },
                    },
                  }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#159447] shadow-md shadow-[#159447]/15 transition-colors duration-300 group-hover:bg-[#159447] group-hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </motion.span>

                {/* bar draws */}
                <span className="relative mt-5 block h-1 w-10 rounded-full bg-gradient-to-r from-[#159447] to-[#F5B800] transition-all duration-500 group-hover:w-24" />

                <motion.h3
                  variants={fadeUp(0.35, 14)}
                  className="relative mt-4 text-[17px] font-bold leading-snug text-[#073B73]"
                >
                  {s.title}
                </motion.h3>
                <motion.p
                  variants={fadeUp(0.45, 14)}
                  className="relative mt-2 text-sm leading-relaxed text-[#4C5B73]"
                >
                  {s.text}
                </motion.p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;