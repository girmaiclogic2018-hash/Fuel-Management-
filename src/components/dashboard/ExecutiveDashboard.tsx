import React from 'react';
import { 
  Fuel, 
  Coins, 
  Truck, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  MapPin,
  Building
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Vehicle, FuelTransaction, AnomalyAlert, FuelStation, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface ExecutiveDashboardProps {
  vehicles: Vehicle[];
  transactions: FuelTransaction[];
  alerts: AnomalyAlert[];
  stations: FuelStation[];
  lang: LanguageCode;
  onNavigate: (tab: string) => void;
}

const monthlyExpenditureData = [
  { month: 'Jun 2026', expenditure: 380000, ceiling: 450000 },
  { month: 'Jul 2026', expenditure: 420000, ceiling: 450000 },
  { month: 'Aug 2026', expenditure: 485000, ceiling: 450000 }, // Exceeded
  { month: 'Sep 2026', expenditure: 440000, ceiling: 450000 },
  { month: 'Oct 2026', expenditure: 512000, ceiling: 450000 }, // Exceeded
  { month: 'Nov 2026', expenditure: 418500, ceiling: 450000 },
];

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  const isExceeded = payload.expenditure > payload.ceiling;

  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={isExceeded ? 7 : 5} 
      fill={isExceeded ? '#DA121A' : '#007A3D'} 
      stroke="#fff" 
      strokeWidth={2} 
    />
  );
};

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  vehicles,
  transactions,
  alerts,
  stations,
  lang,
  onNavigate
}) => {
  const t = translations[lang];

  // Calculate totals
  const totalSpend = transactions.reduce((acc, tx) => acc + tx.totalCostEtb, 142850.75); // base + live
  const totalLiters = transactions.reduce((acc, tx) => acc + tx.dispensedLiters, 1892.3);
  const activeFleetCount = vehicles.filter(v => v.status === 'Active').length;
  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Welcome Executive Banner */}
      <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden border border-emerald-800/30">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#007A3D] via-[#FCDD09] to-[#DA121A]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Building className="w-4 h-4" />
              <span>Federal Democratic Republic of Ethiopia • Customs Commission</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dire Dawa Branch Executive Command
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
              Real-time anti-theft governance, IoT telemetry cross-verification, and financial audit intelligence for institutional fleet operations.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('audit')}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
            >
              <span>{t.generateReport}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Spend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.totalSpendEtb}</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETB
            </div>
            <div className="flex items-center text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>Within Monthly Budget Ceiling</span>
            </div>
          </div>
          <div className="bg-emerald-50 text-[#007A3D] p-4 rounded-2xl">
            <Coins className="w-7 h-7" />
          </div>
        </div>

        {/* Total Liters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.totalLitersConsumed}</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalLiters.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L
            </div>
            <div className="flex items-center text-xs text-slate-500 font-semibold mt-1">
              <span>Across 3 Partner Stations</span>
            </div>
          </div>
          <div className="bg-amber-50 text-amber-700 p-4 rounded-2xl">
            <Fuel className="w-7 h-7" />
          </div>
        </div>

        {/* Active Fleet */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.activeFleet}</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {activeFleetCount} / {vehicles.length} Units
            </div>
            <div className="flex items-center text-xs text-emerald-600 font-semibold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>Fayda ID Drivers Bound</span>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl">
            <Truck className="w-7 h-7" />
          </div>
        </div>

        {/* Active Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between cursor-pointer hover:border-red-400 transition-all"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.activeAlerts}</div>
            <div className="text-2xl font-extrabold text-red-600 mt-1">
              {activeAlertsCount} Critical
            </div>
            <div className="flex items-center text-xs text-red-600 font-semibold mt-1 animate-pulse">
              <span>Requires Investigation</span>
            </div>
          </div>
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl">
            <ShieldAlert className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* Monthly Expenditure Trend vs Budget Ceiling Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Coins className="w-5 h-5 text-[#007A3D]" />
              <span>Monthly Fuel Expenditure vs. Budget Ceiling (ETB)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Months exceeding the approved 450,000 ETB ceiling are highlighted in <span className="text-[#DA121A] font-bold">Crimson Red</span>.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#007A3D]" />
              <span className="text-slate-700">Compliant Spend</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#DA121A]" />
              <span className="text-slate-700">Exceeded Threshold</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-4 h-0.5 bg-amber-500 inline-block" />
              <span className="text-slate-700">Budget Ceiling</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyExpenditureData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip 
                formatter={(value: any, name: any) => [
                  `${Number(value).toLocaleString()} ETB`, 
                  name === 'expenditure' ? 'Actual Expenditure' : 'Budget Ceiling'
                ]}
                contentStyle={{ backgroundColor: '#14181F', border: 'none', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="expenditure" 
                name="expenditure" 
                stroke="#007A3D" 
                strokeWidth={3} 
                dot={<CustomizedDot />} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="ceiling" 
                name="ceiling" 
                stroke="#D9A300" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Station Reconciliation & Live Anomaly Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Station Reconciliation Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#007A3D]" />
              <span>{t.stationReconciliation} & IoT Telemetry</span>
            </h2>
            <button 
              onClick={() => onNavigate('stations')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View All Stations →
            </button>
          </div>

          <div className="space-y-3">
            {stations.map(stn => (
              <div key={stn.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{stn.name}</div>
                  <div className="text-xs text-slate-500">{stn.location}</div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Diesel / Petrol Price</div>
                    <div className="text-xs font-bold text-slate-900">
                      {stn.dieselPricePerLiter} ETB / {stn.petrolPricePerLiter} ETB
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    stn.iotStatus === 'Online' 
                      ? 'bg-emerald-100 text-[#007A3D]' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    IoT {stn.iotStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Anomaly Alerts Ticker */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Security Anomaly Log</span>
            </h2>
            <button 
              onClick={() => onNavigate('alerts')}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Manage →
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map(alt => (
              <div key={alt.id} className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-red-700">{alt.type}</span>
                  <span className="text-[10px] font-mono text-slate-500">{alt.plateNumber}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{alt.description}</p>
                <div className="text-[10px] text-slate-500 pt-1">{alt.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Immutable Audit Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Immutable Refueling Ledger</h2>
          <button 
            onClick={() => onNavigate('audit')}
            className="text-xs font-bold text-[#007A3D] hover:underline"
          >
            Full Ledger & 4-Way Verify →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Tx Code</th>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Driver (Fayda ID)</th>
                <th className="py-3 px-4">Station</th>
                <th className="py-3 px-4">Dispensed</th>
                <th className="py-3 px-4">Total Cost</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-slate-900">{tx.transactionCode}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{tx.plateNumber}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{tx.driverName}</div>
                    <div className="text-xs font-mono text-emerald-700">{tx.faydaId}</div>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">{tx.stationName}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{tx.dispensedLiters} L</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">{tx.totalCostEtb.toFixed(2)} ETB</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#007A3D]">
                      {tx.verificationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
