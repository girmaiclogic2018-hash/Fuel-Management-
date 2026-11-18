import React, { useState } from 'react';
import { FileSearch, ShieldCheck, Download, Search, Printer, CheckCircle } from 'lucide-react';
import { FuelTransaction, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface InternalAuditProps {
  transactions: FuelTransaction[];
  lang: LanguageCode;
}

export const InternalAudit: React.FC<InternalAuditProps> = ({ transactions, lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.transactionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.faydaId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || tx.verificationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = ['Tx Code,Timestamp,Plate Number,Driver Name,Fayda ID,Station,Dispensed Liters,Total Cost ETB,Status,Immutable Hash\n'];
    const rows = filteredTransactions.map(tx => 
      `"${tx.transactionCode}","${tx.timestamp}","${tx.plateNumber}","${tx.driverName}","${tx.faydaId}","${tx.stationName}",${tx.dispensedLiters},${tx.totalCostEtb},"${tx.verificationStatus}","${tx.auditHash}"`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dire_Dawa_Customs_Audit_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{t.internalAudit}</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Zero-tamper immutable ledger inspection, 4-way cross-verification audit trails, and official report exports.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCsv}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Ledger</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Audit Statement</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase">Verification Filter:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
          >
            <option value="All">All Transactions</option>
            <option value="Verified">Verified Only</option>
            <option value="Anomaly Flagged">Anomaly Flagged</option>
          </select>
        </div>

        <div className="relative w-full sm:w-80">
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

      {/* Immutable Audit Ledger Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-[#007A3D]" />
            <span>Cryptographic Immutable Ledger Records ({filteredTransactions.length})</span>
          </div>
          <span className="text-xs font-mono text-slate-500">Append-Only SHA-256 Simulation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50/50">
                <th className="py-3 px-4">Tx Code & Timestamp</th>
                <th className="py-3 px-4">Vehicle & Driver (Fayda ID)</th>
                <th className="py-3 px-4">Station & Coupon</th>
                <th className="py-3 px-4">Volume & Cost (ETB)</th>
                <th className="py-3 px-4">Odometer & km/L</th>
                <th className="py-3 px-4">Immutable Ledger Hash</th>
                <th className="py-3 px-4">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/85 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900">{tx.transactionCode}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{tx.timestamp}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{tx.plateNumber}</div>
                    <div className="text-xs text-slate-600">{tx.driverName}</div>
                    <div className="text-[11px] font-mono text-emerald-700">{tx.faydaId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-xs font-semibold text-slate-800">{tx.stationName}</div>
                    <div className="text-[11px] font-mono text-amber-700">{tx.couponSerial}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{tx.dispensedLiters} Liters</div>
                    <div className="text-xs font-bold text-emerald-700">{tx.totalCostEtb.toFixed(2)} ETB</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div>{tx.odometerReading.toLocaleString()} km</div>
                    <div className="text-emerald-600 font-bold">{tx.calculatedKmPerLiter} km/L</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 max-w-[150px] truncate" title={tx.auditHash}>
                    {tx.auditHash}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      tx.verificationStatus === 'Verified' ? 'bg-emerald-100 text-[#007A3D]' : 'bg-red-100 text-red-700'
                    }`}>
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
