import React from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Fuel, 
  Coins, 
  Building2, 
  ShieldAlert, 
  FileSearch, 
  Info,
  ChevronRight
} from 'lucide-react';
import { LanguageCode, UserRole } from '../types';
import { translations } from '../i18n/translations';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userRole: UserRole;
  lang: LanguageCode;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  lang,
  alertCount
}) => {
  const t = translations[lang];

  const menuItems = [
    {
      id: 'executive',
      label: t.executiveCommand,
      icon: LayoutDashboard,
      roles: ['executive', 'logistics', 'station', 'finance', 'property', 'audit']
    },
    {
      id: 'logistics',
      label: t.logisticsDispatch,
      icon: Truck,
      roles: ['executive', 'logistics', 'audit']
    },
    {
      id: 'stations',
      label: t.fuelStations,
      icon: Fuel,
      roles: ['executive', 'station', 'finance', 'audit']
    },
    {
      id: 'finance',
      label: t.procurementFinance,
      icon: Coins,
      roles: ['executive', 'finance', 'audit']
    },
    {
      id: 'property',
      label: t.propertyAdmin,
      icon: Building2,
      roles: ['executive', 'property', 'audit']
    },
    {
      id: 'audit',
      label: t.internalAudit,
      icon: FileSearch,
      roles: ['executive', 'audit']
    },
    {
      id: 'alerts',
      label: t.anomalyAlerts,
      icon: ShieldAlert,
      roles: ['executive', 'logistics', 'station', 'finance', 'property', 'audit'],
      badge: alertCount
    }
  ];

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200 p-4 space-y-6 shadow-xs">
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Institutional Workflows
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-[#007A3D] text-white shadow-md shadow-emerald-900/10'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span className="text-left leading-snug">{item.label}</span>
              </div>
              
              <div className="flex items-center space-x-1.5">
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-red-600' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Institutional Footer Card in Sidebar */}
      <div className="bg-gradient-to-br from-slate-900 to-[#14181F] text-white p-4 rounded-2xl shadow-md border border-emerald-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#007A3D] via-[#FCDD09] to-[#DA121A]" />
        <div className="text-xs font-bold text-amber-300 mb-1">Dire Dawa Customs Branch</div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
          Zero-leakage governance platform powered by automated 4-way cross-verification and Fayda ID binding.
        </p>
        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
          Status: Secure & Operational
        </div>
      </div>
    </aside>
  );
};
