import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BadgeCheck } from 'lucide-react';

import EnquiryForm from './EnquiryForm';

const ProductDetailsModal = ({ product, onClose }) => {
  const [activeColor, setActiveColor] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    const scrollY = window.scrollY;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    // Lock background page at the exact current scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      // Remove scroll lock
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      // Restore exact previous page position
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1c1a15]/60 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-xl bg-[#F8FBFA] border border-[#159447]/30 shadow-[0_50px_120px_-30px_rgba(28,26,21,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center rounded-full bg-slate-100/80 text-[#7A7266] transition-colors hover:text-[#C9A24B] hover:bg-slate-200 cursor-pointer"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <div className="px-6 pt-8 md:px-14 md:pt-12">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span className="h-px w-16 bg-[#159447]/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#159447]">
                {product.name}
              </span>
              <span className="h-px w-16 bg-[#159447]/50" />
            </motion.div>
          </div>

          {/* ── PRODUCT HERO CONTAINER ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-14 px-6 pb-8 md:px-14 md:pb-10">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]"
            >
              <img
                src={product.image}
                alt={`${product.name} ${product.value}`}
                className="relative z-10 max-h-[400px] w-auto max-w-full object-contain"
              />
            </motion.div>

            {/* Product Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-col justify-center md:border-l md:border-[#DDE7E2] md:pl-12"
            >
              <h2 className="text-[2.4rem] md:text-[2.6rem] leading-[1.08] font-semibold tracking-tight text-[#123A67]">
                {product.name} {product.value}
              </h2>

              <h3 className="text-[14px] md:text-[15px] font-normal text-[#9C9280] italic mt-2">
                {product.type}
              </h3>

              {product.about && (
                <p className="text-[13.5px] md:text-[14px] text-[#526B80] leading-[1.8] mt-5">
                  {product.about}
                </p>
              )}

              {/* Colour swatches */}
              {product.colors?.length > 0 && (
                <div className="flex items-center gap-3 mt-7">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#718096] mr-1">
                    Finish
                  </span>

                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(i)}
                      aria-label={`Colour option ${c.name}`}
                      className={`h-6 w-6 rounded-full ring-1 ring-offset-2 ring-offset-[#FDFBF6] transition-all ${
                        activeColor === i
                          ? 'ring-[#159447]'
                          : 'ring-[#C9D8D0]'
                      }`}
                    >
                      <span className={`block w-full h-full rounded-full ${c.class}`} />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 mt-3.5 text-[#9C9280] text-[11px]">
                <BadgeCheck size={14} className="text-[#159447]" />
                Certified Authorised Distributor
              </div>

              <motion.button
                type="button"
                onClick={() => setShowEnquiryForm(true)}
                whileHover={{ letterSpacing: '0.12em' }}
                transition={{ duration: 0.25 }}
                className="mt-8 inline-flex w-fit items-center gap-2 border border-[#159447] px-8 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#159447] hover:bg-[#159447] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Enquiry Now
                <ChevronRight size={13} />
              </motion.button>
            </motion.div>
          </div>

          {/* ── 4 KEY SPECS ROW (PLACED LOWER DOWN WITH CLEAN BORDER) ── */}
          {product.keySpecs?.length > 0 && (
            <div className="px-6 md:px-14 pt-4 pb-12">
              <div className="border border-[#DDE7E2] rounded-lg overflow-hidden bg-white shadow-xs">
                {/* 1. TOP LABELS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#F8FAFC] border-b border-[#DDE7E2]">
                  {product.keySpecs.slice(0, 4).map((spec, index) => (
                    <div
                      key={`label-${spec.label}`}
                      className={`px-4 py-3 text-center ${
                        index !== 3 ? 'border-r border-[#DDE7E2]' : ''
                      }`}
                    >
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#9C9280]">
                        {spec.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 2. BOTTOM VALUES ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 bg-white">
                  {product.keySpecs.slice(0, 4).map((spec, index) => (
                    <div
                      key={`val-${spec.label}`}
                      className={`px-4 py-4 sm:py-5 text-center flex items-center justify-center ${
                        index !== 3 ? 'border-r border-[#DDE7E2]' : ''
                      }`}
                    >
                      <p className="text-[16px] md:text-[18px] font-black tracking-tight text-[#123A67]">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TECHNICAL DOSSIER ── */}
          {product.specSections && (
            <>
              <div className="px-6 md:px-14 pb-6 border-t border-[#DDE7E2]/70 pt-8">
                <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#159447] mb-2 font-semibold">
                  Technical Dossier
                </p>

                <h3 className="text-center text-xl md:text-[1.6rem] font-semibold tracking-tight text-[#1c1a15]">
                  {product.name} {product.value} Specifications
                </h3>
              </div>

              <div className="px-6 md:px-14 pb-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
                  {Object.values(product.specSections).map((section, gi) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.04 * gi,
                      }}
                    >
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#159447] min-h-[41px] flex items-end mb-4 pb-2 border-b border-[#DDE7E2]">
                        {section.title}
                      </h4>

                      <dl className="space-y-3">
                        {section.items.map((row) => (
                          <div key={row.label}>
                            <dt className="text-[10.5px] text-[#9C9280] leading-snug">
                              {row.label}
                            </dt>
                            <dd className="text-[13px] font-medium text-[#2C2A22] mt-0.5">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── MECHANICAL DATA ── */}
          {product.mechanicalData?.length > 0 && (
            <div className="px-6 md:px-14 pb-14 border-t border-[#DDE7E2]/60 pt-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#159447] mb-5 font-semibold">
                Mechanical & General Data
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                {product.mechanicalData.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[#DDE7E2] pb-2.5 text-[13px]"
                  >
                    <span className="text-[#9C9280]">{row.label}</span>
                    <span className="text-right font-medium text-[#2C2A22]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FOOTER ── */}
          <div className="border-t border-[#DDE7E2] px-6 md:px-14 py-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/70">
            <p className="text-[13px] text-[#9C9280] italic">
              Talk to our energy consultants for site-specific sizing and pricing.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-7 py-2.5 border border-[#C9D8D0] text-[#123A67] text-[12px] font-medium uppercase tracking-[0.08em] hover:bg-[#EAF5EE] transition-colors duration-300 cursor-pointer rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enquiry Form */}
      {showEnquiryForm && (
        <EnquiryForm
          product={product}
          onClose={() => setShowEnquiryForm(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;