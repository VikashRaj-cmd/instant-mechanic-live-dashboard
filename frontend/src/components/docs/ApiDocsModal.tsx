import React from 'react';
import { X, Code2, Server, Globe, Terminal } from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const endpoints = [
    {
      method: 'GET',
      path: '/api/dashboard',
      desc: 'Retrieves overview summary KPI metrics (Total, Today, Completed, Pending, Cancelled, Revenue, Active Mechanics, New Customers) and visual analytics dataset.',
      params: 'None'
    },
    {
      method: 'GET',
      path: '/api/bookings',
      desc: 'Retrieves paginated list of vehicle bookings with multi-column text search, status filtering, category filtering, and sorting.',
      params: 'page, limit, search, status, category, sortBy, sortOrder'
    },
    {
      method: 'GET',
      path: '/api/bookings/:id',
      desc: 'Retrieves detailed booking record by Mongo ID or Booking ID (e.g. BK-10014).',
      params: 'id (Path parameter)'
    },
    {
      method: 'PATCH',
      path: '/api/bookings/:id/status',
      desc: 'Mutates booking status and triggers real-time Socket.io WebSocket event broadcast across all connected dashboard clients.',
      params: 'status, mechanicName'
    },
    {
      method: 'GET',
      path: '/api/mechanics',
      desc: 'Retrieves mechanic fleet roster including duty status, jobs completed count, rating, specialization, and GPS coordinates.',
      params: 'None'
    },
    {
      method: 'GET',
      path: '/api/customers',
      desc: 'Retrieves customer directory with registered vehicle details.',
      params: 'None'
    },
    {
      method: 'GET',
      path: '/api/services',
      desc: 'Retrieves service categories, base pricing, and estimated repair minutes.',
      params: 'None'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">Swagger / OpenAPI 3.0 Documentation</h3>
              <p className="text-xs text-slate-400">Instant Mechanic Live Operations Backend REST API</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Endpoint URLs */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300 font-mono">
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" /> Base REST API:
            </span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 text-[11px] truncate">
              {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300 font-mono">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" /> WebSocket Gateway:
            </span>
            <span className="text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/30 text-[11px] truncate">
              {import.meta.env.VITE_SOCKET_URL || 'ws://localhost:5000'} (Socket.io v4.7)
            </span>
          </div>
        </div>


        {/* Endpoints List */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">REST Endpoints Catalog</h4>

          {endpoints.map((ep, i) => (
            <div key={i} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-0.5 text-[11px] font-extrabold rounded font-mono ${
                    ep.method === 'GET'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-sm font-bold text-slate-100">{ep.path}</span>
              </div>

              <p className="text-xs text-slate-300">{ep.desc}</p>
              {ep.params !== 'None' && (
                <p className="text-[11px] text-slate-400 font-mono">Query / Path Params: {ep.params}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
