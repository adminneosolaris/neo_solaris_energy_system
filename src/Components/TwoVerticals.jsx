import React from 'react';
import { motion } from 'framer-motion';
import { Sun, BatteryCharging, Gauge, Home as HomeIcon, Check, ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { Btn, SectionHead, WRAP, ease } from '../Pages/NeoUI';

const path1 = [
  { icon: Sun, label: 'Solar Power Generation' },
  { icon: BatteryCharging, label: 'Advanced Battery Energy Storage(BESS)' },
  { icon: Gauge, label: 'Intelligent Hybrid Power Management' },
  { icon: HomeIcon, label: 'Reliable Backup and Load Management' },
];

const audiences = [
  'Individual customers',
  'EPC companies',
  'Solar installers',
  'Dealers / channel partners',
  'Commercial & industrial',
];

const TwoVerticals = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F9F5] via-[#FFFFFF] to-[#F8FAFC] py-10 md:py-20 text-[#073B73]">
    {/* Micro Cleantech Dot Matrix & Radiant Ambient Mesh Orbs */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#073B73_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="pointer-events-none absolute -left-36 top-16 h-[28rem] w-[28rem] rounded-full bg-[#159447]/10 blur-[110px]" />
    <div className="pointer-events-none absolute -right-36 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#F5B800]/10 blur-[110px]" />
    <div className="pointer-events-none absolute left-1/3 bottom-0 h-80 w-80 rounded-full bg-[#073B73]/5 blur-[100px]" />

    <div className={`${WRAP} relative z-10 mt-10`}>
      <SectionHead
        align="center"
        tag="Two ways to work with Neo Solaris"
        title="Choose the path that matches your requirement"
        text="Both paths can be seen working at our Live Energy Experience Centre in Madurai."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        
        {/* ================= PATH 1 — Complete Solution (Re-triggers on scroll up & down) ================= */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="group relative overflow-hidden rounded-[40px] border-2 border-amber-200/80 bg-gradient-to-br from-[#FFFDF7] via-white to-[#F9FAF6] p-8 sm:p-12 text-[#073B73] shadow-[0_25px_70px_-20px_rgba(245,184,0,0.18)] transition-all duration-700 hover:border-amber-400 hover:shadow-[0_35px_90px_-15px_rgba(245,184,0,0.28)] backdrop-blur-3xl"
        >
          {/* Animated Solar Amber Aura */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F5B800]/20 blur-[90px]"
          />

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF7DF] px-4.5 py-1.5 text-xs font-black tracking-widest uppercase text-[#B98900] border border-amber-300/60 shadow-xs">
              <Zap className="h-3.5 w-3.5 text-[#D99A00]" />
              Path 1
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF8E6] border border-amber-200 text-[#D99A00] shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          <h3 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl text-[#073B73]">
            Complete Solar and Energy Storage Solution
          </h3>
          <p className="mt-3.5 max-w-md text-sm sm:text-base leading-relaxed text-[#4C5B73] font-medium">
            Solar generation up to energy storage and utilisation, designed around your actual requirement.
          </p>

          <div className="relative mt-10 pl-3">
            {/* Luminous Solar Pipeline Line (Re-triggers on scroll) */}
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease }}
              className="absolute bottom-6 left-[27px] top-6 w-0.5 origin-top bg-gradient-to-b from-[#F5B800] via-[#159447] to-transparent shadow-[0_0_15px_rgba(245,184,0,0.6)]"
            />
            
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
              className="space-y-5"
            >
              {path1.map((s) => (
                <motion.li
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, x: -25, filter: 'blur(4px)' },
                    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
                  }}
                  className="relative flex items-center gap-4.5 group/item"
                >
                  <motion.span 
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-amber-200/80 text-[#D99A00] shadow-sm transition-all duration-300 group-hover/item:bg-[#F5B800] group-hover/item:text-[#073B73] group-hover/item:shadow-[0_0_25px_rgba(245,184,0,0.5)]"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.span>
                  <span className="text-base font-bold text-[#073B73] tracking-wide transition-colors duration-300 group-hover/item:text-[#D99A00]">{s.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="mt-11 pt-6 border-t border-slate-200/80 flex items-center justify-between">
            <Btn to="/solutions" variant="navy">
              Explore Complete Solution
            </Btn>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF5DA] border border-amber-300 text-[#073B73] transition-all duration-300 group-hover:bg-[#F5B800] group-hover:text-[#073B73] group-hover:shadow-[0_0_20px_rgba(245,184,0,0.5)]"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </div>
        </motion.article>


        {/* ================= PATH 2 — PuREPower BESS (Re-triggers on scroll up & down) ================= */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="group relative overflow-hidden rounded-[40px] border-2 border-emerald-200/90 bg-gradient-to-br from-[#F2FAF5] via-white to-white p-8 sm:p-12 text-[#073B73] shadow-[0_25px_70px_-20px_rgba(21,148,71,0.18)] transition-all duration-700 hover:border-[#159447] hover:shadow-[0_35px_90px_-15px_rgba(21,148,71,0.28)] backdrop-blur-3xl"
        >
          {/* Animated Emerald Glow Aura */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#159447]/15 blur-[90px]"
          />

          <div className="flex items-start justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F4EC] backdrop-blur-2xl px-4.5 py-1.5 text-xs font-black tracking-widest uppercase text-[#12793B] border border-[#159447]/30 shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#159447]" />
                Path 2
              </span>
              <h3 className="mt-6 text-3xl font-black tracking-tight text-[#073B73] sm:text-4xl">
                PuREPower BESS
              </h3>
              <p className="mt-2 text-sm font-extrabold text-[#159447] tracking-wide sm:text-base">
                Standalone Energy Storage &amp; Backup
              </p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-widest text-[#4C5B73]">
                Solar Integration Available
              </p>
            </div>

            {/* Ultra-Modern Floating Animated Charging Battery Unit */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-32 w-16 shrink-0 flex-col-reverse gap-1.5 rounded-2xl border-2 border-[#073B73] bg-white p-2 shadow-xl backdrop-blur-xl"
            >
              <span className="absolute -top-3 left-1/2 h-2.5 w-7 -translate-x-1/2 rounded-t-md bg-[#073B73]" />
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.4, 1, 1, 0.4], scaleY: [0.95, 1, 1, 0.95] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                  className="flex-1 rounded-md bg-gradient-to-t from-[#159447] via-[#22C55E] to-[#4ADE80] shadow-[0_0_12px_rgba(21,148,71,0.6)]"
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-black text-[#073B73] drop-shadow-sm bg-white/95 px-1.5 py-0.5 rounded-md border border-[#073B73]/10">100%</span>
              </div>
            </motion.div>
          </div>

          <p className="mt-7 text-sm sm:text-base leading-relaxed text-[#4C5B73] font-medium">
            Solar is not compulsory. PuREPower can be supplied on its own, and integrated with solar wherever
            required. Suitable for:
          </p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-7 grid gap-3.5 sm:grid-cols-2"
          >
            {audiences.map((a) => (
              <motion.li
                key={a}
                variants={{
                  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
                  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } },
                }}
                whileHover={{ scale: 1.03, x: 3 }}
                className="flex items-center gap-3 rounded-2xl bg-white p-3.5 border border-[#159447]/15 shadow-xs transition-all duration-300 hover:border-[#159447] hover:shadow-md hover:bg-[#EEF7F2]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#159447] text-white shadow-[0_0_10px_rgba(21,148,71,0.4)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-bold text-[#073B73]">{a}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-11 pt-6 border-t border-[#073B73]/15 flex items-center justify-between">
            <Btn to="/purepower" variant="green">
              Explore PuREPower BESS
            </Btn>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F4EC] border border-[#159447]/30 transition-all duration-300 group-hover:bg-[#159447] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(21,148,71,0.5)]"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </div>
        </motion.article>

      </div>
    </div>
  </section>
);

export default TwoVerticals;