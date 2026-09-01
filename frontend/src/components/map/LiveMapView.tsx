import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Wrench, Star, Phone, ShieldCheck, Radio } from 'lucide-react';
import { Mechanic } from '../../types';
import { fetchMechanics } from '../../services/api';

export const LiveMapView: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchMechanics();
        setMechanics(data);
        if (data.length > 0) setSelectedMechanic(data[0]);
      } catch (err) {
        console.error('[Error fetching mechanics for map]:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Live Mechanic Fleet GPS Map</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time geospatial tracking of on-duty mechanics across San Francisco & Bay Area districts.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <Radio className="w-4 h-4 animate-pulse" /> Live Telemetry Feed
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Canvas Grid */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 relative min-h-[500px] flex flex-col justify-between overflow-hidden bg-slate-950">
          {/* Subtle Map Grid Overlay Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Map Header Status Bar */}
          <div className="relative z-10 flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>San Francisco Metro Area Operations Grid</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">LAT: 37.7749° N, LNG: 122.4194° W</span>
          </div>

          {/* Interactive Mechanic GPS Markers Container */}
          <div className="relative z-10 flex-1 my-6 relative min-h-[360px] border border-slate-800/60 rounded-xl bg-[#090d16]/80 p-4">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">
                Loading GPS Telemetry...
              </div>
            ) : (
              mechanics.map((mech, idx) => {
                // Map mock lat/lng to percentage bounds on map canvas
                const topPct = 20 + ((idx * 17) % 65);
                const leftPct = 15 + ((idx * 23) % 70);
                const isSelected = selectedMechanic?._id === mech._id;

                return (
                  <button
                    key={mech._id}
                    onClick={() => setSelectedMechanic(mech)}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                      isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                    }`}
                  >
                    {/* Pulse Circle */}
                    <span
                      className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                        mech.status === 'Available'
                          ? 'bg-emerald-500'
                          : mech.status === 'On Duty'
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                    />

                    {/* Marker Icon Pin */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-xl ${
                        isSelected
                          ? 'bg-blue-600 border-white text-white glow-blue'
                          : mech.status === 'Available'
                          ? 'bg-slate-900 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-blue-500 text-blue-400'
                      }`}
                    >
                      <Wrench className="w-4 h-4" />
                    </div>

                    {/* Marker Tooltip Label */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-700 text-white text-[10px] px-2 py-1 rounded-md shadow-2xl pointer-events-none">
                      {mech.name} • {mech.status}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available Standby
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> On Duty / Dispatched
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Busy / In Transit
              </span>
            </div>
            <span>{mechanics.length} Units Active</span>
          </div>
        </div>

        {/* Selected Mechanic Detail Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          {selectedMechanic ? (
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-4">
                <img
                  src={selectedMechanic.avatar}
                  alt={selectedMechanic.name}
                  className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 object-cover"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-100">{selectedMechanic.name}</h3>
                  <p className="text-xs text-blue-400 font-medium">{selectedMechanic.specialization}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {selectedMechanic.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">GPS Location</p>
                  <p className="text-slate-200 font-medium mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {selectedMechanic.location?.address}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Lat: {selectedMechanic.location?.lat.toFixed(4)}, Lng: {selectedMechanic.location?.lng.toFixed(4)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">Performance Rating</p>
                  <div className="flex items-center gap-1 mt-0.5 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{selectedMechanic.rating} / 5.0 Rating</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">Completed Jobs</p>
                  <p className="text-slate-200 font-bold mt-0.5">{selectedMechanic.jobsCompleted} Completed Repairs</p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Current Dispatch Assignment</p>
                  <p className="text-xs font-semibold text-blue-400 mt-1">
                    {selectedMechanic.status === 'On Duty' || selectedMechanic.status === 'In Transit'
                      ? 'Dispatch #BK-10014 • Emergency Oil Service'
                      : 'Available for immediate dispatch'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">Select a mechanic pin on the map</div>
          )}

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> {selectedMechanic?.phone}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Certified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
