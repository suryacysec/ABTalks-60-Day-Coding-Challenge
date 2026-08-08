import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const trackColors = {
  'Web Dev': { bg: '3B82F6', ring: 'ring-blue-500/30' },
  'Web Development': { bg: '3B82F6', ring: 'ring-blue-500/30' },
  'DSA & CP': { bg: '10B981', ring: 'ring-green-500/30' },
  'AI/ML': { bg: 'A855F7', ring: 'ring-purple-500/30' },
  'Cybersecurity': { bg: 'EF4444', ring: 'ring-red-500/30' },
};

export default function PeerFeed({ peers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || peers.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % peers.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, peers.length]);

  // Display current and previous two for a feed effect
  const visiblePeers = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex - i + peers.length) % peers.length;
    visiblePeers.push({ ...peers[index], id: `${peers[index].name}-${index}` });
  }

  return (
    <div 
      className="glass-card p-5 overflow-hidden relative min-h-[220px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center mb-5 px-1">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="text-lg">⚡</span> Live Activity
        </h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs text-success font-semibold uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-3">
        <AnimatePresence>
          {visiblePeers.map((peer, i) => {
            const tc = trackColors[peer.track] || { bg: '7C3AED', ring: 'ring-purple-500/30' };
            
            return (
              <motion.div
                key={peer.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1 - i * 0.3, y: i * 64 }}
                exit={{ opacity: 0, y: 120 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute w-full flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.06] transition-colors"
              >
                <div className={`relative ring-2 ${tc.ring} rounded-full`}>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(peer.name)}&background=${tc.bg}&color=fff`} 
                    alt={peer.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{peer.name}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{peer.timeAgo}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    Submitted Day {peer.day} • <span className="text-primary font-medium">{peer.track}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
