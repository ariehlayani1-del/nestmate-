export type GroupMember = {
  avatar: string;
  name: string;
  tags: string[];
};

export type Group = {
  id: number;
  name: string;
  members: GroupMember[];
  rythme: number;
  organisation: number;
  interests: string[];
  valeurs: number;
  domaine: string;
  classe: string;
  availableSpots: number;
};

export type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  surface: string;
  availableSpots: number;
  description: string;
  coordinates: { latitude: number; longitude: number };
  groups: Group[];
};

export type School = {
  name: string;
  address: string;
  coordinates: { latitude: number; longitude: number };
};

export type Profile = {
  rythme: number;
  organisation: number;
  interests: string[];
  valeurs: number;
  classe: string;
  domaine: string;
  ecole: School;
};

export const PROFILE_B: Profile = {
  rythme: 72,
  organisation: 68,
  interests: ['Cuisine', 'Sport', 'Cinéma', 'Voyage'],
  valeurs: 75,
  classe: 'Licence 3',
  domaine: 'Design',
  ecole: {
    name: 'École des Arts Numériques',
    address: '25 Rue de l\'Université, Lyon',
    coordinates: { latitude: 45.7595, longitude: 4.8280 },
  },
};

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'T3 lumineux proche Part-Dieu',
    location: 'Lyon 3e',
    price: '1 100€ / mois',
    bedrooms: '2 chambres disponibles',
    surface: '72m²',
    availableSpots: 2,
    description: 'Grand séjour, balcon, cuisine équipée. Quartier animé et bonnes lignes de tram.',
    coordinates: { latitude: 45.7590, longitude: 4.8500 },
    groups: [
      {
        id: 101,
        name: 'Groupe curieux et actif',
        members: [
          { avatar: '👩‍🎓', name: 'Léa', tags: ['Yoga', 'Lecture'] },
          { avatar: '👨‍💻', name: 'Tom', tags: ['Gaming', 'Cuisine'] },
          { avatar: '🧑‍🎨', name: 'Camille', tags: ['Art', 'Voyage'] },
        ],
        rythme: 70,
        organisation: 65,
        interests: ['Cuisine', 'Yoga', 'Voyage'],
        valeurs: 72,
        domaine: 'Design',
        classe: 'Licence 3',
        availableSpots: 1,
      },
      {
        id: 102,
        name: 'Groupe tranquille',
        members: [
          { avatar: '👨‍🔬', name: 'Hugo', tags: ['Science', 'Randonnée'] },
          { avatar: '👩‍💼', name: 'Emma', tags: ['Cinéma', 'Bien-être'] },
          { avatar: '👨‍🍳', name: 'Nico', tags: ['Cuisine', 'Foot'] },
        ],
        rythme: 55,
        organisation: 50,
        interests: ['Cinéma', 'Cuisine'],
        valeurs: 60,
        domaine: 'Sciences',
        classe: 'Licence 2',
        availableSpots: 0,
      },
    ],
  },
  {
    id: 2,
    title: 'Studio refait à neuf',
    location: 'Lyon 7e',
    price: '820€ / mois',
    bedrooms: 'Studio',
    surface: '28m²',
    availableSpots: 1,
    description: 'Idéal pour un profil seul qui veut un équilibre travail / détente.',
    coordinates: { latitude: 45.7480, longitude: 4.8265 },
    groups: [
      {
        id: 201,
        name: 'Groupe organisé',
        members: [
          { avatar: '👩‍💼', name: 'Sofia', tags: ['Bureau', 'Lecture'] },
          { avatar: '🧑‍💻', name: 'Nico', tags: ['Startup', 'Sport'] },
        ],
        rythme: 80,
        organisation: 85,
        interests: ['Sport', 'Design'],
        valeurs: 70,
        domaine: 'Design',
        classe: 'Licence 3',
        availableSpots: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Coloc cosy à Guillotière',
    location: 'Lyon 7e',
    price: '990€ / mois',
    bedrooms: '1 chambre disponible',
    surface: '55m²',
    availableSpots: 1,
    description: 'Ambiance conviviale, terrasse partagée et petit salon de musique.',
    coordinates: { latitude: 45.7435, longitude: 4.8440 },
    groups: [
      {
        id: 301,
        name: 'Groupe ouvert',
        members: [
          { avatar: '👩‍🏫', name: 'Julie', tags: ['Musique', 'Cinéma'] },
          { avatar: '👨‍🎨', name: 'Leo', tags: ['Art', 'Voyage'] },
          { avatar: '👨‍🍳', name: 'Anto', tags: ['Cuisine', 'Sport'] },
        ],
        rythme: 68,
        organisation: 62,
        interests: ['Cinéma', 'Cuisine', 'Voyage'],
        valeurs: 66,
        domaine: 'Design',
        classe: 'Licence 1',
        availableSpots: 1,
      },
    ],
  },
];

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const differenceScore = (a: number, b: number) => 100 - Math.abs(a - b);

const interestScore = (profile: Profile, group: Group) => {
  const common = profile.interests.filter((interest) => group.interests.includes(interest)).length;
  const total = Math.max(profile.interests.length, group.interests.length, 1);
  return Math.round((common / total) * 100);
};

export function computeCompatibility(profile: Profile, group: Group) {
  const rhythmScore = differenceScore(profile.rythme, group.rythme);
  const orgScore = differenceScore(profile.organisation, group.organisation);
  const valuesScore = differenceScore(profile.valeurs, group.valeurs);
  const interests = interestScore(profile, group);

  let total = rhythmScore * 0.4 + orgScore * 0.3 + interests * 0.2 + valuesScore * 0.1;
  if (profile.domaine && group.domaine && profile.domaine === group.domaine) {
    total += 5;
  }

  return clamp(Math.round(total));
}

export function findBestGroupForProperty(profile: Profile, property: Property) {
  const candidates = property.groups.filter((group) => group.availableSpots > 0);
  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce<{ group: Group | null; score: number }>((best, group) => {
    const score = computeCompatibility(profile, group);
    if (score > best.score) {
      return { group, score };
    }
    return best;
  }, { group: null, score: -1 });
}

export function isGroupCompatible(profile: Profile, group: Group, threshold = 70) {
  return group.availableSpots > 0 && computeCompatibility(profile, group) >= threshold;
}
