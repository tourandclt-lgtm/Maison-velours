import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, ChevronLeft } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderBarProps {
  currentStepIndex: number;
  totalSteps: number;
  canGoBack: boolean;
  onGoBack: () => void;
  onReset: () => void;
  isAfterHours: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentStepIndex,
  totalSteps,
  canGoBack,
  onGoBack,
  onReset,
  isAfterHours,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.enabled = nextState;
  };

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-500 backdrop-blur-md border-b ${
          isAfterHours
            ? 'bg-[#0a0306]/90 border-[#D4AF37]/20 text-[#FBF9F5]'
            : 'bg-[#DBA893]/95 border-[#B87D6A]/30 text-[#38161D]'
        }`}
      >
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left Zone: Back button or subtle brand emblem */}
          <div className="w-10 flex items-center">
            {canGoBack && currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={onGoBack}
                className="p-2 -ml-2 rounded-full text-[#692B38] hover:text-[#38161D] transition-colors focus:outline-none"
                aria-label="Étape précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="text-[10px] tracking-widest font-serif uppercase text-[#7D3442] font-semibold">
                PRIVÉ
              </div>
            )}
          </div>

          {/* Center Zone: Brand Wordmark */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif tracking-[0.25em] text-sm md:text-base font-semibold uppercase text-[#38161D]">
              MAISON VELOURS
            </span>
          </div>

          {/* Right Zone: Sound Toggle & Menu */}
          <div className="w-10 flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 -mr-2 rounded-full text-[#692B38] hover:text-[#38161D] transition-colors focus:outline-none"
              title={soundEnabled ? 'Couper les sons' : 'Activer les sons'}
              aria-label="Activer ou couper le son"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#7D3442]" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-40 text-[#692B38]" />
              )}
            </button>
          </div>
        </div>

        {/* Minimalist discreet golden hairline progress bar */}
        <div className={`w-full h-[1.5px] overflow-hidden ${
          isAfterHours ? 'bg-[#3a0b14]/50' : 'bg-[#CFA08B]/60'
        }`}>
          <div
            className={`h-full transition-all duration-700 ease-out ${
              isAfterHours
                ? 'bg-gradient-to-r from-[#8C1D30] via-[#D4AF37] to-[#8C1D30]'
                : 'bg-gradient-to-r from-[#7D3442] via-[#C96954] to-[#7D3442]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#24060C] border border-[#D4AF37]/40 rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl">
            <p className="font-serif text-lg text-[#FBF9F5] mb-2">
              Recommencer l'expérience ?
            </p>
            <p className="text-xs text-[#E8CFCD]/80 mb-5 leading-relaxed">
              Les notes et les photos importées seront conservées, mais vous repartirez de l'écran d'accueil.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-white/10 text-xs text-[#DFB5B2] font-medium"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  onReset();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#63121E] border border-[#D4AF37]/40 text-xs text-[#FBF9F5] font-medium"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
