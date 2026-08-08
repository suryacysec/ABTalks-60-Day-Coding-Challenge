import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { todayTask, student, submissionHistory, allDays } from '../data/mock';
import SubmissionForm from '../components/SubmissionForm';
import AIPostGenerator from '../components/AIPostGenerator';

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

  return (
    <div className="min-h-screen pb-20 w-full relative">
      <header className="px-6 py-4 sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-white p-2 -ml-2 rounded-full transition-colors"
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
        
        <div className="text-sm font-medium text-gray-400">{todayDate}</div>
      </header>

      <main className="p-6 space-y-6 max-w-3xl mx-auto">
        {isFuture ? (
          <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Lock size={32} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Locked</h2>
            <p className="text-gray-400">Complete Day {student.day} first to unlock this challenge.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-8 btn-glass-primary py-3 px-8"
            >
              Go to Today's Task
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* TASK CARD */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-extrabold">{task.title}</h1>
                <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap ml-4">
                  {task.difficulty || "Intermediate"}
                </span>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                {task.description || "Learn how to secure your networks and find vulnerabilities using industry standard tools."}
              </p>

              {task.whatYouLearn && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-success">🎓</span> What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    {task.whatYouLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-success shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {task.resources && (
                <div>
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
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors group"
                      >
                        <span className="text-sm font-medium">{res.label}</span>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Previous Days</h4>
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
                  {previousDays.map((pDay, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 min-w-[120px] flex items-center justify-between">
                      <span className="font-medium text-sm">Day {pDay.day}</span>
                      <CheckCircle2 size={16} className="text-success" />
                    </div>
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
