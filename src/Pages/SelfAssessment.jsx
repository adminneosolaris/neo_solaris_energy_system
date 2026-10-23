import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, BatteryCharging, PlugZap, Users, HelpCircle, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Btn, SectionHead, WRAP, waLink } from './NeoUI';

export const NEEDS = [
  { id: 'complete', icon: Sun, title: 'Complete Solar + PuREPower Energy Solution(BESS)', hint: 'Solar generation, storage and backup designed together' },
  { id: 'purepower', icon: BatteryCharging, title: 'PuREPower BESS / Backup Solution', hint: 'Standalone energy storage. Solar is not required' },
  { id: 'existing', icon: PlugZap, title: 'I Already Have Solar – Need Energy Storage', hint: 'Add storage to your existing solar system' },
  { id: 'partner', icon: Users, title: 'EPC / Dealer / Solar Installer Enquiry', hint: 'Supply and partnership enquiries' },
  { id: 'unsure', icon: HelpCircle, title: 'Not Sure – Help Me Understand My Requirement', hint: 'Answer a few simple questions and we will guide you' },
];

// k = key, l = label, o = options (chips), t = 'number' | 'text' (free input), p = placeholder
const QUESTIONS = {
  complete: [
    { k: 'Property', l: 'Where will it be installed?', o: ['Home', 'Commercial', 'Industrial'] },
    { k: 'Monthly usage (kWh)', l: 'Approximate monthly electricity usage (kWh)', t: 'number', p: 'e.g. 450' },
    { k: 'Main goal', l: 'What matters most to you?', o: ['Lower electricity bill', 'Backup during power cuts', 'Both', 'Not sure'] },
    { k: 'Space', l: 'Space available for solar', o: ['Rooftop', 'Open ground', 'Not sure'] },
  ],
  purepower: [
    { k: 'Use', l: 'Where will it be used?', o: ['Home', 'Shop / Office', 'Industry', 'Other'] },
    { k: 'Backup for', l: 'What would you like to keep running?', o: ['Lights & fans', 'Lights, fans & AC', 'Lights, fans & Computer', 'Machines / equipment', 'Not sure'] },
    { k: 'Solar', l: 'Do you plan to add solar?', o: ['Yes, now', 'Maybe later', 'No'] },
  ],
  existing: [
    { k: 'Solar size (kW)', l: 'Existing solar capacity (kW)', t: 'number', p: 'e.g. 5' },
    { k: 'Solar type', l: 'Type of existing solar system', o: ['On-grid', 'Hybrid', 'Off-grid', 'Not sure'] },
    { k: 'Storage need', l: 'Why do you need storage?', o: ['Backup during power cuts', 'Use solar power at night', 'Both'] },
  ],
  partner: [
    { k: 'Company type', l: 'You are a', o: ['EPC company', 'Dealer / channel partner', 'Solar installer', 'Other'] },
    { k: 'Interest', l: 'What are you looking for?', o: ['Product supply', 'Dealership', 'Technical support', 'Visit the Experience Centre'] },
    { k: 'Region', l: 'City / region you operate in', t: 'text', p: 'e.g. Madurai' },
  ],
  unsure: [
    { k: 'Challenge', l: 'What are you facing today?', o: ['Frequent power cuts', 'High electricity bill', 'Dependence on diesel generator', 'Planning a new building', 'Something else'] },
    { k: 'Property', l: 'Property type', o: ['Home', 'Commercial', 'Industrial'] },
  ],
};

const PHONE_RE = /^\+?[0-9\s()-]{7,16}$/;

const inputCls =
  'w-full rounded-lg border border-[#073B73]/15 bg-white px-4 py-3 text-sm font-medium text-[#073B73] outline-none transition-colors placeholder:font-normal placeholder:text-[#4C5B73]/60 focus:border-[#159447]';

const SelfAssessment = ({ initialNeed = null, className = '' }) => {
  const [need, setNeed] = useState(initialNeed);
  const [ans, setAns] = useState({});
  const [contact, setContact] = useState({ name: '', phone: '', city: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (initialNeed) {
      setNeed(initialNeed);
      setAns({});
    }
  }, [initialNeed]);

  const current = NEEDS.find((n) => n.id === need);

  const buildMessage = () => {
    const lines = [`Hi Neo Solaris, I would like help with: ${current.title}`];
    QUESTIONS[need].forEach((q) => {
      if (ans[q.k]) lines.push(`${q.k}: ${ans[q.k]}`);
    });
    lines.push(`Name: ${contact.name}`, `Phone: ${contact.phone}`);
    if (contact.city) lines.push(`City: ${contact.city}`);
    return lines.join('\n');
  };

  const submit = () => {
    const e = {};

    // 1. Validate all dynamic assessment questions for the selected need
    if (need && QUESTIONS[need]) {
      QUESTIONS[need].forEach((q) => {
        if (!ans[q.k] || (typeof ans[q.k] === 'string' && !ans[q.k].trim())) {
          e[q.k] = 'Please select or enter an answer for this question';
        }
      });
    }

    // 2. Validate contact details
    if (!contact.name.trim()) e.name = 'Please enter your name.';
    if (!contact.phone.trim()) e.phone = 'Phone number is required.';
    else if (!PHONE_RE.test(contact.phone.trim())) e.phone = 'Enter a valid phone number.';
    setErrors(e);

    // 3. If no errors, proceed to WhatsApp redirection & success screen
    if (Object.keys(e).length === 0) {
      setLoading(true);

      setTimeout(() => {
        // Build WhatsApp message and open automatically
        const message = buildMessage();
        const businessWhatsApp = '919150055042'
        const whatsappURL =  `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`

        window.open(whatsappURL, '_blank');
        setLoading(false)
        setDone(true);
      }, 1000)
    }
  };

  const reset = () => {
    setNeed(null);
    setAns({});
    setContact({ name: '', phone: '', city: '' });
    setErrors({});
    setLoading(false)
    setDone(false);
  };

  const step = done ? 'done' : need ? 'questions' : 'need';

  return (
    <div
      className={`rounded-3xl border border-[#073B73]/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(7,59,115,0.35)] sm:p-8 ${className}`}
    >
      <AnimatePresence mode="wait">
        {/* STEP 1 — what are you looking for */}
        {step === 'need' && (
          <motion.div
            key="need"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-xs font-semibold text-[#159447]">Step 1 of 2</p>
            <h3 className="mt-1 text-2xl font-bold text-[#073B73]">What are you looking for?</h3>
            <p className="mt-1.5 text-sm text-[#4C5B73]">
              Pick the closest option. You do not need to know technical terms like on-grid, off-grid or hybrid.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {NEEDS.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setNeed(n.id)}
                  className={`group flex cursor-pointer items-start gap-3.5 rounded-2xl border border-[#073B73]/10 bg-white p-4 text-left transition-colors hover:border-[#159447] hover:bg-[#F3FAF5] ${
                    i === NEEDS.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#159447] transition-colors group-hover:bg-[#159447] group-hover:text-white">
                    <n.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold leading-snug text-[#073B73]">{n.title}</span>
                    <span className="mt-0.5 block text-xs text-[#4C5B73]">{n.hint}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2 — questions change with the selection */}
        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <button
              onClick={() => setNeed(null)}
              className="mb-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#159447] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Change selection
            </button>
            <p className="text-xs font-semibold text-[#159447]">Step 2 of 2</p>
            <h3 className="mt-1 text-xl font-bold text-[#073B73] sm:text-2xl">{current.title}</h3>

            <div className="mt-6 space-y-6">
              {QUESTIONS[need].map((q) => (
                <div key={q.k}>
                  <p className="mb-2.5 text-sm font-bold text-[#073B73]">{q.l}</p>
                  {q.o ? (
                    <div className="flex flex-wrap gap-2">
                      {q.o.map((opt) => (
                        <motion.button
                          key={opt}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAns((a) => ({ ...a, [q.k]: opt }))}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                            ans[q.k] === opt
                              ? 'border-[#159447] bg-[#159447] text-white'
                              : 'border-[#073B73]/15 text-[#073B73] hover:border-[#159447]'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={q.t}
                      min={q.t === 'number' ? 0 : undefined}
                      placeholder={q.p}
                      value={ans[q.k] || ''}
                      onChange={(e) => setAns((a) => ({ ...a, [q.k]: e.target.value }))}
                      className={inputCls}
                    />
                  )}
                </div>
              ))}

              <div className="grid gap-4 border-t border-[#073B73]/10 pt-6 sm:grid-cols-3">
                <div>
                  <input
                    placeholder="Your name"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    className={`${inputCls} ${errors.name ? 'border-rose-400' : ''}`}
                  />
                  {errors.name && (
                    <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    className={`${inputCls} ${errors.phone ? 'border-rose-400' : ''}`}
                  />
                  {errors.phone && (
                    <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
                    </span>
                  )}
                </div>
                <input
                  placeholder="City (optional)"
                  value={contact.city}
                  onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))}
                  className={inputCls}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Btn onClick={submit} variant="green" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting to WhatsApp...
                    </span>
                  ) : (
                    'Send my requirement'
                  )}
                </Btn>
                <p className="max-w-xs text-xs leading-relaxed text-[#4C5B73]">
                  This helps us understand your requirement. It is not a quotation request.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* DONE */}
        {step === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="py-6 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#159447] text-white"
            >
              <Check className="h-7 w-7" strokeWidth={3} />
            </motion.span>
            <h3 className="mt-5 text-2xl font-bold text-[#073B73]">Thank you, {contact.name}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4C5B73]">
              We have your requirement. Our team will contact you to help you understand the right solution. You
              can also continue on WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Btn href={waLink(buildMessage())} external variant="green">
                Continue on WhatsApp
              </Btn>
              <Btn onClick={reset} variant="outline" icon={false}>
                Start again
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SelfAssessmentSection = () => (
  <section className="bg-[#F3FAF5] py-16 sm:py-24">
    <div className={WRAP}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            tag="Understand your requirement"
            title="Not sure where to start? Tell us what you need."
            text="Answer a few simple questions. The aim is to help you understand your requirement before any purchase decision, not to push a quotation."
          />
        </div>
        <SelfAssessment />
      </div>
    </div>
  </section>
);

export default SelfAssessment;