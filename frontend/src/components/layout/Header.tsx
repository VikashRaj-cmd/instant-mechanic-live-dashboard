import React from 'react';
import { Activity, Bell, Search, RefreshCw, Moon, Sun, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
  onRefresh: () => void;
  lastNotificationMsg?: string | null;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isConnected,
  onRefresh,
  lastNotificationMsg,
  darkMode,
  setDarkMode
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between">
      {/* Search Input Bar */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Global search bookings, mechanics..."
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/60 border border-slate-700/60 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Center Live Notification Toast Banner if active */}
      {lastNotificationMsg && (
        <div className="hidden lg:flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-xs text-blue-400 animate-pulse">
          <Activity className="w-3.5 h-3.5" />
          <span className="font-medium">{lastNotificationMsg}</span>
        </div>
      )}

      {/* Right Quick Controls */}
      <div className="flex items-center gap-4">
        {/* Real-time WebSockets Connection Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-900 border border-slate-800">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
            }`}
          />
          <span className="text-slate-300 font-medium">
            {isConnected ? 'Live WebSockets' : 'Connecting...'}
          </span>
        </div>

        {/* Manual Refresh Button */}
        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
        </button>

        {/* User Operations Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-semibold text-xs">
            OP
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">Ops Manager</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" /> Operations HQ
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
