import React from 'react';
import { Heart, Clock } from 'lucide-react';
import { LuxuryPhotoFrame } from '../LuxuryPhotoFrame';
import { PhotoSlotKey } from '../../types';
import { soundEffects } from '../../utils/audio';

interface ScreenJacuzziProps {
  photoUrl: string | null;
  onPhotoChange: (slotKey: PhotoSlotKey, url: string | null) => void;
  onNext: () => void;
}

export const ScreenJacuzzi: React.FC<ScreenJacuzziProps> = ({
  photoUrl,
  onPhotoChange,
  onNext,
}) => {
  const handleClick = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-2 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-1 font-semibold">
          PREMIÈRE ÉTAPE
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/40 mb-3" />
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          L'ESCAPADE AQUATIQUE
        </h1>
        <p className="text-sm font-serif italic text-[#7D3442] mt-1 font-semibold">
          « Le jacuzzi est prêt. »
        </p>
      </div>

      {/* Main visual slot for Jacuzzi photo */}
      <div className="my-2">
        <LuxuryPhotoFrame
          label="AJOUTER LA PHOTO DU JACUZZI"
          slotKey="jacuzzi"
          photoUrl={photoUrl}
          onPhotoChange={onPhotoChange}
          aspectRatio="16/9"
          hint="Glissez ou touchez pour importer la photo du jacuzzi"
        />

        {/* Text descriptions */}
        <div className="py-4 px-5 rounded-2xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_10px_30px_rgba(145,80,60,0.12)]">
          <p className="text-xs md:text-sm text-[#4E242D] leading-relaxed font-sans font-light">
            Prenez le temps de vous détendre, de profiter de l'eau chaude et de simplement ne penser à rien.
          </p>

          <div className="mt-4 pt-3 border-t border-[#B87D6A]/30 flex items-center justify-center gap-2 text-xs text-[#7D3442] font-serif tracking-wider font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#7D3442]" />
            <span>Durée estimée : 30 minutes</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pb-4 pt-2">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>PROFITER DE L'INSTANT</span>
          <Heart className="w-4 h-4 text-[#FFF6F2] fill-[#FFF6F2]" />
        </button>
      </div>
    </div>
  );
};
