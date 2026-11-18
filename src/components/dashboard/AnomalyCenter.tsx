import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Lock, ShieldCheck } from 'lucide-react';
import { AnomalyAlert, LanguageCode } from '../../types';
import { translations } from '../../i18n/translations';

interface AnomalyCenterProps {
  alerts: AnomalyAlert[];
  onResolveAlert: (alertId: string) => void;
  lang: LanguageCode;
}

export const AnomalyCenter: React.FC<AnomalyCenterProps> = ({
  alerts,
  onResolveAlert,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-[#14181F] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center space-x-2">
            <ShieldAlert className="w-7 h-7 text-amber-400 animate-bounce" />
            <span>{t.anomalyAlerts}</span>
          </h1>
          <p className="text-red-200 text-sm mt-1">
            Real-time automated siphoning detection, odometer anomaly flagging, and anti-theft asset freeze controls.
          </p>
        </div>

        <div className="bg-red-900/60 border border-red-500/50 px-4 py-2 rounded-xl text-xs font-mono font-bold text-amber-300">
          Status: Autonomous Defense Active
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {alerts.map(alt => (
          <div 
            key={alt.id} 
            className={`p-6 rounded-2xl shadow-sm border transition-all ${
              alt.status === 'Active' 
                ? 'bg-red-50/80 border-red-300 shadow-red-950/5' 
                : 'bg-white border-slate-200 opacity-75'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-2xl ${
                  alt.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-slate-900'
                }`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-900 text-base">{alt.type}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      alt.severity === 'Critical' ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'
                    }`}>
                      {alt.severity} Priority
                    </span>
                    <span className="font-mono text-xs text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      Plate: {alt.plateNumber}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-700 leading-relaxed">{alt.description}</p>
                  
                  <div className="text-xs text-slate-500 font-mono pt-1">
                    Timestamp: {alt.timestamp}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  alt.status === 'Active' ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-100 text-[#007A3D]'
                }`}>
                  {alt.status}
                </span>

                {alt.status === 'Active' && (
                  <button
                    onClick={() => onResolveAlert(alt.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-colors flex items-center space-x-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.resolveAlert}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-[#007A3D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">No Active Security Alerts</h3>
            <p className="text-sm text-slate-500">All branch vehicles and IoT fuel stations operate within normal parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
