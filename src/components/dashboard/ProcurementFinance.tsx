import React, { useState } from 'react';
import { Coins, TrendingUp, ShieldCheck, Plus, DollarSign, Building } from 'lucide-react';
import { FuelPriceRecord, FuelTransaction, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface ProcurementFinanceProps {
  prices: FuelPriceRecord[];
  transactions: FuelTransaction[];
  onUpdatePrice: (record: FuelPriceRecord) => void;
  lang: LanguageCode;
}

export const ProcurementFinance: React.FC<ProcurementFinanceProps> = ({
  prices,
  transactions,
  onUpdatePrice,
  lang
}) => {
  const t = translations[lang];
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [dieselPrice, setDieselPrice] = useState(74.85);
  const [petrolPrice, setPetrolPrice] = useState(82.10);

  const totalSpent = transactions.reduce((acc, tx) => acc + tx.totalCostEtb, 142850.75);
  const monthlyCeiling = 500000.00;
  const budgetUtilization = (totalSpent / monthlyCeiling) * 100;

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rec: FuelPriceRecord = {
      id: `prc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      dieselPrice: Number(dieselPrice),
      petrolPrice: Number(petrolPrice),
      approvedBy: 'Dire Dawa Customs Branch Finance Directorate'
    };
    onUpdatePrice(rec);
    setShowPriceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{t.procurementFinance}</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Daily market price governance, departmental budget ceilings, and real-time ETB expenditure computation.
          </p>
        </div>

        <button
          onClick={() => setShowPriceModal(true)}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t.updatePrice}</span>
        </button>
      </div>

      {/* Budget Ceiling & Expenditure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Branch Expenditure</div>
          <div className="text-3xl font-extrabold text-slate-900">
            {totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg font-bold text-slate-500">ETB</span>
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>Computed in Real-Time</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Budget Ceiling</div>
          <div className="text-3xl font-extrabold text-slate-900">
            {monthlyCeiling.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-lg font-bold text-slate-500">ETB</span>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Allocated by Customs Commission HQ
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Budget Utilization</div>
          <div className="text-3xl font-extrabold text-[#007A3D]">
            {budgetUtilization.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-[#007A3D] h-2.5 rounded-full" 
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Official Market Prices Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <span>Official Fuel Market Price Records (ETB / Liter)</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">Regulated by Ministry of Trade</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                <th className="py-3 px-4">Effective Date</th>
                <th className="py-3 px-4">Diesel Price (ETB/L)</th>
                <th className="py-3 px-4">Petrol Price (ETB/L)</th>
                <th className="py-3 px-4">Approved By Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {prices.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/85 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{p.date}</td>
                  <td className="py-3.5 px-4 font-bold text-[#007A3D]">{p.dieselPrice.toFixed(2)} ETB</td>
                  <td className="py-3.5 px-4 font-bold text-amber-700">{p.petrolPrice.toFixed(2)} ETB</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{p.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Price Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-800/20">
            <div className="bg-[#14181F] text-white p-6">
              <h3 className="text-lg font-bold">Update Official Fuel Market Prices</h3>
              <p className="text-xs text-emerald-300">Dire Dawa Branch Finance Directorate</p>
            </div>
            <form onSubmit={handlePriceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Diesel Price per Liter (ETB)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dieselPrice}
                  onChange={(e) => setDieselPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Petrol Price per Liter (ETB)</label>
                <input
                  type="number"
                  step="0.01"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowPriceModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#007A3D] text-white rounded-xl font-semibold text-sm hover:bg-emerald-800"
                >
                  Approve & Broadcast Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
