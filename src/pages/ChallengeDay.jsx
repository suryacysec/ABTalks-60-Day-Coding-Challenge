import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ExternalLink, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { todayTask, student, submissionHistory, allDays } from '../data/mock';
import SubmissionForm from '../components/SubmissionForm';
import AIPostGenerator from '../components/AIPostGenerator';

// Difficulty color helper
function getDifficultyColor(difficulty) {
  const d = (difficulty || 'Intermediate').toLowerCase();
  if (d === 'easy' || d === 'beginner') return { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' };
  if (d === 'hard' || d === 'advanced') return { bg: 'bg-danger/20', text: 'text-danger-light', border: 'border-danger/30' };
  return { bg: 'bg-amber/20', text: 'text-amber', border: 'border-amber/30' };
}

// Progress stepper for days
function DayStepper({ currentDay, totalDays }) {
  const days = [];
  for (let i = Math.max(1, currentDay - 2); i <= Math.min(totalDays, currentDay + 2); i++) {
    days.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {days.map((d, idx) => {
        const isActive = d === currentDay;
        const isPast = d < student.day;
        const submitted = submissionHistory.find(s => s.day === d)?.status === 'submitted';

        return (
          <React.Fragment key={d}>
            {idx > 0 && (
              <div className={`w-4 sm:w-8 h-0.5 ${isPast || isActive ? 'bg-primary/50' : 'bg-white/10'}`} />
            )}
            <motion.div
              initial={isActive ? { scale: 0.8 } : {}}
              animate={isActive ? { scale: 1 } : {}}
              className={`flex items-center justify-center rounded-full font-bold text-xs transition-all duration-300 ${
                isActive
                  ? 'w-10 h-10 bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary/30'
                  : submitted
                  ? 'w-8 h-8 bg-success/20 text-success border border-success/30'
                  : isPast
                  ? 'w-8 h-8 bg-danger/20 text-danger border border-danger/30'
                  : 'w-8 h-8 bg-white/5 text-gray-500 border border-white/10'
              }`}
            >
              {submitted && !isActive ? <CheckCircle2 size={14} /> : d}
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function ChallengeDay() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const day = parseInt(dayNumber);

  // Simple mock logic for different days
  const isFuture = day > student.day;
  const isToday = day === student.day;
  const alreadySubmitted = submissionHistory.find(s => s.day === day)?.status === 'submitted';
  
  const task = isToday ? todayTask : allDays.find(d => d.day === day) || todayTask;

  const previousDays = submissionHistory.filter(s => s.day >= day - 3 && s.day < day && s.status === 'submitted');

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const diffColors = getDifficultyColor(task.difficulty);

  return (
    <div className="min-h-screen pb-20 w-full relative">
      {/* Header */}
      <header className="px-6 py-4 sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white p-2 -ml-2 rounded-full transition-all duration-200 hover:bg-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Day {day} / {student.totalDays}
            </span>
          </div>
          <span className="text-xs text-primary mt-1 font-medium">{student.track}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <Clock size={14} />
          <span>{todayDate}</span>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-3xl mx-auto">
        {/* Day Stepper */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-2"
        >
          <DayStepper currentDay={day} totalDays={student.totalDays} />
        </motion.div>

        {isFuture ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 relative z-10 border border-white/10"
            >
              <Lock size={36} className="text-gray-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2 relative z-10">Locked</h2>
            <p className="text-gray-400 relative z-10">Complete Day {student.day} first to unlock this challenge.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-8 btn-glass-primary py-3 px-8 relative z-10"
            >
              Go to Today's Task
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* TASK CARD */}
            <div className="glass-card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <h1 className="text-3xl font-extrabold">{task.title}</h1>
                <span className={`${diffColors.bg} ${diffColors.text} ${diffColors.border} border px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ml-4`}>
                  {task.difficulty || "Intermediate"}
                </span>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg relative z-10">
                {task.description || "Learn how to secure your networks and find vulnerabilities using industry standard tools."}
              </p>

              {task.whatYouLearn && (
                <div className="mb-8 relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-success" /> What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    {task.whatYouLearn.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {task.resources && (
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-secondary">📚</span> Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {task.resources.map((res, idx) => (
                      <a 
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <span className="text-sm font-medium">{res.label}</span>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI POST GENERATOR */}
            <AIPostGenerator task={task} student={student} />

            {/* SUBMISSION FORM */}
            <SubmissionForm day={day} alreadySubmitted={alreadySubmitted} />

            {/* PREVIOUS DAYS STRIP */}
            {previousDays.length > 0 && (
              <div className="pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Previous Days
                </h4>
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
                  {previousDays.map((pDay, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 min-w-[120px] flex items-center justify-between hover:border-success/30 transition-all duration-300"
                    >
                      <span className="font-medium text-sm">Day {pDay.day}</span>
                      <CheckCircle2 size={16} className="text-success" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
