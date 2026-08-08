import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, X, Link2, Save, Loader2, Pencil, Trash2 } from 'lucide-react';
import { useStore } from '../data/store';
import { useToast } from './Toast';

export default function TaskEditor({ day, existingTask, onClose, onSaved }) {
  const { setTask, profile } = useStore();
  const { addToast } = useToast();
  
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [difficulty, setDifficulty] = useState(existingTask?.difficulty || 'Medium');
  const [whatYouLearn, setWhatYouLearn] = useState(existingTask?.whatYouLearn || []);
  const [learnInput, setLearnInput] = useState('');
  const [resources, setResources] = useState(existingTask?.resources || []);
  const [resLabel, setResLabel] = useState('');
  const [resUrl, setResUrl] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const track = profile?.track || 'Cybersecurity';

  const handleAddLearnItem = () => {
    if (learnInput.trim()) {
      setWhatYouLearn(prev => [...prev, learnInput.trim()]);
      setLearnInput('');
    }
  };

  const handleRemoveLearnItem = (idx) => {
    setWhatYouLearn(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddResource = () => {
    if (resLabel.trim() && resUrl.trim()) {
      setResources(prev => [...prev, { label: resLabel.trim(), url: resUrl.trim() }]);
      setResLabel('');
      setResUrl('');
    }
  };

  const handleRemoveResource = (idx) => {
    setResources(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!title.trim()) {
      addToast('Please enter a task title', 'error');
      return;
    }
    if (!description.trim()) {
      addToast('Please enter a task description', 'error');
      return;
    }

    setTask(day, {
      title: title.trim(),
      description: description.trim(),
      difficulty,
      track,
      whatYouLearn,
      resources,
    });

    addToast(`Day ${day} task saved! 🎉`, 'success');
    if (onSaved) onSaved();
    if (onClose) onClose();
  };

  const handleGenerateWithAI = async () => {
    setAiLoading(true);
    try {
      const prompt = `Generate a coding challenge task for Day ${day} of a 60-day ${track} coding challenge. The difficulty should be ${difficulty}. Return ONLY a valid JSON object (no markdown, no backticks) with these exact keys: "title" (string, 3-5 words), "description" (string, 2-3 sentences explaining the task), "difficulty" (string: "Easy", "Medium", or "Hard"), "whatYouLearn" (array of 3 strings, short learning outcomes), "resources" (array of objects with "label" and "url" keys, provide 2 real documentation links).`;

      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'task' }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      let parsed;
      
      // Try to parse the response as JSON
      const text = data.text || '';
      // Remove potential markdown code fences
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);

      setTitle(parsed.title || '');
      setDescription(parsed.description || '');
      setDifficulty(parsed.difficulty || difficulty);
      setWhatYouLearn(parsed.whatYouLearn || []);
      setResources(parsed.resources || []);
      addToast('AI generated your task! Review and save.', 'success');
    } catch (err) {
      console.error('AI task generation failed:', err);
      // Fallback: generate a reasonable task locally
      const fallbackTasks = {
        'Easy': { title: `${track} Basics - Day ${day}`, description: `Practice fundamental ${track.toLowerCase()} concepts. Build a small project that demonstrates core principles and write documentation explaining your approach.`, whatYouLearn: ['Core concepts', 'Documentation skills', 'Practical application'] },
        'Medium': { title: `${track} Project - Day ${day}`, description: `Build an intermediate-level ${track.toLowerCase()} project that combines multiple concepts. Focus on clean code architecture and error handling.`, whatYouLearn: ['Architecture patterns', 'Error handling', 'Code quality'] },
        'Hard': { title: `Advanced ${track} - Day ${day}`, description: `Tackle an advanced ${track.toLowerCase()} challenge. Research industry best practices, implement a complex solution, and optimize for performance.`, whatYouLearn: ['Advanced techniques', 'Performance optimization', 'Industry best practices'] },
      };
      const fb = fallbackTasks[difficulty] || fallbackTasks['Medium'];
      setTitle(fb.title);
      setDescription(fb.description);
      setWhatYouLearn(fb.whatYouLearn);
      setResources([]);
      addToast('Using locally generated task (API unavailable)', 'info');
    } finally {
      setAiLoading(false);
    }
  };

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const diffColors = {
    'Easy': 'bg-success/20 text-success border-success/30',
    'Medium': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Hard': 'bg-danger/20 text-danger border-danger/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-[50px]" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Pencil size={20} className="text-primary" />
          {existingTask ? 'Edit Task' : 'Create Task'} — Day {day}
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all">
            <X size={20} />
          </button>
        )}
      </div>

      {/* AI Generate Button */}
      <button
        onClick={handleGenerateWithAI}
        disabled={aiLoading}
        className="w-full mb-6 py-3 px-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white font-semibold flex items-center justify-center gap-2 hover:from-primary/30 hover:to-secondary/30 transition-all duration-300 disabled:opacity-50 relative z-10"
      >
        {aiLoading ? (
          <><Loader2 size={18} className="animate-spin" /> Generating with AI...</>
        ) : (
          <><Sparkles size={18} className="text-primary" /> Generate Task with AI ✨</>
        )}
      </button>

      <div className="space-y-5 relative z-10">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Build a Port Scanner"
            className="w-full bg-[#1A1A24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task, what to build, and expected output..."
            rows={4}
            className="w-full bg-[#1A1A24] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 resize-none"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Difficulty</label>
          <div className="flex gap-2">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                  difficulty === d
                    ? diffColors[d] + ' ring-1 ring-offset-1 ring-offset-background'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">What You'll Learn</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={learnInput}
              onChange={(e) => setLearnInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearnItem())}
              placeholder="e.g., Socket programming"
              className="flex-1 bg-[#1A1A24] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
            />
            <button
              onClick={handleAddLearnItem}
              className="px-3 py-2 bg-primary/20 border border-primary/30 rounded-xl text-primary hover:bg-primary/30 transition-all"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {whatYouLearn.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1.5 bg-success/10 border border-success/20 text-success text-xs px-3 py-1.5 rounded-full"
                >
                  {item}
                  <button onClick={() => handleRemoveLearnItem(idx)} className="hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Resources */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Resources</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={resLabel}
              onChange={(e) => setResLabel(e.target.value)}
              placeholder="Resource name"
              className="flex-1 bg-[#1A1A24] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
            />
            <input
              type="text"
              value={resUrl}
              onChange={(e) => setResUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResource())}
              placeholder="https://..."
              className="flex-1 bg-[#1A1A24] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
            />
            <button
              onClick={handleAddResource}
              className="px-3 py-2 bg-secondary/20 border border-secondary/30 rounded-xl text-secondary hover:bg-secondary/30 transition-all"
            >
              <Link2 size={18} />
            </button>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {resources.map((res, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Link2 size={14} className="text-secondary shrink-0" />
                    <span className="text-sm text-gray-300 truncate">{res.label}</span>
                    <span className="text-xs text-gray-600 truncate hidden sm:inline">— {res.url}</span>
                  </div>
                  <button onClick={() => handleRemoveResource(idx)} className="text-gray-500 hover:text-danger transition-colors shrink-0 ml-2">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="btn-glass-primary py-3 flex-1"
          >
            <Save size={18} /> Save Task
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="btn-glass-secondary py-3 px-6"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
