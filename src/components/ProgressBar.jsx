import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  const remaining = total - current;

  const milestones = [
    { at: 25, label: '25%' },
    { at: 50, label: '50%' },
    { at: 75, label: '75%' },
    { at: 100, label: '100%' },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="font-semibold text-white">{current} of {total} days complete</span>
        <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress bar container */}
      <div className="relative">
        <div className="h-3.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full progress-shimmer relative"
          >
            {/* Glow tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white/40 rounded-full blur-[4px]" />
          </motion.div>
        </div>

        {/* Milestone markers */}
        <div className="relative h-5 mt-1">
          {milestones.map((ms) => (
            <div
              key={ms.at}
              className="absolute flex flex-col items-center"
              style={{ left: `${ms.at}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`w-0.5 h-2 rounded-full ${percentage >= ms.at ? 'bg-primary/60' : 'bg-white/15'}`} />
              <span className={`text-[9px] mt-0.5 font-semibold ${percentage >= ms.at ? 'text-primary/80' : 'text-gray-600'}`}>
                {ms.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1 text-xs text-gray-500 text-right">
        {remaining} days remaining
      </div>
    </div>
  );
}
