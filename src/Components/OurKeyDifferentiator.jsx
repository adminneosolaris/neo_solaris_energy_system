import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sun, BatteryCharging, Activity } from 'lucide-react';
import { Btn, LiveDot, SectionHead } from '../Pages/NeoUI';

import videos from '../assets/Videos/HomePage video.mp4';

const demos = [
  { 
    icon: Sun, 
    title: 'Complete Solar + BESS', 
    text: 'Follow the system from structure to essential loads.' 
  },
  { 
    icon: BatteryCharging, 
    title: 'PuREPower BESS', 
    text: 'See the standalone unit operate, with or without solar.' 
  },
  { 
    icon: Activity, 
    title: 'Live monitoring', 
    text: 'Watch energy flow on the monitoring screen.' 
  },
];

/* ── Cinematic Staggered Depth & Liquid Focus Reveal ── */
const liquidDepthReveal = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95,
    rotateX: -12,
    filter: 'blur(8px)',
    transformPerspective: 1200,
  },
  visible: (custom = 0) => ({
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transformPerspective: 1200,
    transition: { 
      duration: 0.9, 
      delay: custom * 0.12, 
      ease: [0.16, 1, 0.3, 1],
    }
  }),
};

/* Stage Zoom & Portal Depth */
const portalStage = {
  hidden: { 
    opacity: 0,
    scale: 0.97,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 1.0, 
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

/* Cursor-follow spotlight */
const trackSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
};

const OurKeyDifferentiator = () => {
  const stageRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'center center'],
  });
  const stageScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F9F5] via-[#FFFFFF] to-[#F8FAFC] py-6 sm:py-10 text-[#073B73]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#073B73_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-36 top-16 h-[26rem] w-[26rem] rounded-full bg-[#159447]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-36 top-1/3 h-[24rem] w-[24rem] rounded-full bg-[#F5B800]/10 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ── Heading Row ── */}
        <div className="grid items-end gap-4 lg:grid-cols-[1fr_auto] lg:gap-10">
          <motion.div
            custom={0}
            variants={liquidDepthReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="max-w-3xl"
          >
            <SectionHead
              tag="Our key differentiator"
              title="Experience it live at Neo Solaris."
              text="At our Madurai office we have built a complete working Live Energy Experience Centre. See the actual installation, follow the energy flow and understand the system practically, instead of depending only on brochures."
            />
          </motion.div>

          <motion.div
            custom={1}
            variants={liquidDepthReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="flex flex-wrap gap-3 lg:pb-1"
          >
            <Btn to="/contact#visit" variant="outline">
              Plan your visit
            </Btn>
          </motion.div>
        </div>

        {/* ── Wide Video Stage (Increased Width + Controls Enabled) ── */}
        <div ref={stageRef} className="relative mx-auto mt-6 w-full max-w-[1360px] sm:mt-8">
          {/* Under-glow */}
          <div className="absolute inset-x-6 -bottom-4 h-14 rounded-full bg-gradient-to-r from-[#159447]/25 via-[#F5B800]/20 to-[#073B73]/20 blur-3xl pointer-events-none" />

          <motion.div
            style={reduce ? undefined : { scale: stageScale }}
            variants={portalStage}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="relative w-full overflow-hidden rounded-[20px] border border-slate-200/90 bg-white p-1.5 shadow-[0_20px_50px_-25px_rgba(7,59,115,0.18)] sm:rounded-[18px] sm:p-2"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-[15px] bg-slate-900 sm:rounded-[12px]">
              {/* Added 'controls' and 'controlsList' for video forward/backward & volume timeline */}
              <video
                src={videos}
                autoPlay
                loop
                muted
                playsInline
                controls
                controlsList="nodownload"
                className="h-full w-full object-cover object-top"
              />

              {/* Gentle Vignette (pointer-events-none is essential so click works on video controls) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

              {/* Live Badge (pointer-events-none ensures it doesn't block player controls) */}
              <div className="pointer-events-none absolute left-3.5 top-3.5 z-10 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-bold text-[#073B73] shadow-md backdrop-blur-md sm:left-4 sm:top-4">
                <LiveDot />
                Madurai · Working installation
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 3 Compact Cards (Matched with new width) ── */}
        <div className="mx-auto mt-6 grid max-w-[1360px] gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {demos.map((d, i) => (
            <motion.div
              key={d.title}
              custom={i + 1}
              variants={liquidDepthReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              onMouseMove={trackSpot}
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-[18px] border border-white/90 bg-white/90 p-3.5 shadow-[0_12px_28px_-15px_rgba(7,59,115,0.08)] ring-1 ring-[#073B73]/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_-15px_rgba(21,148,71,0.18)]"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(21,148,71,0.08), transparent 70%)',
                }}
              />

              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1DB95C] to-[#0E7A38] text-white shadow-sm shadow-[#159447]/25 ring-2 ring-white/80 transition-transform duration-300 group-hover:scale-105">
                <d.icon className="h-4 w-4" />
              </span>

              <div className="relative">
                <h4 className="text-sm font-bold text-[#073B73] transition-colors group-hover:text-[#159447]">
                  {d.title}
                </h4>
                <p className="mt-0.5 text-xs leading-snug text-[#4C5B73]">
                  {d.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurKeyDifferentiator;