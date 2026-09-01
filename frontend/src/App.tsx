import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { OverviewView } from './components/dashboard/OverviewView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { useSocket } from './hooks/useSocket';
import { fetchDashboardData } from './services/api';
import { DashboardResponse } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchDashboardData();
      setDashboardData(res);
    } catch (err) {
      console.error('[Error fetching dashboard data]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const { isConnected, lastNotification } = useSocket((_updatedBooking, _message) => {
    // Soft update metrics on real-time event
    loadData();
  });

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isConnected={isConnected}
      onRefresh={loadData}
      lastNotificationMsg={lastNotification?.message}
    >
      {activeTab === 'overview' && (
        <OverviewView
          overview={dashboardData?.overview || null}
          loading={loading}
          onNavigateToBookings={() => setActiveTab('bookings')}
          lastNotificationMsg={lastNotification?.message}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView
          analytics={dashboardData?.analytics || null}
          loading={loading}
        />
      )}

      {activeTab === 'bookings' && (
        <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold text-slate-200">Bookings Table View</h2>
          <p className="text-xs text-slate-400 mt-1">Coming up in Stage 6 implementation</p>
        </div>
      )}

      {activeTab === 'mechanics' && (
        <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold text-slate-200">Mechanics Fleet Roster View</h2>
          <p className="text-xs text-slate-400 mt-1">Coming up in Stage 6 implementation</p>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="p-8 text-center glass-panel rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold text-slate-200">Live Location Map View</h2>
          <p className="text-xs text-slate-400 mt-1">Coming up in Stage 7 implementation</p>
        </div>
      )}
    </Layout>
  );
}
