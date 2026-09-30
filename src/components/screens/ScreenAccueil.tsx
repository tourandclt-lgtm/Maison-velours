import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface ScreenAccueilProps {
  onStart: () => void;
}

export const ScreenAccueil: React.FC<ScreenAccueilProps> = ({ onStart }) => {
  const handleClick = () => {
    soundEffects.playValidationChord();
    onStart();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Top Ornament */}
      <div className="flex flex-col items-center pt-4">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-[#B87D6A]/40" />
          <Heart className="w-3.5 h-3.5 text-[#8A3A4A] fill-[#8A3A4A]/40 animate-pulse" />
          <span className="w-8 h-[1px] bg-[#B87D6A]/40" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-2 font-semibold">
          Expérience Privée
        </p>

        <h1 className="font-serif text-3xl md:text-4xl tracking-[0.2em] font-medium text-[#38161D] uppercase">
          MAISON VELOURS
        </h1>
      </div>

      {/* Center Body Message */}
      <div className="my-8 py-7 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden">
        {/* Subtle background velvety glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F7D8CB]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#D99A82]/35 rounded-full blur-2xl pointer-events-none" />

        <p className="font-serif text-lg md:text-xl text-[#38161D] italic leading-relaxed mb-3 font-medium">
          « Bienvenue dans votre expérience privée. »
        </p>

        <p className="font-serif text-base text-[#7D3442] mb-6 font-semibold">
          « Ce soir, tout est préparé spécialement pour toi. ♡ »
        </p>

        <div className="w-12 h-[1px] bg-[#B87D6A]/35 mx-auto my-4" />

        <div className="space-y-4 text-xs md:text-sm text-[#4E242D] leading-relaxed font-sans font-light">
          <p>
            Tu n'as rien à organiser.<br />
            Rien à prévoir.<br />
            <span className="text-[#38161D] font-semibold">Juste à profiter.</span>
          </p>

          <p className="italic text-[#692B38]">
            Cette soirée est ma façon de te remercier pour toutes les petites choses que tu fais pour moi au quotidien.
          </p>

          <p className="text-[#38161D] font-serif text-base pt-2 font-medium">
            Alors ce soir...<br />
            <span className="text-[#7D3442] italic font-bold">laisse-moi m'occuper de toi.</span>
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pb-4">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>COMMENCER L'EXPÉRIENCE</span>
          <Heart className="w-4 h-4 text-[#FFF6F2] fill-[#FFF6F2] group-hover:scale-125 transition-transform duration-300" />
        </button>

        <p className="text-[10px] tracking-wider text-[#692B38]/80 font-sans mt-3">
          Une parenthèse rien que pour toi
        </p>
      </div>
    </div>
  );
};
