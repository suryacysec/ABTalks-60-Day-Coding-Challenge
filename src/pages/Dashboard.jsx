import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  student, 
  submissionHistory, 
  todayTask, 
  allDays, 
  leaderboard, 
  peerActivity 
} from '../data/mock';
import StreakCard from '../components/StreakCard';
import ProgressBar from '../components/ProgressBar';
import DifficultyChart from '../components/DifficultyChart';
import PeerFeed from '../components/PeerFeed';
import RecruiterView from '../components/RecruiterView';
import { Flame, Trophy, Target, ArrowRight, Crown } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [recruiterView, setRecruiterView] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="glass-card p-8 text-center w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Complete your profile to start</h2>
          <button className="btn-glass-primary py-3 w-full">
            Set up profile
          </button>
        </div>
      </div>
    );
  }

  const hasMissedDay = submissionHistory.some(s => s.status === 'missed');
  
  // Dashboard Header
  const renderHeader = () => (
    <header className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff`} 
            alt={student.name}
            className="w-14 h-14 rounded-full border-2 border-primary/50 shadow-lg shadow-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
            <span className="text-[8px]">✓</span>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl leading-tight">{student.name}</h1>
          <p className="text-xs text-gray-400">{student.college} · {student.track}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary-light px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
          Day {student.day}/{student.totalDays}
        </span>
        <div className="text-xs text-gray-400 flex items-center gap-1 group relative cursor-help">
          {student.personality.label} {student.personality.emoji}
          <div className="absolute hidden group-hover:block right-0 top-full mt-1 bg-gray-800/95 backdrop-blur-sm text-white p-3 rounded-xl text-xs w-48 z-10 shadow-xl border border-white/10">
            Based on your avg submission time ({student.avgSubmissionHour}:00)
          </div>
        </div>
      </div>
    </header>
  );

  // Quick stats row
  const renderQuickStats = () => (
    <div className="grid grid-cols-3 gap-3">
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="glass-card p-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
        <Flame size={20} className="text-orange-400 mx-auto mb-1 relative z-10" />
        <div className="text-2xl font-black text-white relative z-10">{student.streak}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold relative z-10">Streak</div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="glass-card p-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <Trophy size={20} className="text-primary mx-auto mb-1 relative z-10" />
        <div className="text-2xl font-black text-white relative z-10">#{student.rank}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold relative z-10">Rank</div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="glass-card p-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent" />
        <Target size={20} className="text-success mx-auto mb-1 relative z-10" />
        <div className="text-2xl font-black text-white relative z-10">{student.percentile.replace('Top ', '')}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold relative z-10">Percentile</div>
      </motion.div>
    </div>
  );

  // Medal icons for leaderboard
  const getMedal = (idx) => {
    if (idx === 0) return <span className="text-lg">🥇</span>;
    if (idx === 1) return <span className="text-lg">🥈</span>;
    if (idx === 2) return <span className="text-lg">🥉</span>;
    return <span className="text-gray-500 font-bold w-5 text-center text-sm">{idx + 1}</span>;
  };

  return (
    <div className="min-h-screen pb-20 w-full">
      {/* Premium sticky navbar */}
      <div className="px-4 py-3 sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-lg bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">ABTalks</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-400">Recruiter View</span>
          <button 
            onClick={() => setRecruiterView(!recruiterView)}
            className={`w-11 h-6 flex items-center rounded-full transition-all duration-300 ${recruiterView ? 'bg-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]' : 'bg-gray-700'} p-1`}
          >
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-md"
              animate={{ x: recruiterView ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      <div className="p-5 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {recruiterView ? (
            <motion.div 
              key="recruiter"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              <RecruiterView student={student} history={submissionHistory} />
            </motion.div>
          ) : (
            <motion.div 
              key="student"
              initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="space-y-5"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {renderHeader()}
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {renderQuickStats()}
              </motion.div>

              {hasMissedDay && (
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-orange-500/10 border border-orange-500/30 text-orange-400 p-4 rounded-xl text-sm flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  <p>You missed Day 8. Don't let it happen again. Keep going 💪</p>
                </motion.div>
              )}

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <StreakCard streak={student.streak} history={submissionHistory} />
              </motion.div>

              {/* TODAY'S TASK CARD */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
                whileHover={{ y: -3 }} 
                className="gradient-border"
              >
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-[50px]" />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">Day {todayTask.day} of 60</span>
                    </div>
                    <span className="text-xs font-semibold bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
                      {todayTask.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 relative z-10">{todayTask.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 relative z-10">{todayTask.description}</p>
                  
                  <button 
                    onClick={() => navigate(`/day/${todayTask.day}`)}
                    className="btn-glass-primary py-3.5 w-full text-base group relative z-10"
                  >
                    Start Today's Challenge 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* PROGRESS */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card p-6">
                <ProgressBar current={student.day} total={student.totalDays} />
              </motion.div>

              {/* ACHIEVEMENTS */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="text-lg">🏆</span> Achievements
                </h3>
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 snap-x">
                  {student.achievements.map((ach, idx) => (
                    <motion.div 
                      key={ach.id} 
                      whileHover={{ scale: 1.05, y: -3 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (idx * 0.08) }}
                      className={`min-w-[120px] snap-start p-4 rounded-xl text-center border transition-all duration-300 ${
                        ach.unlocked 
                          ? 'bg-white/5 border-white/15 hover:border-primary/40 hover:bg-white/10' 
                          : 'bg-transparent border-white/5 grayscale opacity-40'
                      }`}
                    >
                      <div className="text-3xl mb-2 relative">
                        {ach.emoji}
                        {!ach.unlocked && (
                          <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 border border-white/10">
                            🔒
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-medium">{ach.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* STANDINGS */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card p-0 overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Crown size={18} className="text-amber-400" />
                    Leaderboard
                  </h3>
                  <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">{student.percentile}</span>
                </div>
                <div className="divide-y divide-white/5">
                  {leaderboard.slice(0, 5).map((lUser, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.08) }}
                      className={`p-4 flex items-center justify-between transition-all duration-200 hover:bg-white/5 ${
                        lUser.name === student.name ? 'bg-primary/10 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 flex items-center justify-center">
                          {getMedal(idx)}
                        </div>
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lUser.name)}&background=1A1A24&color=fff`} 
                          alt={lUser.name}
                          className="w-9 h-9 rounded-full transition-transform hover:scale-110 border border-white/10"
                        />
                        <div>
                          <div className="font-semibold text-sm">{lUser.name}</div>
                          <div className="text-xs text-gray-500">{lUser.college}</div>
                        </div>
                      </div>
                      <div className="font-bold text-orange-400 flex items-center gap-1">
                        {lUser.streak} <span className="text-sm">🔥</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* DIFFICULTY CHART */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-lg">📈</span> What's Ahead
                </h3>
                <DifficultyChart data={allDays} currentDay={student.day} />
              </motion.div>

              {/* PEER ACTIVITY */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <PeerFeed peers={peerActivity} />
              </motion.div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
