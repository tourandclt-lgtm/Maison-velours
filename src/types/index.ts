export type StepKey =
  | 'accueil'        // 1. ACCUEIL
  | 'arrivee'        // 2. ARRIVÉE
  | 'jacuzzi'        // 3. JACUZZI
  | 'note_jacuzzi'   // 4. NOTE DU JACUZZI
  | 'soin'           // 5. SOIN DES PIEDS + VISAGE
  | 'note_soin'      // 6. NOTE DU SOIN
  | 'carte'          // 7. LA TABLE EST PRÊTE
  | 'entree'         // 8. ENTRÉE (Burrata crémeuse) + NOTE DE L'ENTRÉE
  | 'plat'           // 9. PLAT (Lasagnes maison) + NOTE DU PLAT
  | 'dessert'        // 10. DESSERT (Tiramisu au Daim) + NOTE DU DESSERT
  | 'message'        // 11. MESSAGE DE REMERCIEMENT
  | 'cadeaux'        // 12. CADEAUX
  | 'conclusion'     // 13. CONCLUSION
  | 'after_hours';   // 14. PRIVATE AFTER HOURS

export interface RatingsState {
  jacuzziRating: number | null;
  spaRating: number | null;
  entryRating: number | null;
  mainRating: number | null;
  dessertRating: number | null;
}

export type PhotoSlotKey =
  | 'jacuzzi'
  | 'soin_visage'
  | 'soin_pieds'
  | 'entree'
  | 'plat'
  | 'dessert';

export type PhotosState = Record<PhotoSlotKey, string | null>;

export interface SpicyCard {
  id: string;
  title: string;
  category: string;
  description: string;
  unlocked?: boolean;
}
