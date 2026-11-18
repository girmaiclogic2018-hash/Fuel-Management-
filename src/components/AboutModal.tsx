import React from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, Award, Terminal } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-emerald-800/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Habesha Gold & Green Accent */}
        <div className="bg-gradient-to-r from-[#14181F] via-[#007A3D] to-[#14181F] p-6 text-white relative">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#007A3D] via-[#FCDD09] to-[#DA121A]" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-amber-400 text-slate-900 p-3 rounded-xl shadow-inner font-bold">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Dire Dawa Customs Branch Office
              </h2>
              <p className="text-emerald-200 text-sm font-medium">
                Enterprise Fuel Management, Anti-Theft, & Financial Audit System
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-700">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[#007A3D] font-bold text-lg">
              <Award className="w-5 h-5 text-amber-500" />
              <span>System Attribution & Developer Credentials</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              This mission-critical digital governance platform is engineered to eliminate fuel theft, prevent ghost fueling, and enforce real-time financial transparency across all operational tiers of the Dire Dawa Customs Branch Office.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm">
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="bg-emerald-100 text-[#007A3D] p-2 rounded-md">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Architect & Lead Developer</div>
                  <div className="font-bold text-slate-900">Girma Haile Bunaro</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="bg-amber-100 text-amber-800 p-2 rounded-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Contact Email</div>
                  <a href="mailto:germaichlogic2018@gmail.com" className="font-bold text-emerald-700 hover:underline">
                    germaichlogic2018@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="bg-red-100 text-red-800 p-2 rounded-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Mobile Phone</div>
                  <a href="tel:+251982422066" className="font-bold text-slate-900 hover:underline">
                    +251 982 422 066
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Institutional Location</div>
                  <div className="font-bold text-slate-900">Dire Dawa, Ethiopia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-2 sm:space-y-0">
            <div>Federal Democratic Republic of Ethiopia • Customs Commission</div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#007A3D] text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
