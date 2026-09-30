/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StepKey, RatingsState, PhotosState, PhotoSlotKey } from './types';
import { DEFAULT_PHOTOS, MENU_ITEMS } from './data/config';
import { HeaderBar } from './components/HeaderBar';
import { ScreenAccueil } from './components/screens/ScreenAccueil';
import { ScreenArrivee } from './components/screens/ScreenArrivee';
import { ScreenJacuzzi } from './components/screens/ScreenJacuzzi';
import { ScreenNoteJacuzzi } from './components/screens/ScreenNoteJacuzzi';
import { ScreenSoin } from './components/screens/ScreenSoin';
import { ScreenNoteSoin } from './components/screens/ScreenNoteSoin';
import { ScreenCarte } from './components/screens/ScreenCarte';
import { ScreenDish } from './components/screens/ScreenDish';
import { ScreenMessage } from './components/screens/ScreenMessage';
import { ScreenCadeaux } from './components/screens/ScreenCadeaux';
import { ScreenConclusion } from './components/screens/ScreenConclusion';
import { ScreenAfterHours } from './components/screens/ScreenAfterHours';

const STEPS_ORDER: StepKey[] = [
  'accueil',       // 1. Accueil
  'arrivee',       // 2. Arrivée
  'jacuzzi',       // 3. Jacuzzi
  'note_jacuzzi',  // 4. Note Jacuzzi
  'soin',          // 5. Soin Privé (Pieds & Visage)
  'note_soin',     // 6. Note Soin
  'carte',         // 7. La Table est Prête / La Carte
  'entree',        // 8. Entrée + Note
  'plat',          // 9. Plat + Note
  'dessert',       // 10. Dessert + Note
  'message',       // 11. Message de Remerciement
  'cadeaux',       // 12. Cadeaux
  'conclusion',    // 13. Petite conclusion / transition
  'after_hours',   // 14. Private After Hours (Sensuelle, Chaude, Sombre)
];

export default function App() {
  // Step state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mv_current_step');
      const idx = saved ? parseInt(saved, 10) : 0;
      return isNaN(idx) ? 0 : Math.min(Math.max(idx, 0), STEPS_ORDER.length - 1);
    } catch {
      return 0;
    }
  });

  const [unlockedStepIndex, setUnlockedStepIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mv_unlocked_step');
      const idx = saved ? parseInt(saved, 10) : 0;
      return isNaN(idx) ? 0 : Math.min(Math.max(idx, 0), STEPS_ORDER.length - 1);
    } catch {
      return 0;
    }
  });

  // Ratings state
  const [ratings, setRatings] = useState<RatingsState>(() => {
    try {
      const saved = localStorage.getItem('mv_ratings');
      return saved
        ? JSON.parse(saved)
        : {
            jacuzziRating: null,
            spaRating: null,
            entryRating: null,
            mainRating: null,
            dessertRating: null,
          };
    } catch {
      return {
        jacuzziRating: null,
        spaRating: null,
        entryRating: null,
        mainRating: null,
        dessertRating: null,
      };
    }
  });

  // Photos state
  const [photos, setPhotos] = useState<PhotosState>(() => {
    try {
      const saved = localStorage.getItem('mv_photos');
      return saved ? { ...DEFAULT_PHOTOS, ...JSON.parse(saved) } : DEFAULT_PHOTOS;
    } catch {
      return DEFAULT_PHOTOS;
    }
  });

  // Save states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('mv_current_step', currentStepIndex.toString());
      localStorage.setItem('mv_unlocked_step', unlockedStepIndex.toString());
    } catch {
      // storage unavailable
    }
  }, [currentStepIndex, unlockedStepIndex]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_ratings', JSON.stringify(ratings));
    } catch {
      // storage unavailable
    }
  }, [ratings]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_photos', JSON.stringify(photos));
    } catch {
      // storage unavailable
    }
  }, [photos]);

  // Handle browser back / forward navigation gracefully
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.stepIndex === 'number') {
        const target = event.state.stepIndex;
        // Never allow bypassing unlocked step
        if (target <= unlockedStepIndex && target >= 0) {
          setCurrentStepIndex(target);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [unlockedStepIndex]);

  // Advance to next step
  const goToNextStep = () => {
    const nextIdx = currentStepIndex + 1;
    if (nextIdx < STEPS_ORDER.length) {
      setCurrentStepIndex(nextIdx);
      if (nextIdx > unlockedStepIndex) {
        setUnlockedStepIndex(nextIdx);
      }
      try {
        window.history.pushState({ stepIndex: nextIdx }, '', `#step-${nextIdx}`);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go back to previous completed step
  const handleGoBack = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      try {
        window.history.pushState({ stepIndex: prevIdx }, '', `#step-${prevIdx}`);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Full reset (Requirement 8)
  const handleFullReset = () => {
    try {
      localStorage.removeItem('mv_current_step');
      localStorage.removeItem('mv_unlocked_step');
      localStorage.removeItem('mv_ratings');
      localStorage.removeItem('mv_photos');
      localStorage.removeItem('mv_spicy_cards');
      localStorage.removeItem('mv_selected_card');
      localStorage.removeItem('mv_custom_idea');
      localStorage.removeItem('mv_final_validated');
    } catch {
      // ignore
    }

    setCurrentStepIndex(0);
    setUnlockedStepIndex(0);
    setRatings({
      jacuzziRating: null,
      spaRating: null,
      entryRating: null,
      mainRating: null,
      dessertRating: null,
    });
    setPhotos(DEFAULT_PHOTOS);

    try {
      window.history.pushState({ stepIndex: 0 }, '', '#step-0');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update photo in state
  const handlePhotoChange = (slotKey: PhotoSlotKey, url: string | null) => {
    setPhotos((prev) => ({
      ...prev,
      [slotKey]: url,
    }));
  };

  // Save specific rating
  const handleSaveRating = (key: keyof RatingsState, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const currentStep = STEPS_ORDER[currentStepIndex];
  const isAfterHours = currentStep === 'after_hours';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 flex flex-col justify-between ${
        isAfterHours
          ? 'bg-[#080204] text-[#FBF9F5]'
          : 'bg-[#DBA893] text-[#38161D]'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[130px] transition-all duration-1000 ${
            isAfterHours
              ? 'bg-[#400713]/40'
              : 'bg-[#F4CFBE]/55'
          }`}
        />
        <div
          className={`absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ${
            isAfterHours
              ? 'bg-[#D4AF37]/5'
              : 'bg-[#C6856E]/45'
          }`}
        />
      </div>

      {/* Top Header Bar */}
      <HeaderBar
        currentStepIndex={currentStepIndex}
        totalSteps={STEPS_ORDER.length}
        canGoBack={currentStepIndex > 0}
        onGoBack={handleGoBack}
        onReset={handleFullReset}
        isAfterHours={isAfterHours}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        {currentStep === 'accueil' && (
          <ScreenAccueil onStart={goToNextStep} />
        )}

        {currentStep === 'arrivee' && (
          <ScreenArrivee onNext={goToNextStep} />
        )}

        {currentStep === 'jacuzzi' && (
          <ScreenJacuzzi
            photoUrl={photos.jacuzzi}
            onPhotoChange={handlePhotoChange}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'note_jacuzzi' && (
          <ScreenNoteJacuzzi
            currentRating={ratings.jacuzziRating}
            onSaveRating={(r) => handleSaveRating('jacuzziRating', r)}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'soin' && (
          <ScreenSoin
            photos={photos}
            onPhotoChange={handlePhotoChange}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'note_soin' && (
          <ScreenNoteSoin
            currentRating={ratings.spaRating}
            onSaveRating={(r) => handleSaveRating('spaRating', r)}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'carte' && (
          <ScreenCarte onNext={goToNextStep} />
        )}

        {currentStep === 'entree' && (
          <ScreenDish
            chapter={MENU_ITEMS.entree.chapter}
            type={MENU_ITEMS.entree.type}
            title={MENU_ITEMS.entree.title}
            description={MENU_ITEMS.entree.description}
            questionSubtitle="Avant de découvrir la suite..."
            questionText="Quelle note lui accordes-tu ? ♡"
            photoKey="entree"
            photoLabel={MENU_ITEMS.entree.photoLabel}
            photoUrl={photos.entree}
            currentRating={ratings.entryRating}
            onPhotoChange={handlePhotoChange}
            onSaveRating={(r) => handleSaveRating('entryRating', r)}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'plat' && (
          <ScreenDish
            chapter={MENU_ITEMS.plat.chapter}
            type={MENU_ITEMS.plat.type}
            title={MENU_ITEMS.plat.title}
            description={MENU_ITEMS.plat.description}
            questionText="Alors... verdict ? ♡"
            photoKey="plat"
            photoLabel={MENU_ITEMS.plat.photoLabel}
            photoUrl={photos.plat}
            currentRating={ratings.mainRating}
            onPhotoChange={handlePhotoChange}
            onSaveRating={(r) => handleSaveRating('mainRating', r)}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'dessert' && (
          <ScreenDish
            chapter={MENU_ITEMS.dessert.chapter}
            type={MENU_ITEMS.dessert.type}
            title={MENU_ITEMS.dessert.title}
            description={MENU_ITEMS.dessert.description}
            questionText="La dernière note du chef ? ♡"
            photoKey="dessert"
            photoLabel={MENU_ITEMS.dessert.photoLabel}
            photoUrl={photos.dessert}
            currentRating={ratings.dessertRating}
            onPhotoChange={handlePhotoChange}
            onSaveRating={(r) => handleSaveRating('dessertRating', r)}
            onNext={goToNextStep}
          />
        )}

        {currentStep === 'message' && (
          <ScreenMessage onNext={goToNextStep} />
        )}

        {currentStep === 'cadeaux' && (
          <ScreenCadeaux onNext={goToNextStep} />
        )}

        {currentStep === 'conclusion' && (
          <ScreenConclusion onNext={goToNextStep} />
        )}

        {currentStep === 'after_hours' && (
          <ScreenAfterHours
            ratings={ratings}
            onResetAll={handleFullReset}
          />
        )}
      </main>

      {/* Subtle Luxury Footer Mark */}
      <footer className={`relative z-10 py-3 text-center border-t transition-colors ${
        isAfterHours ? 'border-[#D4AF37]/15' : 'border-[#B87D6A]/30'
      }`}>
        <p className={`text-[10px] tracking-[0.25em] font-serif uppercase ${
          isAfterHours ? 'text-[#D4AF37]/60' : 'text-[#692B38]'
        }`}>
          Maison Velours · Expérience Privée · Réservée
        </p>
      </footer>
    </div>
  );
}
