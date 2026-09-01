import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  CalendarCheck2,
  Wrench,
  MapPin,
  Car,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck2 },
    { id: 'mechanics', label: 'Mechanics Fleet', icon: Wrench },
    { id: 'map', label: 'Live Location Map', icon: MapPin }
  ];

  return (
    <aside className="w-64 bg-[#090d16] border-r border-slate-800/80 flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Car className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-slate-100 tracking-tight leading-none">INSTANT MECHANIC</h1>
          <p className="text-[10px] font-medium text-blue-400 mt-1 uppercase tracking-wider">Live Dispatch Ops</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-4 space-y-1 flex-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
            </button>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-slate-800/80 m-4 rounded-xl bg-slate-900/40 border">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-semibold">Active</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full w-[94%]" />
        </div>
        <p className="text-[9px] text-slate-500 mt-2">Socket.io v4.7 • Latency ~12ms</p>
      </div>
    </aside>
  );
};
