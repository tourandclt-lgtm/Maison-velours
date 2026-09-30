import React, { useState } from 'react';
import { Gift, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface ScreenCadeauxProps {
  onNext: () => void;
}

export const ScreenCadeaux: React.FC<ScreenCadeauxProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundEffects.playGiftOpen();
    setIsOpen(true);
  };

  const handleContinue = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-4 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-2 font-semibold">
          SURPRISE
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/40 mb-4" />
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          UNE DERNIÈRE ATTENTION...
        </h1>
      </div>

      {/* Center Gift Area */}
      <div className="my-6 py-8 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-radial from-[#F7D8CB]/40 via-transparent to-transparent pointer-events-none" />

        {!isOpen ? (
          <div className="flex flex-col items-center animate-fadeIn space-y-6">
            <p className="font-serif text-base md:text-lg text-[#38161D] italic leading-relaxed max-w-xs font-medium">
              « Je n'allais évidemment pas terminer cette soirée sans te préparer quelque chose. ♡ »
            </p>

            {/* Luxury Gift Box Graphic */}
            <div className="relative group cursor-pointer" onClick={handleOpen}>
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#7D3442] via-[#943F50] to-[#B35266] border-2 border-[#DDA491]/80 shadow-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 active:scale-95">
                {/* Ribbon Cross */}
                <div className="absolute inset-y-0 w-3 bg-gradient-to-b from-[#FFF6F2] via-[#E8C2B5] to-[#DDA491] shadow-md" />
                <div className="absolute inset-x-0 h-3 bg-gradient-to-r from-[#FFF6F2] via-[#E8C2B5] to-[#DDA491] shadow-md" />

                {/* Bow Emblem */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#F0C9B9] border border-[#C98675] flex items-center justify-center shadow-lg">
                  <Gift className="w-6 h-6 text-[#7D3442]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Sparkles around */}
              <Sparkles className="w-4 h-4 text-[#C46835] absolute -top-2 -right-2 animate-bounce" />
              <Heart className="w-3.5 h-3.5 text-[#7D3442] fill-[#7D3442]/40 absolute -bottom-1 -left-1 animate-pulse" />
            </div>

            <p className="text-xs text-[#692B38]/80 font-sans tracking-wide">
              Touchez la boîte ou cliquez sur le bouton ci-dessous
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-scaleUp space-y-5">
            <div className="w-20 h-20 rounded-full border-2 border-[#C98675] bg-[#F0C9B9] flex items-center justify-center shadow-[0_0_25px_rgba(199,151,161,0.4)]">
              <Heart className="w-10 h-10 text-[#7D3442] fill-[#7D3442] animate-pulse" />
            </div>

            <h2 className="font-serif text-3xl tracking-widest text-[#38161D] font-semibold">
              POUR TOI ❤️
            </h2>

            <div className="w-10 h-[1px] bg-[#B87D6A]/40" />

            <p className="font-serif text-xl text-[#7D3442] italic font-semibold">
              « Parce que tu le mérites. »
            </p>

            <p className="text-xs md:text-sm text-[#4E242D] font-sans font-light max-w-xs leading-relaxed">
              Lève les yeux... C'est le moment de recevoir tes cadeaux dans la vraie vie.
            </p>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="pb-4">
        {!isOpen ? (
          <button
            type="button"
            onClick={handleOpen}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>OUVRIR</span>
            <Heart className="w-4 h-4 text-[#FFF6F2] fill-[#FFF6F2]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>LA SOIRÉE N'EST PAS FINIE...</span>
            <ArrowRight className="w-4 h-4 text-[#FFF6F2] group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
