import React from 'react';
import { motion } from 'framer-motion';
import StreakCard from './StreakCard';
import { useToast } from './Toast';
import { Code, Shield, Globe, Zap, Bot } from 'lucide-react';

const GithubIcon = ({ size = 22, className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 22, className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const skillsByTrack = {
  'B.TECH in IT': ['Python', 'Networking', 'Linux', 'Wireshark', 'Nmap', 'Burp Suite'],
  'Cybersecurity': ['Python', 'Networking', 'Linux', 'Wireshark', 'Nmap', 'Burp Suite'],
  'Web Dev': ['React', 'Node.js', 'CSS', 'JavaScript', 'MongoDB', 'REST APIs'],
  'Web Development': ['React', 'Node.js', 'CSS', 'JavaScript', 'MongoDB', 'REST APIs'],
  'DSA & CP': ['C++', 'Java', 'Algorithms', 'Data Structures', 'Problem Solving', 'Time Complexity'],
  'AI/ML': ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Neural Networks'],
};

export default function RecruiterView({ student, history }) {
  const { addToast } = useToast();
  const skills = skillsByTrack[student.track] || skillsByTrack['Cybersecurity'];

  const handleViewProfile = () => {
    addToast("Full profile view is coming soon!", "success");
  };

  // Activity heatmap — generate 7 weeks of data
  const weeks = 7;
  const daysPerWeek = 7;
  const heatmapData = Array.from({ length: weeks * daysPerWeek }, (_, i) => {
    if (i < history.length) {
      return history[i].status;
    }
    return 'future';
  });

  const getHeatmapColor = (status) => {
    if (status === 'submitted') return 'bg-primary';
    if (status === 'missed') return 'bg-danger/60';
    if (status === 'pending') return 'bg-amber/30';
    return 'bg-white/5';
  };

  return (
    <div className="w-full space-y-5">
      {/* Profile Header */}
      <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-28 bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 blur-xl"></div>
        
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff&size=100`} 
          alt={student.name}
          className="w-24 h-24 rounded-full border-4 border-card relative z-10 shadow-xl shadow-primary/20"
        />
        
        <h2 className="text-2xl font-bold mt-4">{student.name}</h2>
        <p className="text-gray-400 text-sm">{student.college}</p>
        
        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          <span className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary-light px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
            {student.track}
          </span>
          <span className="bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
            Top 23%
          </span>
          <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
            Day {student.day}/{student.totalDays}
          </span>
        </div>

        <p className="mt-6 text-sm text-gray-300 max-w-sm italic leading-relaxed">
          "{student.name} has committed {student.streak} consecutive days to {student.track}. Active on GitHub and LinkedIn daily."
        </p>
      </div>

      {/* Activity Heatmap */}
      <div className="glass-card p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
          <Code size={16} className="text-primary" /> Contribution Activity
        </h3>
        <div className="flex gap-1 justify-center flex-wrap">
          {heatmapData.map((status, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.008, duration: 0.2 }}
              className={`w-4 h-4 rounded-[3px] ${getHeatmapColor(status)} border border-white/5 transition-transform hover:scale-150`}
              title={`Day ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-gray-500">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/30 border border-white/5"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/60 border border-white/5"></div>
            <div className="w-3 h-3 rounded-sm bg-primary border border-white/5"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <StreakCard streak={student.streak} history={history} />

      {/* Skills */}
      <div className="glass-card p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
          <Zap size={16} className="text-success" /> Skills & Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white/5 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 hover:border-primary/40 hover:text-primary-light transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div whileHover={{ scale: 1.03 }} className="glass-card p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
          <GithubIcon size={22} className="text-gray-400 mx-auto mb-2 relative z-10" />
          <h4 className="font-bold text-xl relative z-10">{student.streak}</h4>
          <p className="text-xs text-gray-500 relative z-10">GitHub Commits</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="glass-card p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
          <LinkedinIcon size={22} className="text-gray-400 mx-auto mb-2 relative z-10" />
          <h4 className="font-bold text-xl relative z-10">{student.streak}</h4>
          <p className="text-xs text-gray-500 relative z-10">LinkedIn Posts</p>
        </motion.div>
      </div>

      <button 
        onClick={handleViewProfile}
        className="btn-glass-primary py-4 w-full text-base"
      >
        View Full Profile →
      </button>
    </div>
  );
}
