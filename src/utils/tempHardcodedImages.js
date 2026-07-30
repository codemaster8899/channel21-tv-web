// TEMPORARY: Figma-mapped local images (Dar-21 design).
// Revert by deleting this file and restoring item.image usages in components.

import slide from "src/assets/images/slide.png";
import teamHero from "src/assets/images/team.jpg";

import ban1 from "src/assets/images/ban1.png";
import ban2 from "src/assets/images/ban2.png";
import ban3 from "src/assets/images/ban3.png";
import ban4 from "src/assets/images/ban4.png";
import ban5 from "src/assets/images/ban5.png";
import ban6 from "src/assets/images/ban6.png";
import ban7 from "src/assets/images/ban7.png";
import ban8 from "src/assets/images/ban8.png";

import pic25 from "src/assets/images/pic25.png";
import pic26 from "src/assets/images/pic26.png";
import pic27 from "src/assets/images/pic27.png";
import pic80 from "src/assets/images/pic80.png";
import pic81 from "src/assets/images/pic81.png";

import prog1 from "src/assets/images/prog1.png";
import prog2 from "src/assets/images/prog2.png";
import prog3 from "src/assets/images/prog3.png";
import prog4 from "src/assets/images/prog4.png";

/** Homepage hero carousel — Boing Orchestra (Figma hero) */
export const FIGMA_HERO_IMAGES = [slide];

/** "Today on air" sidebar thumbnails */
export const FIGMA_ON_AIR_IMAGES = [prog1, prog2, prog3, prog4];

/** Programs grid on homepage (2×4, left-to-right, top-to-bottom) */
export const FIGMA_PROGRAM_BANNERS = [
  ban8,
  ban2,
  ban3,
  ban4,
  ban5,
  ban1,
  ban7,
  ban6,
];

/** Faces row on homepage + /faces grid (Figma order) */
export const FIGMA_FACE_PORTRAITS = [pic80, pic26, pic81, pic25, pic27];

/** Episode cards on programs/shows pages */
export const FIGMA_EPISODE_IMAGES = [prog1, prog2, prog3, prog4];

/** Films page items */
export const FIGMA_FILM_IMAGES = [ban5, ban6, ban7, ban8];

/** /faces page hero banner */
export const FIGMA_FACES_HERO = teamHero;

/** TEMPORARY: empty localized fields for placeholder items */
export const TEMP_LOCALIZED_TEXT = { am: "", en: "", ru: "" };

const pickFrom = (images, index = 0) => images[Math.abs(index) % images.length];

/** TEMPORARY: section-specific Figma image getters */
export const getFigmaHeroImage = (index = 0) =>
  pickFrom(FIGMA_HERO_IMAGES, index);
export const getFigmaOnAirImage = (index = 0) =>
  pickFrom(FIGMA_ON_AIR_IMAGES, index);
export const getFigmaProgramBanner = (index = 0) =>
  pickFrom(FIGMA_PROGRAM_BANNERS, index);
export const getFigmaFacePortrait = (index = 0) =>
  pickFrom(FIGMA_FACE_PORTRAITS, index);
export const getFigmaEpisodeImage = (index = 0) =>
  pickFrom(FIGMA_EPISODE_IMAGES, index);
export const getFigmaFilmImage = (index = 0) =>
  pickFrom(FIGMA_FILM_IMAGES, index);
export const getFigmaFacesHero = () => FIGMA_FACES_HERO;

const createTempPlaceholder = (id) => ({
  _id: id,
  firstName: TEMP_LOCALIZED_TEXT,
  lastName: TEMP_LOCALIZED_TEXT,
  name: TEMP_LOCALIZED_TEXT,
  title: TEMP_LOCALIZED_TEXT,
  description: TEMP_LOCALIZED_TEXT,
  role: TEMP_LOCALIZED_TEXT,
  date: new Date().toISOString(),
  duration: "",
});

/** TEMPORARY: use API items when available, otherwise render placeholder slots */
export const withTempImageFallback = (
  items,
  count = FIGMA_FACE_PORTRAITS.length,
) =>
  items?.length
    ? items
    : Array.from({ length: count }, (_, index) =>
        createTempPlaceholder(`temp-${index}`),
      );

export const withTempSeriesFallback = (
  series,
  count = FIGMA_EPISODE_IMAGES.length,
) =>
  series?.length
    ? series
    : Array.from({ length: count }, (_, index) =>
        createTempPlaceholder(`temp-series-${index}`),
      );

export const withTempProgramFallback = (programs, count = 3) =>
  programs?.length
    ? programs
    : Array.from({ length: count }, (_, index) => ({
        ...createTempPlaceholder(`temp-program-${index}`),
        series: withTempSeriesFallback([], FIGMA_EPISODE_IMAGES.length),
      }));

export const withTempFilmFallback = (
  films,
  count = FIGMA_FILM_IMAGES.length,
) =>
  films?.length
    ? films
    : Array.from({ length: count }, (_, index) =>
        createTempPlaceholder(`temp-film-${index}`),
      );
