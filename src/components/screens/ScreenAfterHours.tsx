import React, { useState, useEffect } from 'react';
import { Flame, Moon, Sparkles, Heart, Plus, Star, Check, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { RatingsState, SpicyCard } from '../../types';
import { DEFAULT_SPICY_CARDS } from '../../data/config';
import { soundEffects } from '../../utils/audio';

interface ScreenAfterHoursProps {
  ratings: RatingsState;
  onResetAll: () => void;
}

export const ScreenAfterHours: React.FC<ScreenAfterHoursProps> = ({ ratings, onResetAll }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFinalValidated, setIsFinalValidated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mv_final_validated') === 'true';
    } catch {
      return false;
    }
  });

  const [cards, setCards] = useState<SpicyCard[]>(() => {
    try {
      const saved = localStorage.getItem('mv_spicy_cards');
      if (saved) {
        const parsed: SpicyCard[] = JSON.parse(saved);
        // Exclude 'Les yeux bandés' if still in cache
        const filtered = parsed.filter(
          (c) => !c.title.toLowerCase().includes('yeux bandés')
        );
        // Ensure "Se mettre dans le noir complet..." is always last
        const withoutNoir = filtered.filter(
          (c) => !c.title.toLowerCase().includes('noir complet')
        );
        const noirCard = filtered.find((c) =>
          c.title.toLowerCase().includes('noir complet')
        ) || DEFAULT_SPICY_CARDS[DEFAULT_SPICY_CARDS.length - 1];
        return [...withoutNoir, noirCard];
      }
      return DEFAULT_SPICY_CARDS;
    } catch {
      return DEFAULT_SPICY_CARDS;
    }
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mv_selected_card') || null;
    } catch {
      return null;
    }
  });

  const [customIdeaText, setCustomIdeaText] = useState<string>(() => {
    try {
      return localStorage.getItem('mv_custom_idea') || '';
    } catch {
      return '';
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Persist selections
  useEffect(() => {
    try {
      if (selectedCardId) {
        localStorage.setItem('mv_selected_card', selectedCardId);
      } else {
        localStorage.removeItem('mv_selected_card');
      }
    } catch {
      // ignore
    }
  }, [selectedCardId]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_custom_idea', customIdeaText);
    } catch {
      // ignore
    }
  }, [customIdeaText]);

  useEffect(() => {
    try {
      localStorage.setItem('mv_final_validated', isFinalValidated ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isFinalValidated]);

  const handleUnlock = () => {
    soundEffects.playValidationChord();
    setIsUnlocked(true);
  };

  const handleCardClick = (cardId: string) => {
    soundEffects.playStarClick(2);
    setSelectedCardId(cardId);
  };

  const canValidate = Boolean(selectedCardId || customIdeaText.trim());

  const handleValidateChoice = () => {
    if (!canValidate) return;
    soundEffects.playValidationChord();
    setIsFinalValidated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalReset = () => {
    setIsUnlocked(false);
    setIsFinalValidated(false);
    setSelectedCardId(null);
    setCustomIdeaText('');
    try {
      localStorage.removeItem('mv_final_validated');
      localStorage.removeItem('mv_selected_card');
      localStorage.removeItem('mv_custom_idea');
    } catch {
      // ignore
    }
    onResetAll();
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newCard: SpicyCard = {
      id: `custom-${Date.now()}`,
      category: newCategory.trim() || 'Désir Secret',
      title: newTitle.trim(),
      description: newDesc.trim(),
    };

    // Insert custom card before the last card (so the dark room card remains last)
    const updated = [...cards];
    if (updated.length > 0) {
      updated.splice(updated.length - 1, 0, newCard);
    } else {
      updated.push(newCard);
    }

    setCards(updated);
    try {
      localStorage.setItem('mv_spicy_cards', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewTitle('');
    setNewCategory('');
    setNewDesc('');
    setShowAddModal(false);
    soundEffects.playValidationChord();
  };

  // Compute average rating
  const ratingValues = [
    ratings.jacuzziRating,
    ratings.spaRating,
    ratings.entryRating,
    ratings.mainRating,
    ratings.dessertRating,
  ].filter((r): r is number => typeof r === 'number');

  const averageRating = ratingValues.length
    ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
    : '5.0';

  // Get selected title for final slide reminder
  const selectedCard = cards.find((c) => c.id === selectedCardId);
  const selectedCardTitle = selectedCard ? selectedCard.title : '';

  return (
    <div className="flex-1 flex flex-col justify-between py-8 px-6 text-center max-w-md mx-auto w-full animate-fadeIn min-h-[90vh]">
      {!isUnlocked ? (
        // Phase 1: Private After Hours Gate (Sensual, Warm, Dark)
        <div className="flex-1 flex flex-col justify-between">
          <div className="pt-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-serif">
                PRIVATE AFTER HOURS
              </span>
              <Moon className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="w-8 h-[1px] bg-[#D4AF37]/40 mb-4" />
            <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-[#FBF9F5] uppercase">
              LA SUITE SECRÈTE
            </h1>
          </div>

          <div className="my-8 py-8 px-6 rounded-3xl bg-[#140307]/90 border border-[#D4AF37]/30 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col items-center space-y-6">
            {/* Candle glow simulation */}
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-candle-glow">
              <Flame className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
            </div>

            <p className="font-serif text-xl md:text-2xl text-[#FBF9F5] italic leading-relaxed">
              « La soirée n'est pas encore terminée... ♡ »
            </p>

            <div className="w-10 h-[1px] bg-[#D4AF37]/30" />

            <div className="space-y-4 text-xs md:text-sm text-[#E8CFCD] font-sans font-light leading-relaxed max-w-xs">
              <p>Maintenant que le restaurant a fermé ses portes...</p>
              <p className="text-[#FBF9F5] font-serif text-lg italic text-[#D4AF37]">
                La suite est réservée à nous deux.
              </p>
            </div>
          </div>

          <div className="pb-4">
            <button
              type="button"
              onClick={handleUnlock}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#3b0610] via-[#5e0a1b] to-[#3b0610] text-[#FBF9F5] border border-[#D4AF37]/50 shadow-2xl font-serif tracking-widest text-sm uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-[#D4AF37] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>OUVRIR LA DERNIÈRE SURPRISE</span>
              <Flame className="w-4 h-4 text-[#D4AF37] group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      ) : isFinalValidated ? (
        // Phase 3: DERNIÈRE SLIDE APRÈS VALIDATION (Très épurée, mystérieuse, coquine)
        <div className="flex-1 flex flex-col justify-between py-6 animate-fadeIn">
          {/* Header */}
          <div className="pt-2 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-serif">
                CONFIDENTIEL & PRIVÉ
              </span>
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-[#FBF9F5] uppercase">
              APRÈS-MINUIT
            </h1>
            <div className="w-10 h-[1px] bg-[#D4AF37]/40 my-3" />
          </div>

          {/* Central Seductive Message */}
          <div className="my-auto py-10 px-6 rounded-3xl bg-[#140307]/90 border border-[#D4AF37]/45 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.35)] animate-candle-glow">
              <Flame className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
            </div>

            <div className="space-y-4 max-w-xs text-center">
              <p className="font-serif text-xl md:text-2xl text-[#DFB588] italic font-medium leading-relaxed">
                « Très bien… »
              </p>

              <p className="font-serif text-lg md:text-xl text-[#FBF9F5] italic leading-relaxed">
                « Ton choix est fait. »
              </p>

              <div className="w-12 h-[1px] bg-[#D4AF37]/35 mx-auto my-2" />

              <p className="font-serif text-2xl md:text-3xl text-[#FBF9F5] italic font-medium leading-relaxed drop-shadow-md text-[#D4AF37]">
                « Maintenant, suis-moi pour le réaliser. ♡ »
              </p>
            </div>

            {/* Display chosen card title if selected */}
            {selectedCardTitle && (
              <div className="pt-2">
                <span className="inline-block py-2 px-5 rounded-full border border-[#D4AF37]/40 bg-[#25050C] text-xs md:text-sm font-serif italic text-[#DFB588] shadow-inner">
                  {selectedCardTitle}
                </span>
              </div>
            )}

            {/* Display custom idea text clearly if entered */}
            {customIdeaText.trim() && (
              <div className="w-full pt-1">
                <div className="p-3.5 rounded-2xl bg-[#20040A] border border-[#D4AF37]/35 text-center space-y-1">
                  <p className="text-[10px] font-serif uppercase tracking-widest text-[#D4AF37]">
                    Ton mot doux / envie personnalisée ♡
                  </p>
                  <p className="font-serif italic text-sm text-[#FBF9F5] leading-relaxed">
                    « {customIdeaText.trim()} »
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Area: Final Reset Button */}
          <div className="pt-8 pb-2 space-y-2">
            <button
              type="button"
              onClick={handleFinalReset}
              className="w-full py-4 px-6 rounded-2xl bg-[#190308] border border-[#D4AF37]/40 text-[#E8CFCD] hover:text-[#FFFDF9] hover:border-[#D4AF37] font-serif tracking-widest text-xs uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
              <span>RECOMMENCER L'EXPÉRIENCE</span>
            </button>
            <p className="text-[10px] text-[#DFB5B2]/40 font-sans">
              Remet l'intégralité de l'expérience à zéro
            </p>
          </div>
        </div>
      ) : (
        // Phase 2: Après-Minuit & Cards Selection Zone
        <div className="flex-1 flex flex-col space-y-6 animate-fadeIn pb-8">
          {/* Header */}
          <div className="pt-2 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-1">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-serif">
                CONFIDENTIEL & PRIVÉ
              </span>
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl tracking-widest text-[#FBF9F5] uppercase">
              APRÈS-MINUIT
            </h1>
            <div className="w-10 h-[1px] bg-[#D4AF37]/40 my-2" />
            <p className="font-serif text-sm md:text-base text-[#DFB5B2] italic">
              Plus de menu. Plus de service. Juste nous deux. ♡
            </p>
          </div>

          {/* Evening Ratings Recap Card */}
          <div className="py-4 px-5 rounded-2xl bg-[#140307]/80 border border-[#D4AF37]/30 text-left relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-[#D4AF37]/20 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-serif text-xs uppercase tracking-wider text-[#FBF9F5]">
                  Livre d'Or de la Soirée
                </span>
              </div>
              <div className="flex items-center gap-1 bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-xs font-serif text-[#D4AF37] font-bold">
                  {averageRating}/5
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#E8CFCD]">
              <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                <span>Jacuzzi :</span>
                <span className="text-[#D4AF37] font-serif font-semibold">{ratings.jacuzziRating ? `${ratings.jacuzziRating} ★` : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                <span>Soin Privé :</span>
                <span className="text-[#D4AF37] font-serif font-semibold">{ratings.spaRating ? `${ratings.spaRating} ★` : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                <span>Entrée :</span>
                <span className="text-[#D4AF37] font-serif font-semibold">{ratings.entryRating ? `${ratings.entryRating} ★` : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                <span>Plat :</span>
                <span className="text-[#D4AF37] font-serif font-semibold">{ratings.mainRating ? `${ratings.mainRating} ★` : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 col-span-2">
                <span>Dessert :</span>
                <span className="text-[#D4AF37] font-serif font-semibold">{ratings.dessertRating ? `${ratings.dessertRating} ★` : '—'}</span>
              </div>
            </div>
          </div>

          {/* Intimate Activities & Suggestions Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
                Choisis notre moment de ce soir
              </span>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1 text-[11px] font-sans tracking-wide text-[#DFB5B2] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une idée</span>
              </button>
            </div>

            {/* List of cards - strictly preserving order with 'Se mettre dans le noir complet...' as the last card */}
            <div className="space-y-3">
              {cards.map((card) => {
                const isSelected = selectedCardId === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#330713] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-[1.01]'
                        : 'bg-[#180308]/90 border-[#D4AF37]/25 hover:border-[#D4AF37]/50 active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-serif tracking-widest text-[#D4AF37]/80 uppercase">
                        {card.category}
                      </span>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-[10px] text-[#D4AF37] font-serif uppercase font-semibold">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Choisie ♡</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-base text-[#FBF9F5] font-medium mb-1">
                      {card.title}
                    </h3>

                    <p className="text-xs text-[#E8CFCD]/80 font-sans font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Optional Free Idea Section placed right after the cards */}
            <div className="p-4 rounded-2xl text-left bg-[#140307]/90 border border-[#D4AF37]/30 relative overflow-hidden shadow-lg space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-serif tracking-widest text-[#D4AF37] uppercase">
                  Option Libre · Facultatif
                </span>
                {customIdeaText.trim() && (
                  <span className="text-[10px] text-[#DFB588] font-serif italic">
                    Texte ajouté ♡
                  </span>
                )}
              </div>

              <h3 className="font-serif text-base text-[#FBF9F5] font-medium">
                Une autre idée ?
              </h3>

              <p className="text-xs text-[#E8CFCD]/80 font-sans font-light leading-relaxed">
                Tu as une envie, une idée ou quelque chose que tu aimerais proposer ? Écris-la ici…
              </p>

              <textarea
                rows={2}
                value={customIdeaText}
                onChange={(e) => setCustomIdeaText(e.target.value)}
                placeholder="Écris ton envie ici (facultatif)..."
                className="w-full p-2.5 rounded-xl bg-[#120206] border border-[#D4AF37]/35 text-xs text-[#FBF9F5] placeholder-[#E8CFCD]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <p className="text-[10px] text-[#DFB5B2]/50 font-sans italic">
                * Facultatif : vous pouvez valider votre choix avec ou sans texte saisi
              </p>
            </div>
          </div>

          {/* Validation CTA Button */}
          <div className="pt-4 sticky bottom-4 z-20">
            <button
              type="button"
              disabled={!canValidate}
              onClick={handleValidateChoice}
              className={`w-full py-4 px-6 rounded-2xl font-serif tracking-widest text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                canValidate
                  ? 'bg-gradient-to-r from-[#59101C] via-[#7D1B33] to-[#59101C] text-[#FBF9F5] border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'bg-[#1b0307]/70 text-[#8C6D46]/50 border border-transparent cursor-not-allowed opacity-60'
              }`}
            >
              <span>VALIDER MON CHOIX</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
            {!canValidate && (
              <p className="text-[11px] text-[#DFB5B2]/60 font-serif italic mt-2">
                * Touchez une carte ci-dessus ou écrivez une envie pour continuer
              </p>
            )}
          </div>
        </div>
      )}

      {/* Add Custom Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleAddCard}
            className="w-full max-w-sm rounded-2xl bg-[#1c040a] border border-[#D4AF37]/50 p-6 text-left shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
              <h4 className="font-serif text-base text-[#FBF9F5] font-semibold uppercase tracking-wider">
                Ajouter une envie privée
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#DFB5B2] text-xs hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-serif text-[#D4AF37] uppercase tracking-wider mb-1">
                Catégorie (optionnel)
              </label>
              <input
                type="text"
                placeholder="Ex: Douceur, Jeu, Massage..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2b0811] border border-[#D4AF37]/30 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-serif text-[#D4AF37] uppercase tracking-wider mb-1">
                Titre de l'idée *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Un baiser volé à chaque gorgée"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2b0811] border border-[#D4AF37]/30 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-serif text-[#D4AF37] uppercase tracking-wider mb-1">
                Description / Règle du jeu *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Décrivez l'activité ou la petite surprise..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#2b0811] border border-[#D4AF37]/30 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-white/10 text-xs text-[#DFB5B2]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#63121E] to-[#8C1D30] border border-[#D4AF37]/40 text-xs font-serif text-[#FBF9F5] tracking-wider uppercase shadow-md"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
