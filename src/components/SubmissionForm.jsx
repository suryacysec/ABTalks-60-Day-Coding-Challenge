import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function SubmissionForm({ day, alreadySubmitted }) {
  const navigate = useNavigate();
  const [githubUrl, setGithubUrl] = useState(alreadySubmitted ? 'https://github.com/suryansh/repo/commit/123' : '');
  const [linkedinUrl, setLinkedinUrl] = useState(alreadySubmitted ? 'https://linkedin.com/posts/suryansh' : '');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValidGithub = githubUrl.startsWith('https://github.com');
  const isValidLinkedin = linkedinUrl.startsWith('https://linkedin.com');
  
  const canSubmit = isValidGithub && isValidLinkedin && !alreadySubmitted;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="glass-card p-8 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="confetti-container"></div>
        </div>
        
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">Day {day} Submitted! 🔥</h3>
        <p className="text-gray-400 mb-6">Streak: 13 days and counting</p>
        
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-glass-primary py-3 px-8"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="font-bold text-lg mb-4">Submit Proof of Work</h3>
      
      {alreadySubmitted && (
        <div className="bg-success/10 border border-success/30 text-success p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>You already submitted Day {day} ✅ Great work!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <GithubIcon className={isValidGithub ? 'text-success' : 'text-gray-500'} />
            </div>
            <input 
              type="text" 
              placeholder="https://github.com/username/repo/commit/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={alreadySubmitted}
              className={`w-full bg-[#1A1A24] border ${githubUrl && !isValidGithub ? 'border-danger' : isValidGithub ? 'border-success/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50`}
            />
            {isValidGithub && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-success">
                <CheckCircle2 size={18} />
              </div>
            )}
          </div>
          {githubUrl && !isValidGithub && (
            <p className="text-danger text-xs mt-1 ml-1">Please enter a valid GitHub URL</p>
          )}
        </div>

        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LinkedinIcon className={isValidLinkedin ? 'text-success' : 'text-gray-500'} />
            </div>
            <input 
              type="text" 
              placeholder="https://linkedin.com/posts/..."
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={alreadySubmitted}
              className={`w-full bg-[#1A1A24] border ${linkedinUrl && !isValidLinkedin ? 'border-danger' : isValidLinkedin ? 'border-success/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50`}
            />
            {isValidLinkedin && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-success">
                <CheckCircle2 size={18} />
              </div>
            )}
          </div>
          {linkedinUrl && !isValidLinkedin && (
            <p className="text-danger text-xs mt-1 ml-1">Please enter a valid LinkedIn URL</p>
          )}
        </div>

        <button 
          type="submit"
          disabled={!canSubmit || submitting}
          className="btn-glass-primary py-4 w-full mt-2 disabled:opacity-50 disabled:active:scale-100 disabled:hover:shadow-none"
        >
          {submitting ? (
            <><Loader2 size={20} className="animate-spin" /> Submitting...</>
          ) : (
            `Mark Day ${day} Complete ✅`
          )}
        </button>
      </form>
    </div>
  );
}
