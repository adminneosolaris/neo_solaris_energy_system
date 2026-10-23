import React, { useState, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/logo/energy systems.png";

const INTEREST_OPTIONS = [
  "Residential Solar System",
  "Commercial Solar System",
  "PUREPower Energy Storage (BESS)",
  "Solar + Battery Backup",
  "Maintenance / AMC",
  "Other",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
};

// Smooth Spring Animations
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 340,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    filter: "blur(2px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const Field = forwardRef(function Field(
  { label, name, error, ...inputProps },
  ref
) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/40 ${
          error ? "border-red-400" : "border-slate-300 focus:border-amber-500"
        }`}
        {...inputProps}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default function EnquiryModal({ isOpen, onClose, onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const firstFieldRef = useRef(null);

  // Lock background scroll + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 150);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen]);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";

    if (!form.phone.trim()) {
      next.phone = "Please enter a phone number";
    } else {
      // Clean phone number for validation (removes spaces, dashes, brackets)
      const cleanPhone = form.phone.replace(/[\s\-()]/g, "");
      if (!/^[+]?[\d]{8,15}$/.test(cleanPhone)) {
        next.phone = "Enter a valid phone number";
      }
    }
   
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";
    if (!form.interest) next.interest = "Please select what you need";
    return next;
  };

  // Build WhatsApp message format
  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Website Enquiry - Neo Solaris*`,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email || 'N/A'}`,
      `*Interest:* ${form.interest}`,
      `*Message:* ${form.message || 'No additional message'}`
    ];
    return lines.join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    onSubmitted?.(form);

    setTimeout(() => {
      // WhatsApp Integration Redirect
      const message = buildWhatsAppMessage();
      const businessWhatsApp = '919150055042';
      const whatsappURL = `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, '_blank');
      setStatus("success");
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-8"
        >
          {/* Backdrop with Fade Animation */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm"
          />

          {/* Modal Container with Smooth Spring Reveal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
          >
            {/* Top accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-green-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="absolute right-4 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:scale-105 hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Left panel */}
              <div className="relative col-span-2 hidden flex-col justify-between bg-slate-900 p-8 md:flex">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
                <div className="relative">
                  <div className="inline-block rounded-xl bg-white/95 p-3 shadow-md border border-white/20">
                    <img
                      src={logo}
                      alt="Neo Solaris"
                      className="h-10 w-auto object-contain"
                    />
                  </div>

                  <h2 className="mt-8 text-2xl font-semibold leading-snug text-white">
                    Let&apos;s plan your switch to solar.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Share a few details and our energy consultants will get back
                    to you with a system recommendation and pricing suited to
                    your site.
                  </p>
                </div>

                <ul className="relative mt-10 space-y-4">
                  {[
                    "Free site assessment",
                    "Response within 24 hours",
                    "Backed by PUREPower BESS technology",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-200"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right panel — form */}
              <div className="col-span-3 max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                      Enquiry received & WhatsApp opened!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-slate-500">
                      Thanks, {form.name.split(" ")[0]}. Your details have been formatted and sent to WhatsApp.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3
                      id="enquiry-modal-title"
                      className="text-xl font-semibold text-slate-900"
                    >
                      Enquiry Form
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Fill in your details below — it takes less than a minute.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                          ref={firstFieldRef}
                          label="Full name"
                          name="name"
                          placeholder="Enter Your Name"
                          value={form.name}
                          onChange={updateField("name")}
                          error={errors.name}
                        />
                        <Field
                          label="Phone number"
                          name="phone"
                          type="tel"
                          placeholder="+91 00000 00000"
                          value={form.phone}
                          onChange={updateField("phone")}
                          error={errors.phone}
                        />
                      </div>

                      <Field
                        label="Email (optional)"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={updateField("email")}
                        error={errors.email}
                      />

                      <div>
                        <label
                          htmlFor="interest"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          What are you looking for?
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={form.interest}
                          onChange={updateField("interest")}
                          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-amber-500/40 ${
                            errors.interest
                              ? "border-red-400"
                              : "border-slate-300 focus:border-amber-500"
                          }`}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {INTEREST_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.interest && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.interest}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Message (optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your site, monthly usage, or any questions"
                          value={form.message}
                          onChange={updateField("message")}
                          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm shadow-amber-500/30 transition hover:bg-amber-400 active:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                      >
                        {status === "submitting" ? (
                          <>
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="opacity-25"
                              />
                              <path
                                d="M21 12a9 9 0 0 0-9-9"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="opacity-75"
                              />
                            </svg>
                            Connecting to WhatsApp...
                          </>
                        ) : (
                          "Submit Enquiry"
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400">
                        By submitting, you agree to be contacted by Neo Solaris
                        regarding your enquiry.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

