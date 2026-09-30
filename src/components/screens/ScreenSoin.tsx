import React, { useState } from 'react';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { LuxuryPhotoFrame } from '../LuxuryPhotoFrame';
import { PhotoSlotKey, PhotosState } from '../../types';
import { soundEffects } from '../../utils/audio';

interface ScreenSoinProps {
  photos: PhotosState;
  onPhotoChange: (slotKey: PhotoSlotKey, url: string | null) => void;
  onNext: () => void;
}

export const ScreenSoin: React.FC<ScreenSoinProps> = ({
  photos,
  onPhotoChange,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'visage' | 'pieds'>('visage');

  const handleClick = () => {
    soundEffects.playValidationChord();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 px-6 text-center max-w-md mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="pt-2 flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D3442] font-serif mb-1 font-semibold">
          DEUXIÈME ÉTAPE
        </p>
        <div className="w-8 h-[1px] bg-[#B87D6A]/40 mb-3" />
        <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#38161D] uppercase font-medium">
          SOIN PRIVÉ
        </h1>
        <p className="text-xs md:text-sm font-serif italic text-[#7D3442] mt-1 font-semibold">
          Soin des pieds & soin du visage
        </p>
      </div>

      {/* Main Content */}
      <div className="my-2 space-y-4">
        <p className="text-xs md:text-sm text-[#4E242D] leading-relaxed font-sans font-light">
          Après le jacuzzi, profitez d'un nouveau moment de détente préparé spécialement pour vous.
        </p>

        {/* Tab switcher for 2 photo slots */}
        <div className="flex items-center justify-center gap-2 p-1 bg-[#CF9984]/50 rounded-xl border border-[#B87D6A]/35 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('visage')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'visage'
                ? 'bg-gradient-to-r from-[#7D3442] to-[#943F50] text-[#FFF6F2] border border-[#C98675]/60 shadow-md'
                : 'text-[#5E2632] hover:text-[#38161D]'
            }`}
          >
            Soin du visage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pieds')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'pieds'
                ? 'bg-gradient-to-r from-[#7D3442] to-[#943F50] text-[#FFF6F2] border border-[#C98675]/60 shadow-md'
                : 'text-[#5E2632] hover:text-[#38161D]'
            }`}
          >
            Soin des pieds
          </button>
        </div>

        {/* Visual photo slot according to active tab */}
        {activeTab === 'visage' ? (
          <div>
            <LuxuryPhotoFrame
              label="AJOUTER LA PHOTO DU SOIN (VISAGE)"
              slotKey="soin_visage"
              photoUrl={photos.soin_visage}
              onPhotoChange={onPhotoChange}
              aspectRatio="4/3"
              hint="Nettoyage, patchs regard, masque & mise en beauté"
            />
            <div className="py-4 px-5 rounded-2xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 shadow-[0_12px_36px_rgba(145,80,60,0.14)] text-left text-xs text-[#4E242D]">
              <span className="font-serif text-[#38161D] font-bold block mb-2 uppercase tracking-wider text-xs">
                Rituel Visage
              </span>
              <ul className="space-y-1.5 font-light text-[12px] md:text-[13px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Nettoyage doux, apaisant et purifiant du visage</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Lotion tonique apaisante et préparatrice</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Travail spécifique et délicat autour du regard et des cernes</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Pose de patchs lissants à l'acide hyaluronique sous les yeux pour défroisser et illuminer</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Masque régénérant, apaisant et nettoyant sur-mesure</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Moment de soin et de mise en beauté pour un teint reposé et éclatant</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <LuxuryPhotoFrame
              label="AJOUTER LA PHOTO DU SOIN (PIEDS)"
              slotKey="soin_pieds"
              photoUrl={photos.soin_pieds}
              onPhotoChange={onPhotoChange}
              aspectRatio="4/3"
              hint="Bain tiède, gommage, masque nourrissant & détente"
            />
            <div className="py-4 px-5 rounded-2xl bg-[#E8C2B3]/90 border border-[#CFA08D]/45 shadow-[0_12px_36px_rgba(145,80,60,0.14)] text-left text-xs text-[#4E242D]">
              <span className="font-serif text-[#38161D] font-bold block mb-2 uppercase tracking-wider text-xs">
                Rituel Pieds
              </span>
              <ul className="space-y-1.5 font-light text-[12px] md:text-[13px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Bain tiède délassant et nettoyage doux bienfaisant</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Soin purifiant et exfoliation soyeuse pour libérer chaque tension</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Masque et baume nourrissant réparateur pour une peau douce et satinée</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7D3442] mt-0.5">•</span>
                  <span>Moment de détente absolue, de bien-être et de légèreté à la maison</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-[#B87D6A]/40 bg-[#E8C2B3]/90 text-xs text-[#7D3442] font-serif tracking-wider shadow-sm font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#7D3442]" />
          <span>Durée estimée : 30 minutes</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pb-4 pt-2">
        <button
          type="button"
          onClick={handleClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7D3442] via-[#943F50] to-[#7D3442] text-[#FFF6F2] border border-[#C98675]/60 shadow-xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#E8C2B5] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>PROFITER DU SOIN</span>
          <Heart className="w-4 h-4 text-[#FFF6F2] fill-[#FFF6F2]" />
        </button>
      </div>
    </div>
  );
};
