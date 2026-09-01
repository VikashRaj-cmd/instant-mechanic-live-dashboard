import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { useSocket } from './hooks/useSocket';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const { isConnected, lastNotification } = useSocket((booking, message) => {
    console.log('[Real-Time Update Received]:', booking, message);
  });

  const handleRefresh = () => {
    console.log('[Manual Refresh Triggered]');
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isConnected={isConnected}
      onRefresh={handleRefresh}
      lastNotificationMsg={lastNotification?.message}
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-3xl mb-4 animate-bounce">
          🚗
        </div>
        <h2 className="text-xl font-bold text-slate-100">Instant Mechanic Live Operations Dashboard</h2>
        <p className="text-xs text-slate-400 max-w-md mt-2">
          Stage 4 Frontend shell layout and Socket.io gateway loaded.
        </p>
      </div>
    </Layout>
  );
}
