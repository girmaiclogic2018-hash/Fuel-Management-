import React from 'react';
import { Shield, Globe, User, LogOut, Info, AlertTriangle } from 'lucide-react';
import { UserProfile, LanguageCode, UserRole } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  user: UserProfile;
  onLogout: () => void;
  onOpenAbout: () => void;
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  onSwitchRole: (role: UserRole) => void;
  alertCount: number;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onOpenAbout,
  lang,
  onChangeLang,
  onSwitchRole,
  alertCount,
  onSelectTab,
  activeTab
}) => {
  const t = translations[lang];

  const roleLabels: Record<UserRole, string> = {
    executive: '👑 Executive Command',
    logistics: '🚚 Logistics & Dispatch',
    station: '⛽ Fuel Station & Coupons',
    finance: '💰 Procurement & Finance',
    property: '🏢 Property Administration',
    audit: '🔍 Internal Audit (Anti-Theft)'
  };

  return (
    <header className="bg-[#14181F] text-white sticky top-0 z-40 border-b border-emerald-900/40 shadow-lg">
      {/* Habesha Tribeb Top Accent Strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#007A3D] via-[#FCDD09] to-[#DA121A]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Branch Branding */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-600 to-[#007A3D] p-2.5 rounded-xl shadow-md border border-amber-400/40">
              <Shield className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                  {t.appName}
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/30">
                  SECURE v2.6
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Controls: Language Selector, Alerts, User Profile, About */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-800/80 rounded-xl px-2.5 py-1.5 border border-slate-700">
              <Globe className="w-4 h-4 text-emerald-400 mr-2" />
              <select
                value={lang}
                onChange={(e) => onChangeLang(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-hidden cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="am" className="bg-slate-900 text-white">አማርኛ (Amharic)</option>
                <option value="om" className="bg-slate-900 text-white">Afaan Oromoo</option>
                <option value="so" className="bg-slate-900 text-white">Af-Soomaali</option>
                <option value="ti" className="bg-slate-900 text-white">ትግርኛ (Tigrinya)</option>
              </select>
            </div>

            {/* Anomaly Alert Quick Notification Bell */}
            <button
              onClick={() => onSelectTab('alerts')}
              className={`relative p-2 rounded-xl border transition-colors flex items-center justify-center ${
                activeTab === 'alerts' 
                  ? 'bg-red-600/30 border-red-500 text-red-300' 
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Security & Theft Alerts"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {alertCount}
                </span>
              )}
            </button>

            {/* Role Switcher & User Profile */}
            <div className="hidden md:flex items-center space-x-3 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover border border-emerald-500"
              />
              <div className="text-left pr-2">
                <div className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</div>
                <select
                  value={user.role}
                  onChange={(e) => onSwitchRole(e.target.value as UserRole)}
                  className="bg-transparent text-[11px] text-emerald-400 font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="executive" className="bg-slate-900">Executive Command</option>
                  <option value="logistics" className="bg-slate-900">Logistics & Dispatch</option>
                  <option value="station" className="bg-slate-900">Fuel Station Ops</option>
                  <option value="finance" className="bg-slate-900">Procurement & Finance</option>
                  <option value="property" className="bg-slate-900">Property Admin</option>
                  <option value="audit" className="bg-slate-900">Internal Audit</option>
                </select>
              </div>
            </div>

            {/* About Modal Button */}
            <button
              onClick={onOpenAbout}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="System & Developer Info"
            >
              <Info className="w-5 h-5 text-emerald-400" />
            </button>

            {/* Logout / Switch User */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-red-900/30 border border-red-700/50 text-red-300 hover:bg-red-900/50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
