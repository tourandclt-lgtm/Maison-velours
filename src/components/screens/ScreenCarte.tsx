import React from 'react';
import { ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface ScreenCarteProps {
  onNext: () => void;
}

export const ScreenCarte: React.FC<ScreenCarteProps> = ({ onNext }) => {
  const handleClick = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Top Header */}
      <div className="pt-4 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-2 font-semibold">
          MAISON VELOURS
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/40 mb-4" />
        <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-[#38161D] uppercase font-medium">
          LA TABLE EST PRÊTE
        </h1>
      </div>

      {/* Center Presentation Card */}
      <div className="my-8 py-8 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-[#B87D6A]/50 bg-[#F0C9B9] flex items-center justify-center mb-6 shadow-md">
          <UtensilsCrossed className="w-8 h-8 text-[#7D3442]" strokeWidth={1.3} />
        </div>

        <p className="font-serif text-xl md:text-2xl text-[#38161D] italic leading-relaxed mb-4 font-medium">
          « Découvrez la carte de Maison Velours. »
        </p>

        <div className="w-10 h-[1px] bg-[#B87D6A]/35 my-3" />

        <div className="space-y-4 text-sm text-[#4E242D] leading-relaxed font-sans font-light max-w-xs">
          <p>
            Un menu préparé avec tout mon amour, pensé pour éveiller les papilles et prolonger ce moment rien qu'à deux.
          </p>
          <p className="text-[#7D3442] font-serif text-lg italic pt-1 font-semibold">
            « Le dîner peut commencer. ♡ »
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#7D3442] tracking-widest font-serif uppercase font-semibold">
          <Sparkles className="w-3 h-3 text-[#C46835]" />
          <span>Menu gastronomique en 3 actes</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pb-4">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>DÉCOUVRIR LA CARTE</span>
          <ArrowRight className="w-4 h-4 text-[#FFF6F2] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
