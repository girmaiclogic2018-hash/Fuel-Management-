import React, { useState } from 'react';
import { 
  UserProfile, 
  LanguageCode, 
  UserRole, 
  Vehicle, 
  Driver, 
  FuelStation, 
  FuelCoupon, 
  FuelTransaction, 
  AnomalyAlert, 
  FuelPriceRecord, 
  MaintenanceRecord 
} from './types';
import { translations } from './i18n/translations';
import { 
  initialVehicles, 
  initialDrivers, 
  initialStations, 
  initialCoupons, 
  initialTransactions, 
  initialAlerts, 
  initialPrices, 
  initialMaintenance 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { AboutModal } from './components/AboutModal';

import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { LogisticsDispatch } from './components/dashboard/LogisticsDispatch';
import { FuelStations } from './components/dashboard/FuelStations';
import { ProcurementFinance } from './components/dashboard/ProcurementFinance';
import { PropertyAdmin } from './components/dashboard/PropertyAdmin';
import { InternalAudit } from './components/dashboard/InternalAudit';
import { AnomalyCenter } from './components/dashboard/AnomalyCenter';

export default function App() {
  // Authentication & Session State
  const [user, setUser] = useState<UserProfile>({
    name: 'Girma Haile Bunaro',
    email: 'germaichlogic2018@gmail.com',
    role: 'executive',
    faydaId: 'FD-893104829',
    branch: 'Dire Dawa Customs Branch Office',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Localization & Navigation
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Core Data States
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [stations] = useState<FuelStation[]>(initialStations);
  const [coupons] = useState<FuelCoupon[]>(initialCoupons);
  const [transactions, setTransactions] = useState<FuelTransaction[]>(initialTransactions);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(initialAlerts);
  const [prices, setPrices] = useState<FuelPriceRecord[]>(initialPrices);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(initialMaintenance);

  const t = translations[lang];

  // Handlers
  const handleAddVehicle = (v: Vehicle) => setVehicles(prev => [v, ...prev]);
  const handleAddDriver = (d: Driver) => setDrivers(prev => [d, ...prev]);
  const handleAddTransaction = (tx: FuelTransaction) => setTransactions(prev => [tx, ...prev]);
  const handleUpdatePrice = (prc: FuelPriceRecord) => setPrices(prev => [prc, ...prev]);
  const handleAddMaintenance = (m: MaintenanceRecord) => setMaintenance(prev => [m, ...prev]);
  
  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  const activeAlertCount = alerts.filter(a => a.status === 'Active').length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-sans selection:bg-[#007A3D] selection:text-white">
      
      {/* Login Modal */}
      <LoginModal
        isOpen={!isLoggedIn}
        onLogin={(profile) => {
          setUser(profile);
          setIsLoggedIn(true);
        }}
        lang={lang}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={lang}
      />

      {/* Top Navbar */}
      <Navbar
        user={user}
        onLogout={() => setIsLoggedIn(false)}
        onOpenAbout={() => setIsAboutOpen(true)}
        lang={lang}
        onChangeLang={setLang}
        onSwitchRole={handleSwitchRole}
        alertCount={activeAlertCount}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Main Body Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          userRole={user.role}
          lang={lang}
          alertCount={activeAlertCount}
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 overflow-hidden">
          {activeTab === 'executive' && (
            <ExecutiveDashboard
              vehicles={vehicles}
              transactions={transactions}
              alerts={alerts}
              stations={stations}
              lang={lang}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'logistics' && (
            <LogisticsDispatch
              vehicles={vehicles}
              drivers={drivers}
              onAddVehicle={handleAddVehicle}
              onAddDriver={handleAddDriver}
              lang={lang}
            />
          )}

          {activeTab === 'stations' && (
            <FuelStations
              stations={stations}
              coupons={coupons}
              vehicles={vehicles}
              drivers={drivers}
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              lang={lang}
            />
          )}

          {activeTab === 'finance' && (
            <ProcurementFinance
              prices={prices}
              transactions={transactions}
              onUpdatePrice={handleUpdatePrice}
              lang={lang}
            />
          )}

          {activeTab === 'property' && (
            <PropertyAdmin
              maintenance={maintenance}
              vehicles={vehicles}
              onAddMaintenance={handleAddMaintenance}
              lang={lang}
            />
          )}

          {activeTab === 'audit' && (
            <InternalAudit
              transactions={transactions}
              lang={lang}
            />
          )}

          {activeTab === 'alerts' && (
            <AnomalyCenter
              alerts={alerts}
              onResolveAlert={handleResolveAlert}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Institutional Footer with Developer Attribution */}
      <footer className="bg-[#14181F] text-slate-400 py-6 border-t border-emerald-900/40 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-bold text-white">Dire Dawa Customs Branch Office • Federal Democratic Republic of Ethiopia</div>
            <div className="text-emerald-400 mt-0.5">Enterprise Fuel Governance & Anti-Theft Control System v2.6</div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="font-bold text-amber-300">
              Architect & Lead Developer: Girma Haile Bunaro
            </div>
            <div className="text-slate-400">
              Email: <a href="mailto:germaichlogic2018@gmail.com" className="text-emerald-400 hover:underline">germaichlogic2018@gmail.com</a> | Phone: <a href="tel:+251982422066" className="text-white hover:underline">+251 982 422 066</a> | Dire Dawa, Ethiopia
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
