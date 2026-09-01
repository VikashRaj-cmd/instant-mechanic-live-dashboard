import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { OverviewView } from './components/dashboard/OverviewView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { BookingsView } from './components/bookings/BookingsView';
import { MechanicsView } from './components/mechanics/MechanicsView';
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
    // Soft reload overview stats on WebSocket update
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
        <BookingsView onRefreshTriggered={loadData} />
      )}

      {activeTab === 'mechanics' && (
        <MechanicsView />
      )}

      {activeTab === 'map' && (
        <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold text-slate-200">Live Mechanics Location Map</h2>
          <p className="text-xs text-slate-400 mt-1">Coming up in Stage 7 Bonus Enhancements</p>
        </div>
      )}
    </Layout>
  );
}
