// TEMPORARY: Figma-mapped local images (Dar-21 design).
// Revert by deleting this file and restoring item.image usages in components.

import teamHero from "src/assets/images/team.jpg";

// TEMPORARY: Jul 30 user-uploaded images — homepage screenshot sequence
import heroBoing from "src/assets/images/events/hero-boing-orchestra.png";

import onAir01 from "src/assets/images/events/on-air-01-gevorg-arman.png";
import onAir02 from "src/assets/images/events/on-air-02-or-bari-hosts.png";
import onAir03 from "src/assets/images/events/on-air-03-host-presenter.png";
import onAir04 from "src/assets/images/events/on-air-04-studio-guests.png";

import event01 from "src/assets/images/events/event-01-yerevanyan-yereko.png";
import event02 from "src/assets/images/events/event-02-talk-show-collage.png";
import event03 from "src/assets/images/events/event-03-ore-bari-morning.png";
import event04 from "src/assets/images/events/event-04-yerevan-evening.png";
import event05 from "src/assets/images/events/event-05-or-bari-honey.png";
import event06 from "src/assets/images/events/event-06-without-tie-argishti.png";
import event07 from "src/assets/images/events/event-07-or-bari-guests.png";
import event08 from "src/assets/images/events/event-08-gagik-shahbazyan.png";

import face01 from "src/assets/images/events/face-01-host-presenter.png";
import face02 from "src/assets/images/events/face-02-karen-hambardzumyan.png";
import face03 from "src/assets/images/events/face-03-tv-interview.png";
import face04 from "src/assets/images/events/face-04-argishti-aronyan.png";
import face05 from "src/assets/images/events/face-05-rafo-khachatryan.png";

/** Homepage hero carousel — Boing Orchestra (Figma hero) */
export const FIGMA_HERO_IMAGES = [heroBoing];

/** "Today on air" sidebar thumbnails (top-to-bottom) */
export const FIGMA_ON_AIR_IMAGES = [onAir01, onAir02, onAir03, onAir04];

/** Programs/events grid on homepage (2×4, left-to-right, top-to-bottom) */
export const FIGMA_PROGRAM_BANNERS = [
  event01,
  event02,
  event03,
  event04,
  event05,
  event06,
  event07,
  event08,
];

/** Faces row on homepage + /faces grid (left-to-right) */
export const FIGMA_FACE_PORTRAITS = [face01, face02, face03, face04, face05];

/** Episode cards on programs/shows pages */
export const FIGMA_EPISODE_IMAGES = [onAir01, onAir02, onAir03, onAir04];

/** Films page items */
export const FIGMA_FILM_IMAGES = [event05, event06, event07, event08];

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
