import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const WHATSAPP_NUMBER = '919150055042';
const DEFAULT_MESSAGE =
  'Hi Neo Solaris, I would like to know more about your BESS / Solar energy solutions.';

const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 2500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[80] flex items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:block bg-white text-[#0a192f] text-sm font-medium px-4 py-2.5 rounded-full shadow-lg mb-1"
          >
            Chat with our energy experts
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Neo Solaris on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <svg
          viewBox="0 0 32 32"
          className="relative w-7 h-7 sm:w-8 sm:h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.902 6.48L4 29l7.72-1.865A11.94 11.94 0 0016.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7c-1.99 0-3.87-.55-5.47-1.5l-.39-.23-4.58 1.1 1.12-4.46-.25-.41A9.63 9.63 0 016.3 15c0-5.35 4.35-9.7 9.7-9.7 5.36 0 9.7 4.35 9.7 9.7 0 5.36-4.34 9.7-9.7 9.7zm5.34-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.45 0 1.44 1.05 2.83 1.19 3.03.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.35z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloat;