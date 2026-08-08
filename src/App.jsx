import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import { ToastProvider } from './components/Toast';
import { StoreProvider } from './data/store';

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen text-white w-full max-w-md mx-auto sm:max-w-none"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><Landing /></motion.div>} />
        <Route path="/dashboard" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><Dashboard /></motion.div>} />
        <Route path="/day/:dayNumber" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><ChallengeDay /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <HashRouter>
          <div className="min-h-screen text-white antialiased w-full max-w-[390px] mx-auto sm:max-w-none shadow-2xl shadow-primary/5">
            <AnimatedRoutes />
          </div>
        </HashRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;

