import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnected: boolean;
  onRefresh: () => void;
  lastNotificationMsg?: string | null;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  isConnected,
  onRefresh,
  lastNotificationMsg
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-[#0b0f19]' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          isConnected={isConnected}
          onRefresh={onRefresh}
          lastNotificationMsg={lastNotificationMsg}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
