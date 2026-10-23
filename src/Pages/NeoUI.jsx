import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ImageIcon,
  Layers,
  Eye,
  BatteryCharging,
  ClipboardCheck,
  Wrench,
  Activity,
} from 'lucide-react';


export const WRAP = 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10';

export const CONTACT = {
  phoneDisplay: '+91 91500 55042',
  phoneHref: 'tel:+919150055042',
  whatsapp: '919150055042',
  email: 'info.neosolaris@gmail.com',
  address: '49, Thiruvalluvar Street, S.S. Colony 10th Street, Madurai - 625 016',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  // Place search link - idhu direct pin location-ah mattum open pannum:
  directions: 'https://www.google.com/maps/search/?api=1&query=Neo+Solaris+energy+systems+Madurai',
  mapEmbed: 'https://www.google.com/maps?q=9.9242533,78.0973488&z=17&output=embed',
};

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/* ---------- shared data ---------- */
export const SYSTEM_CHAIN = [
  'Solar Structure',
  'Solar Panels',
  'String Design',
  'DC Wiring',
  'DCDB & Protection',
  'Earthing',
  'PuREPower Hybrid BESS',
  'AC Protection',
  'Essential Loads',
  'Monitoring',
];

export const EXPERIENCE_CHAIN = [
  'Solar Structure',
  'Panel',
  'String',
  'DC Wiring',
  'DCDB',
  'Protection',
  'Earthing',
  'PuREPower BESS',
  'Grid',
  'Essential Loads',
];

export const STRENGTHS = [
  {
    icon: Layers,
    title: 'Complete Energy Solution Approach',
    text: 'Solar generation, protection, storage and loads planned together as one system.',
  },
  {
    icon: Eye,
    title: 'Live Experience Centre',
    text: 'A working setup in Madurai where you can see the system operate.',
  },
  {
    icon: BatteryCharging,
    title: 'PuREPower BESS Distribution',
    text: 'Authorised distributor supplying customers, EPC companies, installers and dealers.',
  },
  {
    icon: ClipboardCheck,
    title: 'Custom Energy Assessment',
    text: 'Systems sized from your actual load and requirement, not a fixed package.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation & Commissioning',
    text: 'Installation, testing and commissioning carried out by our technical team.',
  },
  {
    icon: Activity,
    title: 'Monitoring & After-Sales Support',
    text: 'System monitoring and support that continues after handover.',
  },
];

/* ---------- motion helpers ---------- */
export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const stagger = (gap = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ---------- live indicator ---------- */
export const LiveDot = ({ className = '' }) => (
  <span className={`relative flex h-2.5 w-2.5 shrink-0 ${className}`}>
    <motion.span
      className="absolute inline-flex h-full w-full rounded-full bg-[#159447]"
      animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
    />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#159447]" />
  </span>
);

/* ---------- section heading ---------- */
export const SectionHead = ({ tag, title, text, align = 'left', className = '' }) => (
  <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
    {tag && (
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#159447]/20 bg-[#EAF5EE] px-3.5 py-1 text-xs font-semibold text-[#12793B]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800]" />
        {tag}
      </span>
    )}
    <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-[#073B73] sm:text-4xl lg:text-[42px]">
      {title}
    </h2>
    {text && <p className="mt-4 text-[15px] leading-relaxed text-[#4C5B73] sm:text-base">{text}</p>}
  </Reveal>
);

/* ---------- buttons ---------- */
const btnBase =
  'group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer';

const btnStyles = {
  green:
    'bg-[#159447] text-white shadow-[0_12px_24px_-12px_rgba(21,148,71,0.75)] hover:-translate-y-0.5 hover:bg-[#12793B]',
  navy:
    'bg-[#073B73] text-white shadow-[0_12px_24px_-12px_rgba(7,59,115,0.7)] hover:-translate-y-0.5 hover:bg-[#0A1B3D]',
  gold:
    'bg-[#F5B800] text-[#0A1B3D] shadow-[0_12px_24px_-12px_rgba(245,184,0,0.8)] hover:-translate-y-0.5 hover:bg-[#E3A900]',
  outline:
    'border border-[#073B73]/20 bg-white text-[#073B73] hover:border-[#159447] hover:text-[#159447]',
  light:
    'border border-white/30 bg-white/5 text-white hover:bg-white/15',
};

export const Btn = ({
  to,
  href,
  onClick,
  variant = 'green',
  children,
  className = '',
  external = false,
  icon = true,
  type = 'button',
}) => {
  const cls = `${btnBase} ${btnStyles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
};

/* ---------- media slot: real photo / video, or a clean placeholder ---------- */
export const MediaFrame = ({
  src,
  video,
  alt = '',
  label = 'Actual Neo Solaris photo / video will be placed here',
  className = '',
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-[#073B73]/10 bg-gradient-to-br from-[#EAF5EE] via-white to-[#FFF7DB] ${className}`}
  >
    {video ? (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : src ? (
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#159447] shadow-md"
        >
          <ImageIcon className="h-5 w-5" />
        </motion.div>
        <span className="max-w-[220px] text-xs font-semibold leading-snug text-[#073B73]/60">
          {label}
        </span>
      </div>
    )}
  </div>
);

/* ---------- inner page hero (bright + clean) ---------- */
export const PageHero = ({ tag, title, text, children, media }) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-[#F3FAF5] via-white to-white pb-14 pt-28 sm:pb-20 sm:pt-36">
    <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F5B800]/10 blur-3xl" />
    <div className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-[#159447]/10 blur-3xl" />
    <div
      className={`${WRAP} relative grid items-center gap-10 ${
        media ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''
      }`}
    >
      <motion.div variants={stagger(0.12)} initial="hidden" animate="show">
        {tag && (
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#159447]/20 bg-[#EAF5EE] px-3.5 py-1 text-xs font-semibold text-[#12793B]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800]" />
            {tag}
          </motion.span>
        )}
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#073B73] sm:text-5xl lg:text-[56px]"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#4C5B73] sm:text-lg"
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {children}
          </motion.div>
        )}
      </motion.div>
      {media && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          {media}
        </motion.div>
      )}
    </div>
  </section>
);