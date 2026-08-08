import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// SVG Flame component
function FlameIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <path 
        d="M12 2C6.5 6.5 4 10 4 14a8 8 0 0016 0c0-4-2.5-7.5-8-12zm0 18a5 5 0 01-5-5c0-2.5 1.5-5 5-8.5 3.5 3.5 5 6 5 8.5a5 5 0 01-5 5z" 
        fill="url(#flameGrad)"
      />
    </svg>
  );
}

export default function StreakCard({ streak, history }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (streak === 0) return;
    const duration = 1000;
    const steps = 20;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.floor((currentStep / steps) * streak));
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(streak);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [streak]);

  // Last 14 days for heatmap
  const heatmapDays = history.slice(-14);

  const statusColors = {
    submitted: { bg: 'bg-primary', border: 'border-primary/30', label: 'Submitted' },
    missed: { bg: 'bg-danger', border: 'border-danger/30', label: 'Missed' },
    pending: { bg: 'bg-transparent', border: 'border-amber/50', label: 'Pending' },
    future: { bg: 'bg-transparent', border: 'border-white/10', label: 'Future' },
  };

  return (
    <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden">
      {/* Background glow */}
      {streak > 0 && (
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      )}

      {streak > 0 ? (
        <>
          {/* Flame + Number */}
          <div className="relative mb-3">
            <motion.div
              animate={{ scale: [1, 1.1, 0.95, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 opacity-60"
            >
              <FlameIcon className="w-full h-full" />
            </motion.div>
            <div className="text-6xl font-black text-white flex items-center justify-center gap-3 relative z-10 pt-6">
              {count} 
              <span className="text-5xl animate-pulse">🔥</span>
            </div>
          </div>
          <p className="text-gray-400 font-medium mb-6 text-sm">Day streak — Don't break the chain!</p>
        </>
      ) : (
        <div className="text-2xl font-bold mb-6 mt-4">Start your streak today 🚀</div>
      )}

      {/* Heatmap */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[220px] mb-4">
        {heatmapDays.map((dayObj, i) => {
          const colors = statusColors[dayObj.status] || statusColors.future;
          
          return (
            <motion.div
              key={dayObj.day}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              whileHover={{ scale: 1.3 }}
              className={`w-5 h-5 rounded-[4px] ${colors.bg} border ${colors.border} cursor-default transition-transform`}
              title={`Day ${dayObj.day}: ${dayObj.status}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-gray-500 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-primary border border-primary/30"></div>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-danger border border-danger/30"></div>
          <span>Missed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border border-amber/50"></div>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}
