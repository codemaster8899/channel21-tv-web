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

// TEMPORARY: Programs page screenshot — 4 sections × 4 episode cards
import yerevanyan01 from "src/assets/images/programs/yerevanyan-01.png";
import yerevanyan02 from "src/assets/images/programs/yerevanyan-02.png";
import yerevanyan03 from "src/assets/images/programs/yerevanyan-03.png";
import yerevanyan04 from "src/assets/images/programs/yerevanyan-04.png";
import orBari01 from "src/assets/images/programs/or-bari-01.png";
import orBari02 from "src/assets/images/programs/or-bari-02.png";
import orBari03 from "src/assets/images/programs/or-bari-03.png";
import orBari04 from "src/assets/images/programs/or-bari-04.png";
import withoutTie01 from "src/assets/images/programs/without-tie-01.png";
import withoutTie02 from "src/assets/images/programs/without-tie-02.png";
import withoutTie03 from "src/assets/images/programs/without-tie-03.png";
import withoutTie04 from "src/assets/images/programs/without-tie-04.png";
import eldersSing01 from "src/assets/images/programs/elders-sing-01.png";
import eldersSing02 from "src/assets/images/programs/elders-sing-02.png";
import eldersSing03 from "src/assets/images/programs/elders-sing-03.png";
import eldersSing04 from "src/assets/images/programs/elders-sing-04.png";

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

/** Programs page — 4 rows matching Figma screenshot (4 cards each) */
export const FIGMA_PROGRAM_SECTIONS = [
  {
    _id: "temp-yerevanyan-yereko",
    name: {
      am: "Երևանյան Երեկո",
      en: "Yerevan Evening",
      ru: "Ереванский вечер",
    },
    images: [yerevanyan01, yerevanyan02, yerevanyan03, yerevanyan04],
  },
  {
    _id: "temp-or-bari",
    name: {
      am: "Օրը Բարի",
      en: "Good Day",
      ru: "Добрый день",
    },
    images: [orBari01, orBari02, orBari03, orBari04],
  },
  {
    _id: "temp-without-tie",
    name: {
      am: "Առանց Փողկապի",
      en: "Without a Tie",
      ru: "Без галстука",
    },
    images: [withoutTie01, withoutTie02, withoutTie03, withoutTie04],
  },
  {
    _id: "temp-elders-sing",
    name: {
      am: "Երբ Երգում են Մեծերը",
      en: "When the Elders Sing",
      ru: "Когда поют старшие",
    },
    images: [eldersSing01, eldersSing02, eldersSing03, eldersSing04],
  },
];

/** Flat episode list for card index lookup (section × 4 + card) */
export const FIGMA_EPISODE_IMAGES = FIGMA_PROGRAM_SECTIONS.flatMap(
  (section) => section.images,
);

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
export const getFigmaProgramSectionImage = (
  sectionIndex = 0,
  episodeIndex = 0,
) =>
  FIGMA_PROGRAM_SECTIONS[sectionIndex]?.images[episodeIndex] ??
  getFigmaEpisodeImage(sectionIndex * 4 + episodeIndex);
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

const TEMP_EPISODE_DURATIONS = ["22:12", "1:05:49", "45:30", "38:15"];
const TEMP_EPISODE_DATES = [
  "2022-01-15T12:00:00.000Z",
  "2022-01-22T12:00:00.000Z",
  "2022-01-29T12:00:00.000Z",
  "2022-02-05T12:00:00.000Z",
];

export const withTempProgramFallback = (
  programs,
  count = FIGMA_PROGRAM_SECTIONS.length,
) =>
  programs?.length
    ? programs
    : FIGMA_PROGRAM_SECTIONS.slice(0, count).map((section, sectionIndex) => ({
        ...createTempPlaceholder(section._id),
        name: section.name,
        series: section.images.map((_, episodeIndex) => ({
          ...createTempPlaceholder(
            `temp-series-${sectionIndex}-${episodeIndex}`,
          ),
          title: section.name,
          duration: TEMP_EPISODE_DURATIONS[episodeIndex],
          date: TEMP_EPISODE_DATES[episodeIndex],
        })),
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
