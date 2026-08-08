import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from './Toast';

export default function AIPostGenerator({ task, student }) {
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState('');
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setPostText('');
    
    try {
      const prompt = `Write a professional LinkedIn post for a CS student named ${student.name} who just completed Day ${task.day} of a 60-day coding challenge. Task: ${task.title}. Track: ${task.track}. Make it enthusiastic, under 150 words, include these 3 hashtags at the end: #Cybersecurity #60DayChallenge #BuildInPublic. End with encouragement for other students. No emojis in the text body.`;

      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('API Error or running locally without Vercel');
      }

      const data = await response.json();
      setPostText(data.text);
    } catch (err) {
      console.error("Using fallback post template:", err);
      // Fallback for local development or if API key is missing
      setTimeout(() => {
        setPostText(`Just completed Day ${task.day} of the ABTalks 60-Day Coding Challenge! \n\nToday I built a ${task.title.toLowerCase()} — ${task.description.split('.')[0]}. Understanding how systems expose themselves on a network is fundamental to cybersecurity. \n\nIf you're on the fence about starting — just start. Consistency beats perfection every time.\n\n#Cybersecurity #60DayChallenge #BuildInPublic`);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-primary/50 bg-gradient-to-br from-primary/10 to-transparent p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px]" />
      
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <Sparkles size={20} className="text-primary" />
        <h3 className="font-bold text-lg">Generate your LinkedIn post with AI</h3>
      </div>
      <p className="text-sm text-gray-400 mb-4 relative z-10">
        We'll write a professional post based on your task
      </p>

      {!postText && !loading ? (
        <button 
          onClick={handleGenerate}
          className="btn-glass-primary py-3 w-full"
        >
          <Sparkles size={18} /> Generate Post
        </button>
      ) : null}

      {loading && (
        <div className="w-full h-32 rounded-xl skeleton mt-4"></div>
      )}

      {postText && !loading && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-[#13131A] border border-white/10 rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap mb-3">
            {postText}
          </div>
          <button 
            onClick={handleCopy}
            className="btn-glass-secondary py-3 w-full"
          >
            {copied ? <><Check size={18} className="text-success" /> Copied ✓</> : <><Copy size={18} /> Copy to Clipboard</>}
          </button>
        </div>
      )}
    </div>
  );
}
