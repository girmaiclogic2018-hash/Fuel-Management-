import React, { useState } from 'react';
import { Truck, UserCheck, Plus, ShieldCheck, Search, Wrench, CheckCircle } from 'lucide-react';
import { Vehicle, Driver, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface LogisticsDispatchProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  onAddVehicle: (vehicle: Vehicle) => void;
  onAddDriver: (driver: Driver) => void;
  lang: LanguageCode;
}

export const LogisticsDispatch: React.FC<LogisticsDispatchProps> = ({
  vehicles,
  drivers,
  onAddVehicle,
  onAddDriver,
  lang
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'vehicles' | 'drivers'>('vehicles');

  // Modal states
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);

  // New Vehicle form
  const [newPlate, setNewPlate] = useState('');
  const [newBranchCode, setNewBranchCode] = useState('DD-CUST-06');
  const [newModel, setNewModel] = useState('');
  const [newFuelType, setNewFuelType] = useState<'Diesel' | 'Petrol'>('Diesel');
  const [newTank, setNewTank] = useState(80);
  const [newKmPL, setNewKmPL] = useState(10.0);
  const [newOdo, setNewOdo] = useState(10000);
  const [newDept, setNewDept] = useState('Enforcement & Anti-Smuggling');

  // New Driver form
  const [newDriverName, setNewDriverName] = useState('');
  const [newFaydaId, setNewFaydaId] = useState('FD-998822331');
  const [newLicense, setNewLicense] = useState('ET-DL-99881');
  const [newPhone, setNewPhone] = useState('+251 911 000 111');
  const [newDriverDept, setNewDriverDept] = useState('Enforcement & Anti-Smuggling');

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const v: Vehicle = {
      id: `veh-${Date.now()}`,
      plateNumber: newPlate,
      branchCode: newBranchCode,
      model: newModel,
      fuelType: newFuelType,
      tankCapacityLiters: Number(newTank),
      standardKmPerLiter: Number(newKmPL),
      currentOdometer: Number(newOdo),
      department: newDept,
      assignedDriverId: drivers[0]?.id || 'drv-01',
      status: 'Active'
    };
    onAddVehicle(v);
    setShowVehicleModal(false);
    setNewPlate('');
    setNewModel('');
  };

  const handleCreateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const d: Driver = {
      id: `drv-${Date.now()}`,
      fullName: newDriverName,
      faydaId: newFaydaId,
      licenseNumber: newLicense,
      phone: newPhone,
      department: newDriverDept,
      status: 'Verified'
    };
    onAddDriver(d);
    setShowDriverModal(false);
    setNewDriverName('');
    setNewFaydaId('');
  };

  const filteredVehicles = vehicles.filter(v => 
    v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDrivers = drivers.filter(d =>
    d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.faydaId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{t.logisticsDispatch}</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Vehicle master profiles, Fayda Digital ID driver binding, and dispatch telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowVehicleModal(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewVehicle}</span>
          </button>
          <button
            onClick={() => setShowDriverModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewDriver}</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'vehicles' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fleet Vehicles ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'drivers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registered Drivers ({drivers.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#007A3D] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Content Table */}
      {activeTab === 'vehicles' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                  <th className="py-3 px-4">Plate & Branch Code</th>
                  <th className="py-3 px-4">Vehicle Model</th>
                  <th className="py-3 px-4">Fuel & Tank</th>
                  <th className="py-3 px-4">Std. km/L</th>
                  <th className="py-3 px-4">Odometer (km)</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredVehicles.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50/85 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{v.plateNumber}</div>
                      <div className="text-xs font-mono text-emerald-700">{v.branchCode}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{v.model}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900">{v.fuelType}</span>
                      <div className="text-xs text-slate-500">{v.tankCapacityLiters} Liters</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{v.standardKmPerLiter} km/L</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{v.currentOdometer.toLocaleString()} km</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{v.department}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        v.status === 'Active' ? 'bg-emerald-100 text-[#007A3D]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                  <th className="py-3 px-4">Full Legal Name</th>
                  <th className="py-3 px-4">Fayda Digital ID</th>
                  <th className="py-3 px-4">License Number</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Fayda Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredDrivers.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50/85 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{d.fullName}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{d.faydaId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{d.licenseNumber}</td>
                    <td className="py-3.5 px-4 text-slate-600">{d.phone}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{d.department}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#007A3D] flex items-center space-x-1 w-fit">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{d.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-800/20">
            <div className="bg-[#14181F] text-white p-6">
              <h3 className="text-lg font-bold">Register New Fleet Vehicle</h3>
              <p className="text-xs text-emerald-300">Dire Dawa Customs Branch Master Registry</p>
            </div>
            <form onSubmit={handleCreateVehicle} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plate Number</label>
                  <input
                    type="text"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    placeholder="3-XXXXX AA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Branch Code</label>
                  <input
                    type="text"
                    value={newBranchCode}
                    onChange={(e) => setNewBranchCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Model & Description</label>
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Toyota Land Cruiser V8"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={newFuelType}
                    onChange={(e) => setNewFuelType(e.target.value as 'Diesel' | 'Petrol')}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tank Capacity (L)</label>
                  <input
                    type="number"
                    value={newTank}
                    onChange={(e) => setNewTank(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Std km/L</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newKmPL}
                    onChange={(e) => setNewKmPL(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#007A3D] text-white rounded-xl font-semibold text-sm hover:bg-emerald-800"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-emerald-800/20">
            <div className="bg-[#14181F] text-white p-6">
              <h3 className="text-lg font-bold">Register Driver with Fayda Digital ID</h3>
              <p className="text-xs text-emerald-300">National ID Anti-Ghost Driver Verification</p>
            </div>
            <form onSubmit={handleCreateDriver} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  placeholder="Abebe Kebede Tadesse"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fayda Digital ID Number</label>
                <input
                  type="text"
                  value={newFaydaId}
                  onChange={(e) => setNewFaydaId(e.target.value)}
                  placeholder="FD-893104829"
                  className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl px-3 py-2 text-sm font-mono font-bold text-emerald-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">License Number</label>
                  <input
                    type="text"
                    value={newLicense}
                    onChange={(e) => setNewLicense(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowDriverModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#007A3D] text-white rounded-xl font-semibold text-sm hover:bg-emerald-800"
                >
                  Verify & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
