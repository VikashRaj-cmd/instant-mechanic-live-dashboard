import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { AnalyticsData } from '../../types';

interface AnalyticsViewProps {
  analytics: AnalyticsData | null;
  loading: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, loading }) => {
  if (loading || !analytics) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-slate-900/60 border border-slate-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  const { bookingsOverTime, statusBreakdown, categoryBreakdown } = analytics;

  const STATUS_COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Visual Operations Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive charts analyzing booking volume, revenue trends, status distribution, and service categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bookings Over Time (Area Chart) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 mb-1">Bookings Volume Over Time</h3>
          <p className="text-xs text-slate-400 mb-4">Monthly service booking trend line</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px', color: '#f3f4f6' }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue Over Time (Bar Chart) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 mb-1">Revenue Trend ($ USD)</h3>
          <p className="text-xs text-slate-400 mb-4">Gross monthly earnings from completed services</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px', color: '#f3f4f6' }}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Booking Status Breakdown (Donut Chart) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 mb-1">Booking Status Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Percentage allocation across service statuses</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="status"
                >
                  {statusBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px', color: '#f3f4f6' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-slate-300 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Service Category Breakdown (Horizontal Bar Chart) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 mb-1">Service & Category Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Total requests per service specialty category</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={categoryBreakdown} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" fontSize={10} tickLine={false} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', fontSize: '12px', color: '#f3f4f6' }}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
