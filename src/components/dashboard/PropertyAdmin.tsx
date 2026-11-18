import React, { useState } from 'react';
import { Building2, Wrench, Calendar, CheckCircle, Plus, ShieldCheck } from 'lucide-react';
import { MaintenanceRecord, Vehicle, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface PropertyAdminProps {
  maintenance: MaintenanceRecord[];
  vehicles: Vehicle[];
  onAddMaintenance: (rec: MaintenanceRecord) => void;
  lang: LanguageCode;
}

export const PropertyAdmin: React.FC<PropertyAdminProps> = ({
  maintenance,
  vehicles,
  onAddMaintenance,
  lang
}) => {
  const t = translations[lang];
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 'veh-01');
  const [serviceType, setServiceType] = useState('50,000 km Full Overhaul & Brake Inspection');
  const [scheduledMileage, setScheduledMileage] = useState(50000);
  const [serviceDate, setServiceDate] = useState('2026-11-25');

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
    const rec: MaintenanceRecord = {
      id: `mnt-${Date.now()}`,
      vehicleId: vehicle.id,
      plateNumber: vehicle.plateNumber,
      serviceType,
      scheduledMileage: Number(scheduledMileage),
      status: 'Scheduled',
      date: serviceDate
    };
    onAddMaintenance(rec);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{t.propertyAdmin}</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Fleet operational readiness, mileage-triggered preventive maintenance schedules, and physical asset governance.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Maintenance</span>
        </button>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-[#007A3D]" />
            <span>Scheduled Preventive Maintenance Records</span>
          </h2>
          <span className="text-xs font-bold bg-emerald-100 text-[#007A3D] px-3 py-1 rounded-full">
            {maintenance.length} Active Schedules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                <th className="py-3 px-4">Vehicle Plate</th>
                <th className="py-3 px-4">Service Description</th>
                <th className="py-3 px-4">Scheduled Mileage</th>
                <th className="py-3 px-4">Service Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {maintenance.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/85 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.plateNumber}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{m.serviceType}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{m.scheduledMileage.toLocaleString()} km</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{m.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Maintenance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-800/20">
            <div className="bg-[#14181F] text-white p-6">
              <h3 className="text-lg font-bold">Schedule Preventive Maintenance</h3>
              <p className="text-xs text-emerald-300">Property Administration & General Services</p>
            </div>
            <form onSubmit={handleMaintenanceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Vehicle</label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plateNumber} ({v.model})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Type & Scope</label>
                <input
                  type="text"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Mileage (km)</label>
                  <input
                    type="number"
                    value={scheduledMileage}
                    onChange={(e) => setScheduledMileage(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#007A3D] text-white rounded-xl font-semibold text-sm hover:bg-emerald-800"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
