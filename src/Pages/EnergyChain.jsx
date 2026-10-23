import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, stagger } from './NeoUI';

/* A row of steps with a highlight that travels along the chain, like energy moving through the system. */
const EnergyChain = ({ items, dark = false, speed = 900, className = '' }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), speed);
    return () => clearInterval(id);
  }, [items.length, speed]);

  return (
    <motion.ol
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-wrap items-center gap-y-3 ${className}`}
    >
      {items.map((item, i) => (
        <React.Fragment key={`${item}-${i}`}>
          <motion.li
            variants={fadeUp}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-semibold transition-all duration-500 sm:text-sm ${
              active === i
                ? 'scale-105 border-[#159447] bg-[#159447] text-white shadow-[0_10px_20px_-10px_rgba(21,148,71,0.8)]'
                : dark
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-[#073B73]/15 bg-white text-[#073B73]'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                active === i ? 'bg-white text-[#159447]' : 'bg-[#F5B800] text-[#0A1B3D]'
              }`}
            >
              {i + 1}
            </span>
            {item}
          </motion.li>
          {i < items.length - 1 && (
            <ChevronRight className={`mx-1 h-4 w-4 shrink-0 ${dark ? 'text-[#F5B800]' : 'text-[#159447]'}`} />
          )}
        </React.Fragment>
      ))}
    </motion.ol>
  );
};

export default EnergyChain;