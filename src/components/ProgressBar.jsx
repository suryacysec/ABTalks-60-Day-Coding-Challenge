import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  const remaining = total - current;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="font-medium text-white">{current} of {total} days complete</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 text-right">
        {remaining} days remaining
      </div>
    </div>
  );
}
