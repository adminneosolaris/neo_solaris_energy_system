import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logo from '../assets/logo/energy systems.png';
import { WRAP, CONTACT, ease } from './NeoUI';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/aboutPage' },
  { label: 'PuREPower BESS', to: '/purepower' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/productShowcase' },
  { label: 'Contact', to: '/contact' },
];

/* ---------- Brand glyphs (inline SVG) ---------- */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.4H7.5V13h2.8v8h3.2z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"
    />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <rect x="3.5" y="9" width="3.4" height="11.5" />
    <circle cx="5.2" cy="5.2" r="2" />
    <path d="M10 9h3.2v1.6c.6-1 1.8-1.9 3.6-1.9 3.4 0 4.2 2.2 4.2 5.1v6.7h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v6H10z" />
  </svg>
);


const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61595665582935',
    icon: FacebookIcon,
    bg: 'bg-[#1877F2]',
    glow: 'hover:shadow-[#1877F2]/60',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/neo_solaris2026/',
    icon: InstagramIcon,
    bg: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
    glow: 'hover:shadow-[#d6249f]/60',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@adminneosolaris',
    icon: YoutubeIcon,
    bg: 'bg-[#FF0000]',
    glow: 'hover:shadow-[#FF0000]/60',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/neo-solaris-energy-system-6830a0442/',
    icon: LinkedinIcon,
    bg: 'bg-[#0A66C2]',
    glow: 'hover:shadow-[#0A66C2]/60',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const ColumnTitle = ({ children }) => (
  <p className="mb-6 flex items-center gap-3 text-sm font-bold tracking-wide text-[#F5B800]">
    <span className="h-1 w-6 rounded-full bg-gradient-to-r from-[#F5B800] via-amber-300 to-[#159447]" />
    {children}
  </p>
);

const Footer = () => (
  <footer className="relative overflow-hidden bg-gradient-to-b from-[#081F42] via-[#051630] to-[#020A17] text-white">
    {/* Premium Radiant Top Multi-Color Gradient Bar */}
    <div className="h-[3.5px] w-full bg-gradient-to-r from-[#159447] via-[#F5B800] to-[#38BDF8]" />

    {/* Ambient Mesh Glows */}
    <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#159447]/25 to-transparent blur-[120px]" />
    <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gradient-to-br from-[#F5B800]/15 to-transparent blur-[120px]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:26px_26px]" />
    
    {/* Giant Faint Wordmark */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-[2vw] select-none text-center text-[17vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.04)]"
    >
      NEO SOLARIS
    </span>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={` max-w-7xl mx-auto px-6 relative z-10 grid gap-10 md:gap-0 py-16 md:grid-cols-[1.1fr_0.6fr_1.3fr] lg:py-20`}
    >
      {/* ── Brand ── */}
      <motion.div variants={item}>
        <span className="inline-block rounded-2xl bg-white/95 p-3.5 shadow-2xl shadow-black/40 ring-1 ring-white/30 backdrop-blur-md">
          <img src={logo} alt="NEO SOLARIS" className="h-12 object-contain" />
        </span>
        
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-300/90 font-normal">
          Complete Solar + Energy Storage Solutions and authorised PuREPower BESS supply. Experience it live at
          Neo Solaris.
        </p>

        {/* Social Icons with Radiant Hover */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">Follow us</p>
          <ul className="flex flex-wrap items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-black/40 ring-1 ring-white/20 transition-all duration-300 hover:ring-white/50 ${s.bg} ${s.glow}`}
                >
                  <s.icon className="h-5 w-5" />
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Explore ── */}
      <motion.nav variants={item}>
        <ColumnTitle>Explore</ColumnTitle>
        <ul className="space-y-3.5">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group inline-flex items-center gap-0 text-sm font-medium text-slate-300 transition-all duration-300 hover:gap-3 hover:text-white"
              >
                <span className="h-px w-0 bg-gradient-to-r from-[#F5B800] to-emerald-400 transition-all duration-300 group-hover:w-5" />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* ── VISIT US (Premium Gradient 2x2 Bento Cards) ── */}
      <motion.div variants={item}>
        <ColumnTitle>Visit us</ColumnTitle>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {/* 1. Address Card (Emerald Gradient Glass) */}
          <div className="group relative overflow-hidden rounded-[26px] border border-emerald-500/25 bg-gradient-to-br from-[#0B3528]/80 via-[#062118]/85 to-[#03120D]/90 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-[0_20px_45px_-10px_rgba(21,148,71,0.4)]">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#159447] via-emerald-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
            
            {/* Watermark Icon */}
            <MapPin
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 text-emerald-400/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-emerald-400/20"
            />
            
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 text-emerald-400 ring-1 ring-emerald-400/30 shadow-inner">
              <MapPin className="h-5 w-5" />
            </span>
            
            <p className="relative z-10 text-[13px] font-medium leading-relaxed text-emerald-100/90">
              {CONTACT.address}
            </p>
          </div>

          {/* 2. Phone Card (Amber Gold Gradient Glass) */}
          <div className="group relative overflow-hidden rounded-[26px] border border-amber-500/25 bg-gradient-to-br from-[#382606]/80 via-[#241702]/85 to-[#120B00]/90 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_20px_45px_-10px_rgba(245,184,0,0.35)]">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F5B800] via-amber-300 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
            
            {/* Watermark Icon */}
            <Phone
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 text-amber-400/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-amber-400/20"
            />
            
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 text-amber-400 ring-1 ring-amber-400/30 shadow-inner">
              <Phone className="h-5 w-5" />
            </span>
            
            <div className="relative z-10">
              <a
                href={CONTACT.phoneHref}
                className="text-[14.5px] font-bold text-amber-200 transition-colors hover:text-white"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          {/* 3. Email Card (Deep Sapphire / Sky Gradient Glass) */}
          <div className="group relative overflow-hidden rounded-[26px] border border-sky-500/25 bg-gradient-to-br from-[#0A2744]/80 via-[#06182D]/85 to-[#020B17]/90 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-sky-400/60 hover:shadow-[0_20px_45px_-10px_rgba(56,189,248,0.35)]">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
            
            {/* Watermark Icon */}
            <Mail
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 text-sky-400/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-sky-400/20"
            />
            
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/10 text-sky-400 ring-1 ring-sky-400/30 shadow-inner">
              <Mail className="h-5 w-5" />
            </span>
            
            <div className="relative z-10">
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all text-[13px] font-bold text-sky-200 transition-colors hover:text-white"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* 4. Hours Card (Deep Midnight Frosted Gradient Glass) */}
          <div className="group relative overflow-hidden rounded-[26px] border border-slate-500/25 bg-gradient-to-br from-[#1E293B]/70 via-[#0F172A]/85 to-[#020617]/95 p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-slate-400/50 hover:shadow-[0_20px_45px_-10px_rgba(148,163,184,0.25)]">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-400 via-slate-300 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
            
            {/* Watermark Icon */}
            <Clock
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 text-slate-400/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-slate-400/20"
            />
            
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-400/20 to-slate-600/10 text-slate-300 ring-1 ring-slate-400/30 shadow-inner">
              <Clock className="h-5 w-5" />
            </span>
            
            <p className="relative z-10 text-[13px] font-semibold text-slate-200">
              {CONTACT.hours}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* ── Bottom Bar (with Company Credits as in Screenshot) ── */}
    <div className="relative z-10 border-t border-white/10 bg-slate-950/40 py-5 text-xs text-white/70 backdrop-blur-md">
      <div className={`${WRAP} flex flex-col items-center justify-between gap-3 sm:flex-row text-center sm:text-left`}>
        <p>© {new Date().getFullYear()} Neo Solaris Energy Systems. All rights reserved.</p>
        <p className="text-[12px] text-white/60">
          Designed &amp; Developed by{' '}
          <a 
            href='https://techvoicesolutions.com/'
            target='_blank'
            rel='noopener noreferrer' 
            className="font-bold text-[#F5B800] transition-colors hover:text-white">
            TechVoice Solutions
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;