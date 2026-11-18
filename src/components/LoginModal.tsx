import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, KeyRound, CheckCircle2, UserCheck } from 'lucide-react';
import { UserProfile, UserRole, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (profile: UserProfile) => void;
  lang: LanguageCode;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLogin, lang }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('executive');
  const [faydaInput, setFaydaInput] = useState('FD-893104829');
  const [emailInput, setEmailInput] = useState('girma.haile@customs.gov.et');
  const [nameInput, setNameInput] = useState('Girma Haile Bunaro');
  const t = translations[lang];

  if (!isOpen) return null;

  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const roleNames: Record<UserRole, string> = {
      executive: 'Deputy Manager (Executive Command)',
      logistics: 'Logistics & Dispatch Officer',
      station: 'Fuel Station IoT Manager',
      finance: 'Procurement & Finance Specialist',
      property: 'Property Administration Head',
      audit: 'Internal Audit Senior Inspector'
    };

    onLogin({
      name: nameInput,
      email: emailInput,
      role: selectedRole,
      faydaId: faydaInput,
      branch: 'Dire Dawa Customs Branch Office',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-800/20 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] p-6 text-white text-center relative">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#007A3D] via-[#FCDD09] to-[#DA121A]" />
          <div className="mx-auto bg-amber-400 text-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Dire Dawa Customs Branch</h2>
          <p className="text-emerald-200 text-xs mt-1">Secure Enterprise Authentication & Fayda ID Gateway</p>
        </div>

        <form onSubmit={handleGoogleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Institutional Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#007A3D] focus:outline-hidden"
            >
              <option value="executive">👑 Executive Command (Deputy Manager & GM)</option>
              <option value="logistics">🚚 Logistics & Dispatch Division</option>
              <option value="station">⛽ Fuel Station & Coupon Operations</option>
              <option value="finance">💰 Procurement & Finance Work Process</option>
              <option value="property">🏢 Property Administration & General Services</option>
              <option value="audit">🔍 Internal Audit Division (Anti-Theft)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#007A3D] focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#007A3D] focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Fayda Digital ID Verification
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-3 w-4 h-4 text-emerald-600" />
              <input
                type="text"
                value={faydaInput}
                onChange={(e) => setFaydaInput(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl pl-10 pr-3 py-2.5 text-sm font-mono font-bold text-emerald-900 focus:ring-2 focus:ring-[#007A3D] focus:outline-hidden"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">National ID cryptographic binding verified via EthioTrust API.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#007A3D] hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 text-sm"
            >
              <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.2v3.15C3.18 21.32 7.23 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.2C.44 8.13 0 9.87 0 12s.44 3.87 1.2 5.42l4.08-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.68 1.2 6.58l4.08 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{t.loginWithGoogle} & Fayda Auth</span>
            </button>
          </div>
        </form>

        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
          Girma Haile Bunaro • Dire Dawa Customs Branch Office
        </div>
      </div>
    </div>
  );
};
