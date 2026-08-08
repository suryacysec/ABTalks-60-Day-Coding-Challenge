import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-white/10 p-3 rounded-lg shadow-xl text-sm">
        <p className="font-bold text-white mb-1">Day {data.day}: {data.title}</p>
        <p className="text-gray-400">Difficulty: <span className="text-primary font-medium">{data.difficulty}/10</span></p>
      </div>
    );
  }
  return null;
};

export default function DifficultyChart({ data, currentDay }) {
  // Add a property to distinguish past/future for gradient if needed, 
  // but Recharts gradients are usually fixed to coordinates.
  // We'll use a solid gradient and a reference line for "You are here".

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDifficulty" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            stroke="#4B5563" 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            hide={true} 
            domain={[0, 10]} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
          <ReferenceLine x={currentDay} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'top', value: 'You are here', fill: '#EF4444', fontSize: 10 }} />
          <Area 
            type="monotone" 
            dataKey="difficulty" 
            stroke="#7C3AED" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorDifficulty)" 
            isAnimationActive={true}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
