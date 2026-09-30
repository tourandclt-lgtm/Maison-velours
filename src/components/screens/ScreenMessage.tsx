import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface ScreenMessageProps {
  onNext: () => void;
}

export const ScreenMessage: React.FC<ScreenMessageProps> = ({ onNext }) => {
  const handleClick = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#B87D6A]/40" />
          <Heart className="w-4 h-4 text-[#8A3A4A] fill-[#8A3A4A]/30 animate-pulse" />
          <span className="w-8 h-[1px] bg-[#B87D6A]/40" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          MERCI POUR VOTRE VISITE ♡
        </h1>
      </div>

      {/* Tender Letter Reveal */}
      <div className="my-6 py-7 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden text-left space-y-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7D8CB]/35 rounded-full blur-2xl pointer-events-none" />

        <p className="font-serif text-lg md:text-xl text-[#38161D] italic leading-relaxed text-center font-medium">
          « Mais ce restaurant n'a jamais vraiment été un restaurant. »
        </p>

        <div className="w-12 h-[1px] bg-[#B87D6A]/40 mx-auto" />

        <div className="space-y-4 text-xs md:text-sm text-[#4E242D] leading-relaxed font-sans font-light">
          <p className="text-center font-serif text-base text-[#7D3442] italic font-semibold">
            C'était simplement une façon de te préparer une soirée rien que pour toi.
          </p>

          <p>
            Pour te remercier de tout ce que tu fais pour moi au quotidien.
          </p>

          <div className="py-2.5 px-4 rounded-xl bg-[#DFB09E]/70 border-l-2 border-[#7D3442] space-y-1.5 italic text-[#38161D] font-serif text-sm">
            <p>Pour ta présence.</p>
            <p>Pour tes attentions.</p>
            <p>Pour toutes ces petites choses que tu fais parfois sans même réaliser à quel point elles comptent.</p>
          </div>

          <p className="text-center text-sm md:text-base font-serif text-[#7D3442] pt-2 font-semibold">
            Ce soir, c'était à mon tour de prendre soin de toi. ❤️
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="pb-4">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>CONTINUER</span>
          <ArrowRight className="w-4 h-4 text-[#FFF6F2] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
