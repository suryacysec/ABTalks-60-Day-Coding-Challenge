import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StreakCard({ streak, history }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (streak === 0) return;
    const duration = 1000; // 1s
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

  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      {streak > 0 ? (
        <>
          <div className="text-6xl font-extrabold text-white flex items-center justify-center gap-2 mb-2">
            {count} <span className="text-orange-500">🔥</span>
          </div>
          <p className="text-gray-400 font-medium mb-6">Don't break the chain</p>
        </>
      ) : (
        <div className="text-2xl font-bold mb-6 mt-4">Start your streak today 🚀</div>
      )}

      <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
        {heatmapDays.map((dayObj, i) => {
          let bgClass = "bg-transparent border border-white/10"; // pending/future
          if (dayObj.status === 'submitted') bgClass = "bg-primary border border-primary/20";
          if (dayObj.status === 'missed') bgClass = "bg-danger border border-danger/20";
          if (dayObj.status === 'pending') bgClass = "bg-transparent border border-gray-600";
          
          return (
            <motion.div
              key={dayObj.day}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`w-5 h-5 rounded-sm ${bgClass}`}
              title={`Day ${dayObj.day}: ${dayObj.status}`}
            />
          );
        })}
      </div>
    </div>
  );
}
