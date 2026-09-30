import { PhotosState, SpicyCard } from '../types';

/**
 * CONFIGURATION DE LA MAISON VELOURS
 * Vous pouvez modifier directement les textes ou coller vos liens d'images ici,
 * ou simplement utiliser le bouton d'importation directement sur l'écran !
 */

export const DEFAULT_PHOTOS: PhotosState = {
  jacuzzi: null,       // Ex: "/images/jacuzzi.jpg" ou un lien web
  soin_visage: null,   // Ex: "/images/soin-visage.jpg"
  soin_pieds: null,    // Ex: "/images/soin-pieds.jpg"
  entree: null,        // Ex: "/images/burrata.jpg"
  plat: null,          // Ex: "/images/lasagnes.jpg"
  dessert: null,       // Ex: "/images/tiramisu.jpg"
};

export const MENU_ITEMS = {
  entree: {
    chapter: 'CHAPITRE I',
    type: "L'ENTRÉE",
    title: 'Burrata crémeuse',
    description: 'Tomates cerises rôties · pesto · roquette',
    photoKey: 'entree' as const,
    photoLabel: "AJOUTER LA PHOTO DE L'ENTRÉE",
  },
  plat: {
    chapter: 'CHAPITRE II',
    type: 'LE PLAT',
    title: 'Lasagnes maison',
    description: 'Sauce tomate · viande mijotée · béchamel · parmesan',
    photoKey: 'plat' as const,
    photoLabel: 'AJOUTER LA PHOTO DU PLAT',
  },
  dessert: {
    chapter: 'CHAPITRE III',
    type: 'LE DESSERT',
    title: 'Tiramisu au Daim',
    description: 'Crème mascarpone · café · éclats de Daim',
    photoKey: 'dessert' as const,
    photoLabel: 'AJOUTER LA PHOTO DU DESSERT',
  },
};

export const DEFAULT_SPICY_CARDS: SpicyCard[] = [
  {
    id: 'card-1',
    category: 'Sensualité & Bien-être',
    title: 'Massage à l’huile',
    description: 'Une huile tiède et satinée, des mouvements lents et enveloppants pour relâcher chaque tension et éveiller les sens.',
  },
  {
    id: 'card-2',
    category: 'Ambiance Feutrée',
    title: 'Lancer une musique douce et sexy',
    description: 'Tamiser les lumières, lancer une mélodie envoûtante et se laisser porter par le rythme et la complicité.',
  },
  {
    id: 'card-3',
    category: 'Complicité',
    title: 'Un secret murmuré',
    description: 'Dans le creux de l’oreille, se dire trois choses inavouables qu’on adore chez l’autre.',
  },
  {
    id: 'card-4',
    category: 'Jeu Privé',
    title: 'Carte blanche pour toi ce soir',
    description: 'Pendant 20 minutes, tu as le pouvoir absolu de choisir exactement ce que tu désires.',
  },
  {
    id: 'card-5',
    category: 'Intimité',
    title: 'Une coupe sous les draps',
    description: 'Terminer la soirée blottis l’un contre l’autre, sans regarder l’heure.',
  },
  {
    id: 'card-6',
    category: 'Mystère & Abandon',
    title: 'Se mettre dans le noir complet et laisser nos corps faire le reste',
    description: 'Éteindre chaque lumière, se repérer uniquement au souffle, au toucher et à la chaleur de la peau.',
  },
];
