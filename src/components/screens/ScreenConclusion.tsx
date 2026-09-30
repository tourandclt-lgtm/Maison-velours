import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface ScreenConclusionProps {
  onNext: () => void;
}

export const ScreenConclusion: React.FC<ScreenConclusionProps> = ({ onNext }) => {
  const handleClick = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-4 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-2 font-semibold">
          MAISON VELOURS
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/35 mb-4" />
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          AVEC TOUT MON AMOUR
        </h1>
      </div>

      {/* Center Card */}
      <div className="my-8 py-10 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-[#C98675] bg-[#F0C9B9] flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-[#7D3442] fill-[#7D3442]/30 animate-pulse" strokeWidth={1.5} />
        </div>

        <div className="space-y-4 max-w-xs">
          <p className="font-serif text-2xl md:text-3xl text-[#38161D] italic leading-relaxed font-medium">
            « Merci pour tout. »
          </p>

          <div className="w-10 h-[1px] bg-[#B87D6A]/40 mx-auto" />

          <p className="font-serif text-lg md:text-xl text-[#7D3442] italic font-semibold">
            « J’espère que cette expérience t’a plu. ♡ »
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="pb-4">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>CONTINUER LA SOIRÉE</span>
          <ArrowRight className="w-4 h-4 text-[#FFF6F2] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
