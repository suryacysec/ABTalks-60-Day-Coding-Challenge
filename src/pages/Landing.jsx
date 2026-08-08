import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Terminal, Globe, Zap, Bot, Shield, ChevronDown, X, User, GraduationCap, BookOpen } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useStore } from '../data/store';
import { leaderboard } from '../data/mock';

const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// Animated counter hook
function useAnimatedCounter(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (started.current) return;
    started.current = true;

    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.floor((currentStep / steps) * end));
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration, inView, startOnView]);

  return { count, ref };
}

// Typing effect component
function TypingText({ texts, className }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));
        if (displayText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? 'rgba(124, 58, 237, 0.4)'
              : p.id % 3 === 1
              ? 'rgba(59, 130, 246, 0.3)'
              : 'rgba(16, 185, 129, 0.25)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Landing() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { hasProfile, setProfile } = useStore();
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', college: '', branch: '', track: 'Cybersecurity' });

  const heroCounter = useAnimatedCounter(2400, 2000, false);
  const daysCounter = useAnimatedCounter(60, 1500);
  const tracksCounter = useAnimatedCounter(4, 1000);
  const studentsCounter = useAnimatedCounter(2400, 2000);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter an email address', 'error');
      return;
    }
    addToast("You're in! Check your email.", 'success');
    setEmail('');
  };

  const tracks = [
    { icon: <Shield size={24} className="text-primary" />, name: "Cybersecurity", tag: "Defend networks & find vulnerabilities", count: "482", gradient: "from-primary/20 to-primary/5" },
    { icon: <Globe size={24} className="text-secondary" />, name: "Web Development", tag: "Build modern, responsive apps", count: "890", gradient: "from-secondary/20 to-secondary/5" },
    { icon: <Zap size={24} className="text-success" />, name: "DSA & CP", tag: "Master algorithms & get placed", count: "650", gradient: "from-success/20 to-success/5" },
    { icon: <Bot size={24} className="text-purple-400" />, name: "AI/ML", tag: "Train models & build intelligent systems", count: "378", gradient: "from-purple-400/20 to-purple-400/5" }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-success z-50"
        style={{ width: `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
      />
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center px-6 overflow-hidden">
        <FloatingParticles />
        
        {/* Ambient light blobs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/15 rounded-full blur-[100px]" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        
        {/* Floating social proof badges */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-32 left-4 glass rounded-full px-4 py-2 text-xs flex items-center gap-2 opacity-70 hidden sm:flex animate-float"
        >
          <img src="https://ui-avatars.com/api/?name=Rahul+S&background=7C3AED&color=fff&size=24" alt="" className="w-6 h-6 rounded-full" />
          <span>Rahul S.</span> <span className="text-orange-400 font-semibold">45 🔥</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-40 right-4 glass rounded-full px-4 py-2 text-xs flex items-center gap-2 opacity-70 hidden sm:flex animate-float"
          style={{ animationDelay: '2s' }}
        >
          <img src="https://ui-avatars.com/api/?name=Priya+M&background=3B82F6&color=fff&size=24" alt="" className="w-6 h-6 rounded-full" />
          <span>Priya M.</span> <span className="text-orange-400 font-semibold">42 🔥</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute top-48 right-8 glass rounded-full px-4 py-2 text-xs flex items-center gap-2 opacity-50 hidden lg:flex animate-float"
          style={{ animationDelay: '4s' }}
        >
          <img src="https://ui-avatars.com/api/?name=Arjun+K&background=10B981&color=fff&size=24" alt="" className="w-6 h-6 rounded-full" />
          <span>Arjun K.</span> <span className="text-orange-400 font-semibold">40 🔥</span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="z-10 flex flex-col items-center text-center max-w-3xl mt-12 sm:mt-0"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="glass rounded-full px-5 py-2 mb-8 text-sm font-medium border-primary/30 text-gray-300 flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            🔥 Join {heroCounter.count.toLocaleString()}+ students building right now
          </motion.div>
          
          {/* Main headline */}
          <motion.h1 
            variants={item}
            className="text-5xl sm:text-7xl font-black tracking-tight mb-4 leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
              Build Every Day.
            </span>
            <br/>
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent glow-text">
              Get Hired.
            </span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div variants={item} className="mb-4 h-8">
            <TypingText 
              texts={["Master Cybersecurity", "Build Full-Stack Apps", "Crack DSA Interviews", "Train AI Models"]}
              className="text-lg font-medium text-primary-light"
            />
          </motion.div>
          
          <motion.p 
            variants={item}
            className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
          >
            60-day coding challenge for Indian college students. Commit daily, stay visible to recruiters.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row w-full gap-4 px-4 sm:px-0 sm:justify-center"
          >
            <button 
              onClick={() => hasProfile ? navigate('/dashboard') : setShowProfileModal(true)}
              className="btn-glass-primary py-4 px-8 flex items-center justify-center gap-2 text-lg group"
            >
              {hasProfile ? 'Go to Dashboard' : 'Start Your 60 Days'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="btn-glass-secondary py-4 px-8 text-lg"
            >
              See How It Works
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        id="how-it-works" 
        className="w-full py-24 px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <div className="section-divider"></div>
          <p className="text-gray-400 max-w-md mx-auto">Three simple steps to transform your coding journey</p>
        </div>
        <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x">
          {[
            { step: 1, title: "Pick Your Track", desc: "Web Dev, DSA, AI/ML, Cybersecurity — choose what excites you.", emoji: "🎯" },
            { step: 2, title: "Build Daily", desc: "Push a GitHub commit every day. Small wins compound.", emoji: "⚡" },
            { step: 3, title: "Stay Visible", desc: "Post on LinkedIn. Recruiters notice consistency.", emoji: "👁️" }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="glass-card-hover p-8 min-w-[280px] snap-center flex-1 relative"
            >
              <div className="text-4xl mb-5">{item.emoji}</div>
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4 text-sm">{item.step}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              {idx < 2 && <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3: TRACKS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-full py-10 px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">4 Specialized Tracks</h2>
          <div className="section-divider"></div>
          <p className="text-gray-400 max-w-md mx-auto">Choose your path and master it in 60 days</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tracks.map((track, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.02, y: -3 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`glass-card p-6 group hover:border-primary/40 transition-all duration-300 bg-gradient-to-br ${track.gradient} relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-[40px] group-hover:bg-white/[0.05] transition-all duration-500" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
                  {track.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-black/30 px-3 py-1.5 rounded-full">{track.count} enrolled</span>
              </div>
              <h3 className="text-xl font-bold mb-1 relative z-10">{track.name}</h3>
              <p className="text-gray-400 text-sm relative z-10">{track.tag}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: SOCIAL PROOF */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-full py-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 px-6">Students Already Building</h2>
          <div className="section-divider"></div>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 px-6 pb-8 snap-x">
          {leaderboard.map((student, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-5 min-w-[280px] snap-center flex items-center gap-4 transition-all duration-300 hover:border-primary/30"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1A1A24&color=fff`} 
                alt={student.name}
                className="w-12 h-12 rounded-full border-2 border-white/10"
              />
              <div>
                <h4 className="font-bold">{student.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <span>{student.college}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-orange-400 font-semibold">{student.streak} 🔥</span>
                </div>
                <div className="text-xs text-primary mt-1 font-medium">{student.track}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 5: STATS BAR */}
      <section className="w-full py-16 border-y border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-10 px-6 text-center">
          <div ref={daysCounter.ref}>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light mb-2">
              {daysCounter.count}
            </div>
            <div className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Days</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div ref={tracksCounter.ref}>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light mb-2">
              {tracksCounter.count}
            </div>
            <div className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Tracks</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div ref={studentsCounter.ref}>
            <div className="text-5xl font-black text-white mb-2">
              {studentsCounter.count.toLocaleString()}+
            </div>
            <div className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Students</div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA FOOTER */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full py-28 px-6 max-w-3xl mx-auto text-center flex flex-col items-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Ready to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">commit</span>?
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">Join thousands of students already building their future, one commit at a time.</p>
        <form onSubmit={handleJoin} className="w-full max-w-md flex flex-col gap-3 mb-6">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 placeholder-gray-500"
          />
          <button type="submit" className="btn-glass-primary py-4 w-full text-lg">
            Join the Challenge 🚀
          </button>
        </form>
        <p className="text-sm text-gray-500 mb-20">No payment. No login required to explore.</p>
        
        <footer className="w-full border-t border-white/10 pt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://github.com/suryanshinfosec" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/suryanshinfosec/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <LinkedinIcon size={20} />
            </a>
          </div>
          <p className="text-xs text-gray-600">
            ABTalks © 2026 · Built with ❤️ by Suryansh Gupta · AKGEC
          </p>
        </footer>
      </motion.section>

      {/* PROFILE SETUP MODAL */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowProfileModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[60px]" />
              
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all z-10"
              >
                <X size={20} />
              </button>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-1">Set Up Your Profile</h2>
                <p className="text-gray-400 text-sm mb-6">Let's personalize your 60-day journey.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                      <User size={14} className="text-primary" /> Your Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Suryansh Gupta"
                      className="w-full bg-[#1A1A24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                      <GraduationCap size={14} className="text-secondary" /> College
                    </label>
                    <input
                      type="text"
                      value={profileForm.college}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, college: e.target.value }))}
                      placeholder="e.g., AKGEC"
                      className="w-full bg-[#1A1A24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5 flex items-center gap-2">
                      <BookOpen size={14} className="text-success" /> Branch / Course
                    </label>
                    <input
                      type="text"
                      value={profileForm.branch}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, branch: e.target.value }))}
                      placeholder="e.g., B.Tech in IT"
                      className="w-full bg-[#1A1A24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Choose Your Track</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Cybersecurity', icon: <Shield size={18} />, color: 'primary' },
                        { name: 'Web Development', icon: <Globe size={18} />, color: 'secondary' },
                        { name: 'DSA & CP', icon: <Zap size={18} />, color: 'success' },
                        { name: 'AI/ML', icon: <Bot size={18} />, color: 'purple-400' },
                      ].map((t) => (
                        <button
                          key={t.name}
                          onClick={() => setProfileForm(prev => ({ ...prev, track: t.name }))}
                          className={`p-3 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                            profileForm.track === t.name
                              ? 'bg-primary/20 border-primary/50 text-white ring-1 ring-primary/30'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {t.icon} {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!profileForm.name.trim()) {
                        addToast('Please enter your name', 'error');
                        return;
                      }
                      if (!profileForm.college.trim()) {
                        addToast('Please enter your college', 'error');
                        return;
                      }
                      setProfile(profileForm);
                      setShowProfileModal(false);
                      addToast(`Welcome, ${profileForm.name}! Let's build! 🔥`, 'success');
                      setTimeout(() => navigate('/dashboard'), 500);
                    }}
                    className="btn-glass-primary py-4 w-full text-lg mt-2"
                  >
                    Start My Journey 🚀
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
