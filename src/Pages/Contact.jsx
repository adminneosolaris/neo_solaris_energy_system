import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, ArrowUpRight } from 'lucide-react';

import { Btn, LiveDot, WRAP, CONTACT, ease } from './NeoUI';
import SelfAssessment, { NEEDS } from './SelfAssessment';

import Banner from '../assets/Other banner images/Contact_Banner.webp';
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

const info = [
  { icon: MapPin, label: 'Visit us', text: CONTACT.address },
  { icon: Phone, label: 'Call us', text: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { icon: Mail, label: 'Email us', text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Clock, label: 'Working hours', text: CONTACT.hours },
];

const Contact = () => {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const needParam = params.get('need');
  const initialNeed = NEEDS.some((n) => n.id === needParam) ? needParam : null;

  // scroll to #visit when arriving from other pages
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [hash]);

  return (
    <>
    <Helmet>
      <title>Contact Us - Neo Solaris Energy Systems</title>
      <meta name="description" content="Get in touch with Neo Solaris for expert solar and energy storage consultations." />
    </Helmet>

    <main className="w-full overflow-x-hidden bg-white">
      {/* ---------------- BRIGHT & CRISP HERO SECTION (ABOUTPAGE STYLING) ---------------- */}
      <section className="relative flex min-h-[85vh] w-full items-center overflow-x-clip overflow-y-hidden bg-slate-950 sm:min-h-screen">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <img
            src={Banner}
            alt="Neo Solaris Live Energy Experience Centre"
            className="h-full w-full scale-[1.01] object-cover object-center brightness-[1.12] contrast-[1.05] saturate-[1.08]"
          />

          {/* Scrim Depth & Bottom Fog Blend */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent md:w-[68%]" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
            style={{
              background:
                'linear-gradient(to top, #FFFFFF 0%, #FFFFFF 15%, rgba(255,255,255,0.6) 45%, transparent 100%)',
            }}
          />
        </div>

        {/* Banner Content Container */}
        <div className="relative z-20 w-full px-6 py-24 sm:px-12 sm:py-32 lg:px-20">
          <div className="max-w-4xl">
            {/* Crisp Heading with Slide from Right Animation */}
            <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl">
              <SlideLine delay={0.25}>COME EXPERIENCE</SlideLine>
              <SlideLine
                delay={0.45}
                className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#FBBF24] bg-clip-text text-transparent"
              >
                IT LIVE
              </SlideLine>
            </h1>

            {/* Animated Gradient Divider Line */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 0.85 }}
              className="mt-8 block h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]"
            />

            {/* Subtitle Frosted Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1 }}
              className="relative mt-8 max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl"
            >
              <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#F5B800] to-[#159447]" />
              <p className="pl-3 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
                Visit the Neo Solaris Live Energy Experience Centre in Madurai and understand Solar + BESS and standalone PuREPower BESS in actual operation.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.15 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Btn href="#visit" variant="green">Visit Experience Centre</Btn>
              <Btn href={CONTACT.directions} external variant="navy" icon={false}>Get Directions</Btn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* quick info */}
      <section className="bg-white py-12 pb-6 sm:py-16">
        <div className={WRAP}>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {info.map((c) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#159447] transition-colors duration-300 group-hover:bg-[#159447] group-hover:text-white">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-bold text-[#159447]">{c.label}</p>
                  <p className="mt-1 text-sm font-bold leading-snug text-[#073B73]">{c.text}</p>
                </>
              );
              return (
                <motion.li
                  key={c.label}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-[#073B73]/10 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_40px_-24px_rgba(21,148,71,0.45)]"
                >
                  {c.href ? (
                    <a href={c.href} className="block p-6">{body}</a>
                  ) : (
                    <div className="p-6">{body}</div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* self-assessment + map */}
      <section id="visit" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <div className={`${WRAP} grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]`}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease }}
          >
            <SelfAssessment initialNeed={initialNeed} />
          </motion.div>

          {/* ── PREMIUM MAP CARD ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease }}
            className="group relative flex min-h-[500px] flex-col lg:min-h-[560px]"
          >
            {/* Soft brand glow behind card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[44px] bg-gradient-to-br from-[#159447]/25 via-transparent to-[#F5B800]/25 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            />

            {/* Gradient hairline frame */}
            <div className="relative flex flex-1 rounded-[34px] bg-gradient-to-br from-[#159447] via-[#073B73] to-[#F5B800] p-[1.5px] shadow-[0_40px_80px_-30px_rgba(7,59,115,0.45)]">
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-[32px] bg-white">
                {/* Map area */}
                <div className="relative min-h-[300px] flex-1 overflow-hidden bg-slate-200">
                  <iframe
                    title="Neo Solaris Energy Systems location"
                    src={CONTACT.mapEmbed}
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.06] saturate-[1.1] contrast-[1.04] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.12]"
                  />

                  {/* Depth vignettes */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#073B73]/35 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent" />

                  {/* Click-through to Google Maps */}
                  <a
                    href={CONTACT.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open location in Google Maps"
                    className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#F5B800]"
                  />

                  {/* Status pill */}
                  <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3.5 py-1.5 text-[11px] font-bold text-[#073B73] shadow-lg shadow-[#073B73]/10 backdrop-blur-xl">
                    <LiveDot /> Experience Centre · Mon – Sat
                  </div>

                  {/* Hover hint */}
                  <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-[#073B73]/80 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                    Open in Google Maps
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#F5B800]" />
                  </div>

                  {/* Refined location pin */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[70%]">
                    <span className="absolute left-1/2 top-full h-3 w-8 -translate-x-1/2 -translate-y-1.5 rounded-[50%] bg-slate-900/30 blur-[3px]" />
                    <span className="absolute left-1/2 top-full h-14 w-14 -translate-x-1/2 -translate-y-[1.45rem] animate-ping rounded-full bg-[#159447]/25" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full rounded-br-none border-[3px] border-white bg-gradient-to-br from-[#159447] to-[#0D6330] shadow-[0_12px_28px_-6px_rgba(21,148,71,0.7)] [transform:rotate(45deg)]">
                      <MapPin className="h-5 w-5 text-white [transform:rotate(-45deg)]" />
                    </div>
                  </div>
                </div>

                {/* Floating info panel */}
                <div className="relative z-30 -mt-10 mx-3 mb-3 rounded-[26px] border border-[#073B73]/10 bg-white p-5 shadow-[0_20px_50px_-20px_rgba(7,59,115,0.35)] sm:mx-4 sm:mb-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#159447] to-[#0D6330] text-white shadow-md shadow-[#159447]/30">
                      <Navigation className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-extrabold leading-tight text-[#073B73] sm:text-lg">
                        Neo Solaris Energy Systems
                      </p>
                      <p className="mt-1 text-sm leading-snug text-slate-600">{CONTACT.address}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#EAF5EE] px-3.5 py-2.5 text-xs font-semibold text-[#0D6330]">
                    <Clock className="h-4 w-4 shrink-0" />
                    {CONTACT.hours}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a
                      href={CONTACT.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-40 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#073B73] to-[#09488a] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#073B73]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#073B73]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800]"
                    >
                      <Navigation className="h-4 w-4 text-[#F5B800]" />
                      Directions
                    </a>
                    <a
                      href={CONTACT.phoneHref}
                      className="relative z-40 flex items-center justify-center gap-2 rounded-xl border border-[#159447]/30 bg-white px-4 py-3 text-sm font-bold text-[#159447] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#159447] hover:bg-[#159447] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B800]"
                    >
                      <Phone className="h-4 w-4" />
                      Call us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Contact;