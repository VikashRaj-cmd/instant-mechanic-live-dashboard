import React, { useState, useEffect } from 'react';
import { Wrench, Star, CheckCircle, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import { Mechanic } from '../../types';
import { fetchMechanics } from '../../services/api';

export const MechanicsView: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchMechanics();
        setMechanics(data);
      } catch (err) {
        console.error('[Error fetching mechanics]:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'On Duty':
      case 'In Transit':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30 animate-pulse';
      case 'Busy':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const filteredMechanics = filterStatus === 'All'
    ? mechanics
    : mechanics.filter(m => m.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Mechanics Fleet Roster</h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor mechanic status, jobs completed, ratings, and current active assignments.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {['All', 'Available', 'On Duty', 'In Transit', 'Busy', 'Offline'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-900/60 border border-slate-800 rounded-2xl animate-pulse" />
          ))
        ) : filteredMechanics.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm font-semibold text-slate-300">No mechanics found for status filter '{filterStatus}'.</p>
          </div>
        ) : (
          filteredMechanics.map((mech) => (
            <div
              key={mech._id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={mech.avatar}
                      alt={mech.name}
                      className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-blue-400 transition-colors">
                        {mech.name}
                      </h3>
                      <p className="text-[11px] text-blue-400 flex items-center gap-1 font-medium mt-0.5">
                        <Award className="w-3 h-3" /> {mech.specialization}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(mech.status)}`}>
                    {mech.status}
                  </span>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Jobs Completed</p>
                      <p className="text-xs font-bold text-slate-200">{mech.jobsCompleted} Services</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Rating</p>
                      <p className="text-xs font-bold text-slate-200">{mech.rating} / 5.0</p>
                    </div>
                  </div>
                </div>

                {/* Location & Current Booking */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span className="truncate text-slate-400">{mech.location?.address || 'Operational Depot'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-400">
                      Active Task:{' '}
                      <span className="font-semibold text-slate-200">
                        {mech.status === 'On Duty' || mech.status === 'In Transit' || mech.status === 'Busy'
                          ? 'Emergency Dispatch #BK-10014'
                          : 'Standby for Dispatch'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" /> {mech.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-500" /> {mech.email}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
