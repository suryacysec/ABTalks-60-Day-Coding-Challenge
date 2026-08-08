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

export default function Dashboard() {
  const navigate = useNavigate();
  const [recruiterView, setRecruiterView] = useState(false);

  if (!student) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="glass-card p-8 text-center w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Complete your profile to start</h2>
          <button className="bg-primary hover:bg-primary/90 text-white w-full py-3 rounded-xl font-semibold">
            Set up profile
          </button>
        </div>
      </div>
    );
  }

  const hasMissedDay = submissionHistory.some(s => s.status === 'missed');
  
  // Dashboard Header
  const renderHeader = () => (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff`} 
          alt={student.name}
          className="w-12 h-12 rounded-full border border-white/10"
        />
        <div>
          <h1 className="font-bold text-lg leading-tight">{student.name}</h1>
          <p className="text-xs text-gray-400">{student.college}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          {student.track}
        </span>
        <div className="text-xs text-gray-400 flex items-center gap-1 group relative cursor-help">
          {student.personality.label} {student.personality.emoji}
          <div className="absolute hidden group-hover:block right-0 top-full mt-1 bg-gray-800 text-white p-2 rounded text-xs w-48 z-10 shadow-xl border border-white/10">
            Based on your avg submission time ({student.avgSubmissionHour}:00)
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen pb-20 w-full">
      <div className="px-4 py-3 sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
        <div className="font-bold">ABTalks</div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-300">Recruiter View</span>
          <button 
            onClick={() => setRecruiterView(!recruiterView)}
            className={`w-11 h-6 flex items-center rounded-full transition-colors ${recruiterView ? 'bg-primary' : 'bg-gray-600'} p-1`}
          >
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-md"
              animate={{ x: recruiterView ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      <div className="p-6">
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
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {renderHeader()}

              {hasMissedDay && (
                <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 p-4 rounded-xl text-sm flex items-start gap-3">
                  <span className="text-lg">⚠️</span>
                  <p>You missed Day 8. Don't let it happen again. Keep going 💪</p>
                </div>
              )}

              <StreakCard streak={student.streak} history={submissionHistory} />

              {/* TODAY'S TASK CARD */}
              <div className="glass-card p-6 border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px]" />
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Day {todayTask.day} of 60</span>
                  <span className="text-xs font-medium bg-amber-500/20 text-amber-500 px-2 py-1 rounded-md">
                    {todayTask.difficulty}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{todayTask.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{todayTask.description}</p>
                
                <button 
                  onClick={() => navigate(`/day/${todayTask.day}`)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                >
                  Start Today's Challenge →
                </button>
              </div>

              {/* PROGRESS */}
              <div className="glass-card p-6">
                <ProgressBar current={student.day} total={student.totalDays} />
              </div>

              {/* ACHIEVEMENTS */}
              <div>
                <h3 className="font-bold mb-4">Achievements</h3>
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 snap-x">
                  {student.achievements.map((ach) => (
                    <div 
                      key={ach.id} 
                      className={`min-w-[120px] snap-start p-4 rounded-xl text-center border ${
                        ach.unlocked 
                          ? 'bg-white/5 border-white/10' 
                          : 'bg-transparent border-white/5 grayscale opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2 relative">
                        {ach.emoji}
                        {!ach.unlocked && (
                          <div className="absolute -bottom-1 -right-1 bg-[#13131A] rounded-full p-0.5 border border-white/10">
                            🔒
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-medium">{ach.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STANDINGS */}
              <div className="glass-card p-0 overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h3 className="font-bold flex items-center gap-2">
                    {student.percentile} this week 🎯
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {leaderboard.slice(0, 5).map((lUser, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 flex items-center justify-between ${
                        lUser.name === student.name ? 'bg-primary/10 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`font-bold w-4 text-center ${idx < 3 ? 'text-orange-400' : 'text-gray-500'}`}>
                          {idx + 1}
                        </div>
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lUser.name)}&background=1A1A24&color=fff`} 
                          alt={lUser.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm">{lUser.name}</div>
                          <div className="text-xs text-gray-500">{lUser.college}</div>
                        </div>
                      </div>
                      <div className="font-bold text-orange-400">{lUser.streak} 🔥</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIFFICULTY CHART */}
              <div>
                <h3 className="font-bold mb-2">What's Ahead</h3>
                <DifficultyChart data={allDays} currentDay={student.day} />
              </div>

              {/* PEER ACTIVITY */}
              <PeerFeed peers={peerActivity} />
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
