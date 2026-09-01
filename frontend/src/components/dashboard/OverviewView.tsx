import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  DollarSign,
  Wrench,
  UserPlus,
  Zap,
  Activity,
  Plus
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { OverviewStats } from '../../types';

interface OverviewViewProps {
  overview: OverviewStats | null;
  loading: boolean;
  onNavigateToBookings: () => void;
  lastNotificationMsg?: string | null;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  overview,
  loading,
  onNavigateToBookings,
  lastNotificationMsg
}) => {
  if (loading || !overview) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-900/60 border border-slate-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(overview.totalRevenue);

  return (
    <div className="space-y-6">
      {/* Header Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-950/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
            <Zap className="w-4 h-4" /> Operational Live Monitoring
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Instant Mechanic Control Center</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fleet operations, dispatch queue, active mechanics, and revenue analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToBookings}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" /> Manage Bookings
          </button>
        </div>
      </div>

      {/* 8 Required KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Bookings"
          value={overview.totalBookings.toLocaleString()}
          subtitle="All-time registered service jobs"
          icon={Calendar}
          trend="+12.4%"
          trendUp={true}
          color="blue"
        />

        <MetricCard
          title="Today's Bookings"
          value={overview.todaysBookings}
          subtitle="Scheduled & dispatched today"
          icon={Clock}
          trend="+8.1%"
          trendUp={true}
          color="indigo"
        />

        <MetricCard
          title="Completed Bookings"
          value={overview.completedBookings.toLocaleString()}
          subtitle="Successfully serviced & closed"
          icon={CheckCircle2}
          trend="+15.2%"
          trendUp={true}
          color="emerald"
        />

        <MetricCard
          title="Pending Bookings"
          value={overview.pendingBookings}
          subtitle="Awaiting mechanic assignment"
          icon={AlertCircle}
          trend="-3.2%"
          trendUp={false}
          color="amber"
        />

        <MetricCard
          title="Cancelled Bookings"
          value={overview.cancelledBookings}
          subtitle="Customer or system cancellations"
          icon={XCircle}
          trend="-1.5%"
          trendUp={false}
          color="rose"
        />

        <MetricCard
          title="Total Revenue"
          value={formattedRevenue}
          subtitle="Gross completed service revenue"
          icon={DollarSign}
          trend="+18.7%"
          trendUp={true}
          color="emerald"
        />

        <MetricCard
          title="Active Mechanics"
          value={`${overview.activeMechanics} / ${overview.totalMechanics}`}
          subtitle="Available or on active dispatch"
          icon={Wrench}
          trend="92% Active"
          trendUp={true}
          color="purple"
        />

        <MetricCard
          title="New Customers"
          value={overview.newCustomers}
          subtitle="Acquired in the last 30 days"
          icon={UserPlus}
          trend="+24%"
          trendUp={true}
          color="blue"
        />
      </div>

      {/* Live Dispatch Feed & Fleet Status Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-100">Live Operations Activity Feed</h3>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              WebSockets Streaming
            </span>
          </div>

          <div className="space-y-3">
            {lastNotificationMsg ? (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between text-xs text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer">
                <span className="font-semibold">{lastNotificationMsg}</span>
                <span className="text-[10px] text-blue-400">Just now</span>
              </div>
            ) : null}

            <div className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between text-xs transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Booking #BK-10014 → Mechanic On The Way</p>
                  <p className="text-[10px] text-slate-400">Carlos Rodriguez dispatched to Mission District, SF</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">2 mins ago</span>
            </div>

            <div className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between text-xs transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Booking #BK-10012 → Completed</p>
                  <p className="text-[10px] text-slate-400">Synthetic Oil Change • $85 Paid</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">8 mins ago</span>
            </div>

            <div className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between text-xs transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Booking #BK-10015 → Assigned to David Chen</p>
                  <p className="text-[10px] text-slate-400">Full Engine Diagnostic • Tesla Model 3</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">14 mins ago</span>
            </div>
          </div>

        </div>

        {/* Fleet Availability Quick Meter */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">Mechanics Duty Readiness</h3>
            <p className="text-xs text-slate-400 mb-4">Active operational breakdown of dispatch team</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">On Duty / In Transit</span>
                  <span className="text-blue-400 font-bold">14 Mechanics</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[65%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Available Standby</span>
                  <span className="text-emerald-400 font-bold">7 Mechanics</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Offline / Off Duty</span>
                  <span className="text-slate-500 font-bold">4 Mechanics</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-600 h-full w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Dispatch System SLA</span>
            <span className="text-emerald-400 font-semibold">99.8% Response Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
