import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { StarRating } from '../StarRating';
import { soundEffects } from '../../utils/audio';

interface ScreenNoteJacuzziProps {
  currentRating: number | null;
  onSaveRating: (rating: number) => void;
  onNext: () => void;
}

export const ScreenNoteJacuzzi: React.FC<ScreenNoteJacuzziProps> = ({
  currentRating,
  onSaveRating,
  onNext,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(currentRating);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleValidate = () => {
    if (!selectedRating) return;
    onSaveRating(selectedRating);
    soundEffects.playValidationChord();
    setIsConfirmed(true);

    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-4 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-2 font-semibold">
          VOTRE AVIS PRIVÉ
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/40 mb-4" />
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          L'ESCAPADE AQUATIQUE
        </h1>
      </div>

      {/* Center Question & Stars */}
      <div className="my-8 py-8 px-6 rounded-3xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 backdrop-blur-md shadow-[0_12px_36px_rgba(145,80,60,0.14)] relative overflow-hidden flex flex-col items-center">
        {isConfirmed ? (
          <div className="flex flex-col items-center py-6 animate-scaleUp">
            <CheckCircle2 className="w-14 h-14 text-[#7D3442] mb-3 animate-bounce" />
            <p className="font-serif text-xl text-[#38161D] italic font-medium">
              Note enregistrée avec tendresse ♡
            </p>
            <p className="text-xs text-[#4E242D] font-sans mt-2">
              Préparation de votre soin sur-mesure...
            </p>
          </div>
        ) : (
          <>
            <p className="font-serif text-xl md:text-2xl text-[#38161D] italic leading-relaxed mb-6 font-medium">
              « Alors... comment as-tu trouvé ce moment ? ♡ »
            </p>

            <div className="w-full my-2">
              <StarRating
                value={selectedRating}
                onChange={setSelectedRating}
                size="lg"
              />
            </div>

            <p className="text-xs text-[#692B38]/80 font-sans mt-2">
              Votre note est précieuse pour la suite de l'expérience.
            </p>
          </>
        )}
      </div>

      {/* Validate Button */}
      <div className="pb-4">
        <button
          type="button"
          disabled={!selectedRating || isConfirmed}
          onClick={handleValidate}
          className={`w-full py-4 px-6 rounded-2xl font-serif tracking-widest text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedRating && !isConfirmed
              ? 'bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl hover:border-[#E8C2B5] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
              : 'bg-[#D6A18F]/50 text-[#824436] border border-transparent cursor-not-allowed opacity-60'
          }`}
        >
          <span>VALIDER MA NOTE</span>
          <ArrowRight className="w-4 h-4 text-[#FFF6F2]" />
        </button>

        {!selectedRating && (
          <p className="text-[11px] text-[#692B38]/80 font-serif italic mt-2">
            * Sélectionnez au moins une étoile pour continuer
          </p>
        )}
      </div>
    </div>
  );
};
