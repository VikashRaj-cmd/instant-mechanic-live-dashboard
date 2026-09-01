import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { OverviewView } from './components/dashboard/OverviewView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { BookingsView } from './components/bookings/BookingsView';
import { MechanicsView } from './components/mechanics/MechanicsView';
import { LiveMapView } from './components/map/LiveMapView';
import { ApiDocsModal } from './components/docs/ApiDocsModal';
import { useSocket } from './hooks/useSocket';
import { fetchDashboardData } from './services/api';
import { DashboardResponse } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isApiDocsOpen, setIsApiDocsOpen] = useState<boolean>(false);

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
    loadData();
  });

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isConnected={isConnected}
      onRefresh={loadData}
      lastNotificationMsg={lastNotification?.message}
      onOpenApiDocs={() => setIsApiDocsOpen(true)}
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
        <LiveMapView />
      )}

      {/* Swagger / OpenAPI Interactive Documentation Modal */}
      <ApiDocsModal
        isOpen={isApiDocsOpen}
        onClose={() => setIsApiDocsOpen(false)}
      />
    </Layout>
  );
}
