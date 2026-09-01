import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'indigo';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp = true,
  color = 'blue'
}) => {
  const colorMap = {
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.25)]'
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.25)]'
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.25)]'
    },
    rose: {
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(244,63,94,0.25)]'
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.25)]'
    },
    indigo: {
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400',
      glow: 'hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.25)]'
    }
  };

  const currentStyle = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`glass-panel p-5 rounded-2xl border transition-all duration-300 ${currentStyle.border} ${currentStyle.glow} group`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl ${currentStyle.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight">{value}</h3>
        {trend && (
          <div
            className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}
          >
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-[11px] font-medium text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};
