import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-md border border-white/15 p-3.5 rounded-xl shadow-2xl text-sm">
        <p className="font-bold text-white mb-1">Day {data.day}: {data.title}</p>
        <p className="text-gray-400">Difficulty: <span className="text-primary font-semibold">{data.difficulty}/10</span></p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload, currentDay } = props;
  if (payload.day === currentDay) {
    return (
      <g>
        {/* Outer glow */}
        <circle cx={cx} cy={cy} r={10} fill="rgba(239, 68, 68, 0.15)" />
        {/* Pulse ring */}
        <circle cx={cx} cy={cy} r={7} fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth={1}>
          <animate attributeName="r" from="5" to="12" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Solid dot */}
        <circle cx={cx} cy={cy} r={5} fill="#EF4444" stroke="#fff" strokeWidth={2} />
      </g>
    );
  }
  return null;
};

export default function DifficultyChart({ data, currentDay }) {
  return (
    <div className="glass-card p-4 w-full">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 15, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDiffCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDiffUpcoming" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDiffCombined" x1="0" y1="0" x2="1" y2="0">
                <stop offset={`${(currentDay / 60) * 100}%`} stopColor="#10B981" />
                <stop offset={`${(currentDay / 60) * 100}%`} stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="fillDiffCombined" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              stroke="#4B5563" 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              tickLine={false}
              axisLine={false}
              tickCount={6}
            />
            <YAxis 
              hide={true} 
              domain={[0, 10]} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />
            <ReferenceLine 
              x={currentDay} 
              stroke="#EF4444" 
              strokeDasharray="4 4" 
              strokeWidth={1.5}
              label={{ position: 'top', value: '📍 You', fill: '#EF4444', fontSize: 11, fontWeight: 600 }} 
            />
            <Area 
              type="monotone" 
              dataKey="difficulty" 
              stroke="url(#colorDiffCombined)"
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#fillDiffCombined)" 
              isAnimationActive={true}
              animationDuration={1500}
              dot={(props) => <CustomDot {...props} currentDay={currentDay} />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
