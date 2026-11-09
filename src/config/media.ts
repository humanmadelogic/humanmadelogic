/**
 * Human Made Logic art direction manifest. All imagery is self-hosted under
 * `/public/images/hml/`.
 */

export type SurfaceMode = 'refract' | 'material' | 'optical' | 'current' | 'kinetic';

export const SURFACE_MODE_IDS: Record<SurfaceMode, number> = {
  refract: 0,
  material: 1,
  optical: 2,
  current: 3,
  kinetic: 4,
};

export type Grade = {
  saturation: number;
  contrast: number;
  lift: number;
  warmth: number;
  brightness: number;
};

export type Crop = {
  aspect: string;
  position: string;
};

export type Treatment = {
  mode: SurfaceMode;
  grade: Grade;
  displacement: number;
  pointerInfluence: number;
  scrollInfluence: number;
  chromatic: number;
  damping: number;
};

export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  desktop: Crop;
  mobile: Crop;
  treatment: Treatment;
  radius: number;
};

const EDITORIAL: Grade = { saturation: 0.78, contrast: 1.1, lift: -0.035, warmth: 0.02, brightness: 1 };
const EDITORIAL_WARM: Grade = { saturation: 0.8, contrast: 1.12, lift: -0.04, warmth: 0.05, brightness: 1 };

const AUTHORED: Grade = { saturation: 1, contrast: 1, lift: 0, warmth: 0, brightness: 1 };

const PANEL_TREATMENT: Treatment = {
  mode: 'refract',
  grade: EDITORIAL,
  displacement: 1,
  pointerInfluence: 1.82,
  scrollInfluence: 0.55,
  chromatic: 1,
  damping: 11.5,
};

const BACKDROP_GRADE: Grade = {
  saturation: 0.38,
  contrast: 0.8,
  lift: 0.07,
  warmth: 0.03,
  brightness: 1.08,
};

const BACKDROP_TREATMENT: Treatment = {
  mode: 'refract',
  grade: BACKDROP_GRADE,
  displacement: 1,
  pointerInfluence: 2.16,
  scrollInfluence: 0.8,
  chromatic: 0.9,
  damping: 9.9,
};

const localWebp = (file: string) => `/images/hml/${file}.webp`;

const heroStudy = (id: string, file: string, alt: string): MediaAsset => ({
  id: `hero-${id}`,
  src: localWebp(file),
  alt,
  desktop: { aspect: '3 / 4', position: '50% 50%' },
  mobile: { aspect: '3 / 4', position: '50% 50%' },
  radius: 16,
  treatment: {
    mode: 'refract',
    grade: AUTHORED,
    displacement: 1,
    pointerInfluence: 1.82,
    scrollInfluence: 0.6,
    chromatic: 1,
    damping: 11.5,
  },
});

const backdropPanel = (id: string, file: string): MediaAsset => ({
  id: `stage-${id}`,
  src: localWebp(file),
  alt: '',
  desktop: { aspect: '1 / 1', position: '50% 50%' },
  mobile: { aspect: '1 / 1', position: '50% 50%' },
  radius: 0,
  treatment: BACKDROP_TREATMENT,
});

export const media = {
  stageFieldOne: backdropPanel('one', 'hero-identity'),
  stageFieldTwo: backdropPanel('two', 'hero-artdirection'),
  stageFieldThree: backdropPanel('three', 'hero-campaign'),
  stageFieldFour: backdropPanel('four', 'hero-culture'),

  heroIdentity: heroStudy(
    'identity',
    'hero-identity',
    'Hand pressing a rubber stamp; yellow seal carrying the H monogram',
  ),
  heroArtDirection: heroStudy(
    'art-direction',
    'hero-artdirection',
    'Magnifier over a field of dots; the lens finds the one yellow dot',
  ),
  heroProduct: heroStudy(
    'product',
    'hero-product',
    'Dart in the centre of a target with a yellow bullseye',
  ),
  heroCampaign: heroStudy(
    'campaign',
    'hero-campaign',
    'Two hands holding tin-can telephones joined by a yellow string',
  ),
  heroCulture: heroStudy(
    'culture',
    'hero-culture',
    'Hands stacked together over a yellow torn disc',
  ),

  monument: {
    id: 'process-monument',
    src: localWebp('process-monument'),
    alt: 'An old ear trumpet taking in yellow sound lines',
    desktop: { aspect: '16 / 11', position: '40% 44%' },
    mobile: { aspect: '4 / 3', position: '44% 44%' },
    radius: 12,
    treatment: PANEL_TREATMENT,
  },

  aperture: {
    id: 'process-aperture',
    src: localWebp('process-aperture'),
    alt: 'A hand holding up an empty frame filled with yellow',
    desktop: { aspect: '16 / 11', position: '52% 48%' },
    mobile: { aspect: '4 / 3', position: '52% 46%' },
    radius: 16,
    treatment: PANEL_TREATMENT,
  },

  pillar: {
    id: 'process-pillar',
    src: localWebp('process-pillar'),
    alt: 'A hand holding a yellow pencil upright above pencil shavings',
    desktop: { aspect: '3 / 5', position: '52% 38%' },
    mobile: { aspect: '3 / 4', position: '50% 40%' },
    radius: 12,
    treatment: PANEL_TREATMENT,
  },

  belief: {
    id: 'belief-dunes',
    src: localWebp('belief'),
    alt: 'Two people cutting and arranging paper shapes on a worktable, one piece in yellow',
    desktop: { aspect: '16 / 10', position: '50% 52%' },
    mobile: { aspect: '4 / 3', position: '54% 50%' },
    radius: 12,
    treatment: {
      mode: 'material',
      grade: EDITORIAL_WARM,
      displacement: 0.55,
      pointerInfluence: 0.41,
      scrollInfluence: 1.15,
      chromatic: 0,
      damping: 5.3,
    },
  },

  terrain: {
    id: 'work-terrain',
    src: localWebp('terrain'),
    alt: 'A crowd crossing a city junction from above, one walker circled in yellow',
    desktop: { aspect: '16 / 9', position: '46% 50%' },
    mobile: { aspect: '4 / 3', position: '48% 50%' },
    radius: 2,
    treatment: {
      mode: 'material',
      grade: EDITORIAL_WARM,
      displacement: 0.5,
      pointerInfluence: 0.61,
      scrollInfluence: 1,
      chromatic: 0,
      damping: 5.9,
    },
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;
