import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Globe, Zap, Bot, Shield } from 'lucide-react';
import { useToast } from '../components/Toast';
import { leaderboard } from '../data/mock';

export default function Landing() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    // Simple animated counter for hero
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStudentsCount(Math.floor((currentStep / steps) * 2400));
      if (currentStep >= steps) {
        clearInterval(timer);
        setStudentsCount(2400); // end value
      }
    }, stepTime);
    return () => clearInterval(timer);
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
    { icon: <Shield size={24} className="text-primary" />, name: "Cybersecurity", tag: "Defend networks & find vulnerabilities", count: "482" },
    { icon: <Globe size={24} className="text-secondary" />, name: "Web Development", tag: "Build modern, responsive apps", count: "890" },
    { icon: <Zap size={24} className="text-success" />, name: "DSA & CP", tag: "Master algorithms & get placed", count: "650" },
    { icon: <Bot size={24} className="text-purple-400" />, name: "AI/ML", tag: "Train models & build intelligent systems", count: "378" }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Floating badges behind */}
        <div className="absolute top-1/4 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/4 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[60px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute top-32 left-4 glass rounded-full px-4 py-2 text-xs flex items-center gap-2 opacity-60 hidden sm:flex"
        >
          <span>Rahul S.</span> <span className="text-orange-400">45 🔥</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="absolute bottom-32 right-4 glass rounded-full px-4 py-2 text-xs flex items-center gap-2 opacity-60 hidden sm:flex"
        >
          <span>Priya M.</span> <span className="text-orange-400">42 🔥</span>
        </motion.div>

        <div className="z-10 flex flex-col items-center text-center max-w-2xl mt-12 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-full px-4 py-1.5 mb-6 text-sm font-medium border-primary/30 text-primary-200"
          >
            🔥 Join {studentsCount.toLocaleString()}+ students building right now
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent leading-tight"
          >
            Build Every Day.<br/>Get Hired.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-10 max-w-md mx-auto"
          >
            60-day coding challenge for Indian college students. Commit daily, stay visible to recruiters.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row w-full gap-4 px-4 sm:px-0 sm:justify-center"
          >
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-glass-primary py-4 px-8 flex items-center justify-center gap-2"
            >
              Start Your 60 Days <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="btn-glass-secondary py-4 px-8"
            >
              See How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        id="how-it-works" 
        className="w-full py-20 px-6 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x">
          {[
            { step: 1, title: "Pick Your Track", desc: "Web Dev, DSA, AI/ML, Cybersecurity" },
            { step: 2, title: "Build Daily", desc: "Push a GitHub commit every day" },
            { step: 3, title: "Stay Visible", desc: "Post on LinkedIn. Recruiters notice consistency." }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 min-w-[280px] snap-center flex-1 relative transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">{item.step}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
              {idx < 2 && <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/20"></div>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3: TRACKS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full py-10 px-6 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10">4 Specialized Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tracks.map((track, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  {track.icon}
                </div>
                <span className="text-xs font-medium text-gray-500 bg-black/30 px-2 py-1 rounded-full">{track.count} enrolled</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{track.name}</h3>
              <p className="text-gray-400 text-sm">{track.tag}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: SOCIAL PROOF */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full py-16"
      >
        <h2 className="text-2xl font-bold mb-8 px-6 max-w-5xl mx-auto">Students Already Building</h2>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 px-6 pb-8 snap-x">
          {leaderboard.map((student, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-5 min-w-[260px] snap-center flex items-center gap-4 transition-all duration-300"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1A1A24&color=fff`} 
                alt={student.name}
                className="w-12 h-12 rounded-full border border-white/10"
              />
              <div>
                <h4 className="font-bold">{student.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <span>{student.college}</span>
                  <span>•</span>
                  <span className="text-orange-400 font-medium">{student.streak} 🔥</span>
                </div>
                <div className="text-xs text-primary mt-1">{student.track}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 5: STATS BAR */}
      <section className="w-full py-12 border-y border-white/10 bg-black/30">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-8 px-6 text-center">
          <div>
            <div className="text-4xl font-extrabold text-primary mb-1">60</div>
            <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Days</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10"></div>
          <div>
            <div className="text-4xl font-extrabold text-secondary mb-1">4</div>
            <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Tracks</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10"></div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">2,400+</div>
            <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">Students</div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA FOOTER */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full py-24 px-6 max-w-3xl mx-auto text-center flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to commit?</h2>
        <form onSubmit={handleJoin} className="w-full max-w-md flex flex-col gap-3 mb-6">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#13131A] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
          />
          <button type="submit" className="btn-glass-primary py-4 w-full">
            Join the Challenge
          </button>
        </form>
        <p className="text-sm text-gray-500 mb-16">No payment. No login required to explore.</p>
        
        <footer className="text-xs text-gray-600">
          ABTalks © 2025 · Built for Indian college students
        </footer>
      </motion.section>

    </div>
  );
}
