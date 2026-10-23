import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

import logo from '../assets/logo/energy systems.png';
import EnquiryModal from './EnquiryForm/EnquiryModal';
import { CONTACT } from '../Pages/NeoUI';

// Live status indicator
const SafeLiveDot = () => (
  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#159447] opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#159447]" />
  </span>
);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/aboutPage' },
  { label: 'PuREPower BESS', href: '/purepower' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/productShowcase' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  // Hover effect tracking
  const [hoveredNav, setHoveredNav] = useState(null);

  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and show navbar after route changes
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.header
        className={`w-full z-50 bg-white ${
          scroll
            ? "fixed top-0 left-0 bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-slideDown"
            : "relative"
        }`}
      >
        <div className="w-full">
          {/* Top accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#159447] via-[#F5B800] to-[#159447]" />

          <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:h-[76px] lg:px-10">
            {/* LOGO */}
            <Link
              to="/"
              className="flex shrink-0 items-center"
              aria-label="Neo Solaris home"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                src={logo}
                alt="NEO SOLARIS"
                className="h-10 object-contain md:h-[52px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION WITH FLOATING BOTTOM LINE */}
            <nav 
              className="hidden items-center gap-1 xl:flex relative h-full"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isUnderlined = hoveredNav ? hoveredNav === link.href : active;

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    className={`relative flex items-center gap-2 px-4 py-2 text-[14px] font-semibold transition-colors duration-200 ${
                      active || hoveredNav === link.href
                        ? 'text-[#159447]'
                        : 'text-[#073B73] hover:text-[#159447]'
                    }`}
                  >
                    {link.live && <SafeLiveDot />}
                    {link.label}

                    {isUnderlined && (
                      <motion.span
                        layoutId="nav-bottom-line"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-x-2 -bottom-[21px] lg:-bottom-[20px] h-[3.5px] rounded-t-full bg-gradient-to-r from-[#159447] via-[#22c55e] to-[#F5B800] shadow-[0_-2px_10px_rgba(21,148,71,0.5)] z-20"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center gap-3">
              {/* Desktop phone number */}
              <a
                href={CONTACT.phoneHref}
                className="hidden items-center gap-2 text-sm font-bold text-[#073B73] transition-colors hover:text-[#159447] 2xl:flex"
              >
                <Phone className="h-4 w-4 text-[#159447]" />
                {CONTACT.phoneDisplay}
              </a>

              {/* Desktop enquiry button */}
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsEnquiryOpen(true)}
                className="hidden cursor-pointer rounded-lg bg-[#159447] px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_10px_20px_-10px_rgba(21,148,71,0.8)] transition-colors hover:bg-[#12793B] sm:inline-flex"
              >
                Enquire Now
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[#073B73] text-white transition-transform active:scale-90 xl:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[#0A1B3D]/50 backdrop-blur-sm xl:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[70] h-screen w-[85%] max-w-[360px] overflow-y-auto bg-white shadow-2xl xl:hidden"
            >
              {/* Accent line */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#159447] via-[#F5B800] to-[#159447]" />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <img
                  src={logo}
                  alt="NEO SOLARIS"
                  className="h-10 object-contain"
                />

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#EAF5EE] text-[#073B73]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer navigation links */}
              <div className="flex flex-col gap-2.5 px-5 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.04,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-[15px] font-bold transition-colors ${
                        isActive(link.href)
                          ? 'border-[#159447] bg-[#EAF5EE] text-[#159447]'
                          : 'border-[#073B73]/10 text-[#073B73] hover:border-[#159447]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {link.live && <SafeLiveDot />}
                        {link.label}
                      </span>

                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile enquiry button */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsEnquiryOpen(true);
                  }}
                  className="mt-2 cursor-pointer rounded-xl bg-[#159447] py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#12793B]"
                >
                  Enquire Now
                </button>

                {/* Mobile phone details */}
                <a
                  href={CONTACT.phoneHref}
                  className="mt-2 flex items-center gap-3 rounded-xl border border-[#073B73]/10 px-4 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5B800] text-[#0A1B3D]">
                    <Phone className="h-4 w-4" />
                  </span>

                  <div>
                    <span className="block text-sm font-bold text-[#073B73]">
                      {CONTACT.phoneDisplay}
                    </span>

                    <span className="block text-[11px] text-[#4C5B73]">
                      {CONTACT.hours}
                    </span>
                  </div>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};

export default Navbar;