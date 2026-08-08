import React from 'react';
import StreakCard from './StreakCard';
import { useToast } from './Toast';

export default function RecruiterView({ student, history }) {
  const { addToast } = useToast();

  const handleViewProfile = () => {
    addToast("Full profile view is coming soon!", "success");
  };

  return (
    <div className="w-full space-y-6">
      <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-24 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"></div>
        
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff&size=100`} 
          alt={student.name}
          className="w-24 h-24 rounded-full border-4 border-[#13131A] relative z-10 -mt-2 shadow-xl"
        />
        
        <h2 className="text-2xl font-bold mt-4">{student.name}</h2>
        <p className="text-gray-400">{student.college}</p>
        
        <div className="mt-4 flex gap-2">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {student.track}
          </span>
          <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            Top 23%
          </span>
        </div>

        <p className="mt-6 text-sm text-gray-300 max-w-sm italic">
          "{student.name} has committed {student.streak} consecutive days to {student.track}. Active on GitHub and LinkedIn daily."
        </p>
      </div>

      <StreakCard streak={student.streak} history={history} />

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5 text-center">
          <div className="text-3xl mb-2 text-gray-400">🔗</div>
          <h4 className="font-bold">{student.streak} commits</h4>
          <p className="text-xs text-gray-500">in {student.streak} days</p>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-3xl mb-2 text-gray-400">👁️</div>
          <h4 className="font-bold">{student.streak} posts</h4>
          <p className="text-xs text-gray-500">on LinkedIn</p>
        </div>
      </div>

      <button 
        onClick={handleViewProfile}
        className="btn-glass-primary py-4 w-full"
      >
        View Full Profile
      </button>
    </div>
  );
}
