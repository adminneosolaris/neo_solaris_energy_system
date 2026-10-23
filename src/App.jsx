import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Footer from './Pages/Footer';
import AboutPage from './Pages/AboutPage';
import ProductsShowcase from './Pages/ProductsShowcase';
import Solutions from './Pages/Solutions';
import Contact from './Pages/Contact';
import WhatsAppFloat from './Components/WhatsAppFloat';
import PurePowerBESS from './Pages/PurePowerBESS';

// ── Diamond shapes (relative to the fixed, viewport-sized overlay) ──
const DIAMOND_POINT = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
const DIAMOND_FULL = "polygon(50% -100%, 200% 50%, 50% 200%, -100% 50%)";

const EASE = [0.76, 0, 0.24, 1];

// ── CINEMATIC DIAMOND IRIS TRANSITION ──
const DiamondIrisTransition = ({ children }) => {
  return (
    <>
      {/* Layer 1: gold diamond */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none bg-gradient-to-br from-[#F5C84C] via-[#D4A017] to-[#8A6A0A]"
        initial={{ clipPath: DIAMOND_FULL }}
        animate={{
          clipPath: DIAMOND_POINT,
          // Duration and delay reduced for faster opening
          transition: { duration: 0.4, ease: EASE, delay: 0.05 },
        }}
        exit={{
          clipPath: DIAMOND_FULL,
          // Faster closing
          transition: { duration: 0.4, ease: EASE },
        }}
      />

      {/* Layer 2: navy diamond */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none bg-[#020F24] flex items-center justify-center"
        initial={{ clipPath: DIAMOND_FULL }}
        animate={{
          clipPath: DIAMOND_POINT,
          transition: { duration: 0.4, ease: EASE, delay: 0.1 },
        }}
        exit={{
          clipPath: DIAMOND_FULL,
          transition: { duration: 0.4, ease: EASE, delay: 0.05 },
        }}
      >
        {/* Center brand flash while screen is covered */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 1.15,
            transition: { duration: 0.25, delay: 0.1 },
          }}
          exit={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.25, delay: 0.2 },
          }}
        >
          <motion.span
            className="h-[2px] bg-gradient-to-r from-transparent via-[#F5C84C] to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 0 }}
            exit={{ width: 180, transition: { duration: 0.3, delay: 0.2 } }}
          />
          <span className="text-white text-xl md:text-3xl font-bold tracking-[0.35em] uppercase">
            Neo Solaris
          </span>
          <span className="text-[#F5C84C] text-[10px] md:text-xs tracking-[0.5em] uppercase">
            Energy Systems
          </span>
        </motion.div>
      </motion.div>

      {/* The actual page: fades + settles in MUCH faster now */}
      <motion.div
        className="relative w-full min-h-screen bg-[#020F24]"
        initial={{ opacity: 0, y: 30, scale: 0.985 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          // Reduced delay from 0.45 to 0.2 and duration to 0.5
          transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
        }}
        exit={{
          opacity: 0,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

const routes = [
  { path: '/', element: <Home /> },
  { path: '/purepower', element: <PurePowerBESS /> },
  { path: '/aboutPage', element: <AboutPage /> },
  { path: '/productShowcase', element: <ProductsShowcase /> },
  { path: '/solutions', element: <Solutions /> },
  { path: '/contact', element: <Contact /> },
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      // Scroll to top only AFTER old page is fully hidden behind the iris
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
    >
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<DiamondIrisTransition>{element}</DiamondIrisTransition>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppFloat />

      <div className="w-full min-h-screen bg-[#020F24] overflow-x-hidden">
        <AnimatedRoutes />
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;