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

/** TEMPORARY: sample video links for placeholder events */
const TEMP_VIDEO_LINKS = [
  "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  "https://www.youtube.com/watch?v=2OEL4P1Rsy4",
  "https://www.youtube.com/watch?v=uelHwf8o7_U",
  "https://www.youtube.com/watch?v=450p7gOxZqg",
  "https://www.youtube.com/watch?v=EngW7tLk6Rs",
  "https://www.youtube.com/watch?v=9bZkp7q19f0",
  "https://www.youtube.com/watch?v=kXYiU_JCYtU",
  "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  "https://www.youtube.com/watch?v=OPf0YbXqDm0",
  "https://www.youtube.com/watch?v=RgKAFK5djSk",
  "https://www.youtube.com/watch?v=60ItHLz5WEA",
  "https://www.youtube.com/watch?v=JGwWNGJdvx8",
  "https://www.youtube.com/watch?v=lp-EO5I60KA",
  "https://www.youtube.com/watch?v=09R8_2nJtjg",
  "https://www.youtube.com/watch?v=hT_nvWreIhg",
];

const TEMP_EPISODE_DURATIONS = ["22:12", "1:05:49", "45:30", "38:15"];
const TEMP_EPISODE_DATES = [
  "2022-01-15T12:00:00.000Z",
  "2022-01-22T12:00:00.000Z",
  "2022-01-29T12:00:00.000Z",
  "2022-02-05T12:00:00.000Z",
];

const TEMP_ON_AIR_ITEMS = [
  {
    name: {
      am: "Երևանյան Երեկո",
      en: "Yerevan Evening",
      ru: "Ереванский вечер",
    },
    startDate: "2022-02-14T20:00:00.000Z",
    link: TEMP_VIDEO_LINKS[0],
  },
  {
    name: {
      am: "Օրը Բարի",
      en: "Good Day",
      ru: "Добрый день",
    },
    startDate: "2022-02-14T11:00:00.000Z",
    link: TEMP_VIDEO_LINKS[1],
  },
  {
    name: {
      am: "Առանց Փողկապի",
      en: "Without a Tie",
      ru: "Без галстука",
    },
    startDate: "2022-02-14T19:30:00.000Z",
    link: TEMP_VIDEO_LINKS[2],
  },
  {
    name: {
      am: "Երբ Երգում են Մեծերը",
      en: "When the Elders Sing",
      ru: "Когда поют старшие",
    },
    startDate: "2022-02-14T21:00:00.000Z",
    link: TEMP_VIDEO_LINKS[3],
  },
];

const TEMP_SLIDER_ITEM = {
  title: {
    am: "THE BOING ORCHESTRA",
    en: "THE BOING ORCHESTRA",
    ru: "THE BOING ORCHESTRA",
  },
  description: {
    am: "Հովիկ Արշակյան",
    en: "Hovik Arshakyan",
    ru: "Ховик Аршакян",
  },
  link: TEMP_VIDEO_LINKS[4],
  slider_order: 0,
};

const TEMP_FACE_ITEMS = [
  {
    firstName: { am: "Գոռ", en: "Gor", ru: "Гор" },
    lastName: { am: "Բարսեղյան", en: "Barseghyan", ru: "Бarseghyan" },
    role: { am: "Հաղորդավար", en: "Host", ru: "Ведущий" },
    link: TEMP_VIDEO_LINKS[5],
  },
  {
    firstName: { am: "Կարեն", en: "Karen", ru: "Карен" },
    lastName: { am: "Հамбարձումյան", en: "Hambardzumyan", ru: "Амбарцумян" },
    role: { am: "Հյուր", en: "Guest", ru: "Гость" },
    link: TEMP_VIDEO_LINKS[6],
  },
  {
    firstName: { am: "Արգիշտի", en: "Argishti", ru: "Аргишти" },
    lastName: { am: "Արոյան", en: "Aroyan", ru: "Ароян" },
    role: { am: "Հյուր", en: "Guest", ru: "Гость" },
    link: TEMP_VIDEO_LINKS[7],
  },
  {
    firstName: { am: "Ռաֆո", en: "Rafo", ru: "Рафо" },
    lastName: { am: "Խաչատրյան", en: "Khachatryan", ru: "Хачатрян" },
    role: { am: "Հյուր", en: "Guest", ru: "Гость" },
    link: TEMP_VIDEO_LINKS[8],
  },
  {
    firstName: { am: "Գագիկ", en: "Gagik", ru: "Гагик" },
    lastName: { am: "Շահբազյան", en: "Shahbazyan", ru: "Шahbazyan" },
    role: { am: "Բժիշկ", en: "Doctor", ru: "Врач" },
    link: TEMP_VIDEO_LINKS[9],
  },
];

/** Shows page — same layout as programs screenshot */
export const FIGMA_SHOW_SECTIONS = FIGMA_PROGRAM_SECTIONS;

const hasLocalizedText = (value) =>
  value?.am?.trim() || value?.en?.trim() || value?.ru?.trim();

const createTempEpisode = (sectionIndex, episodeIndex) => {
  const section =
    FIGMA_PROGRAM_SECTIONS[sectionIndex % FIGMA_PROGRAM_SECTIONS.length];
  const flatIndex = sectionIndex * 4 + episodeIndex;

  return {
    _id: `temp-series-${sectionIndex}-${episodeIndex}`,
    title: {
      am: `${section.name.am} 0${episodeIndex + 1}`,
      en: `${section.name.en} 0${episodeIndex + 1}`,
      ru: `${section.name.ru} 0${episodeIndex + 1}`,
    },
    description: {
      am: `${section.name.am} — ${episodeIndex + 1}-րդ թողարկում`,
      en: `${section.name.en} — episode ${episodeIndex + 1}`,
      ru: `${section.name.ru} — выпуск ${episodeIndex + 1}`,
    },
    link: TEMP_VIDEO_LINKS[flatIndex % TEMP_VIDEO_LINKS.length],
    duration:
      TEMP_EPISODE_DURATIONS[episodeIndex % TEMP_EPISODE_DURATIONS.length],
    date: TEMP_EPISODE_DATES[episodeIndex % TEMP_EPISODE_DATES.length],
  };
};

const createTempProgramSection = (section, sectionIndex) => ({
  _id: section._id,
  name: section.name,
  description: {
    am: `${section.name.am} հաղորդման վերջին թողարկումները 21TV-ում`,
    en: `Latest episodes of ${section.name.en} on 21TV`,
    ru: `Последние выпуски ${section.name.ru} на 21TV`,
  },
  link: TEMP_VIDEO_LINKS[sectionIndex % TEMP_VIDEO_LINKS.length],
  series: section.images.map((_, episodeIndex) =>
    createTempEpisode(sectionIndex, episodeIndex),
  ),
});

const enrichSeriesItem = (item, sectionIndex, episodeIndex) => ({
  ...item,
  title: hasLocalizedText(item.title)
    ? item.title
    : createTempEpisode(sectionIndex, episodeIndex).title,
  description: hasLocalizedText(item.description)
    ? item.description
    : createTempEpisode(sectionIndex, episodeIndex).description,
  link:
    item.link ||
    TEMP_VIDEO_LINKS[
      (sectionIndex * 4 + episodeIndex) % TEMP_VIDEO_LINKS.length
    ],
  duration:
    item.duration ||
    TEMP_EPISODE_DURATIONS[episodeIndex % TEMP_EPISODE_DURATIONS.length],
  date:
    item.date || TEMP_EPISODE_DATES[episodeIndex % TEMP_EPISODE_DATES.length],
});

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
  link: "",
});

const createTempItemByCount = (index, count) => {
  if (count === FIGMA_ON_AIR_IMAGES.length) {
    return {
      _id: `temp-on-air-${index}`,
      ...TEMP_ON_AIR_ITEMS[index % TEMP_ON_AIR_ITEMS.length],
    };
  }

  if (count === FIGMA_FACE_PORTRAITS.length) {
    return {
      _id: `temp-face-${index}`,
      ...TEMP_FACE_ITEMS[index % TEMP_FACE_ITEMS.length],
    };
  }

  if (count === 1) {
    return {
      _id: "temp-slider-0",
      ...TEMP_SLIDER_ITEM,
    };
  }

  if (count === FIGMA_EPISODE_IMAGES.length) {
    const sectionIndex = Math.floor(index / 4);
    const episodeIndex = index % 4;
    return createTempEpisode(sectionIndex, episodeIndex);
  }

  return createTempPlaceholder(`temp-${index}`);
};

/** TEMPORARY: use API items when available, otherwise render placeholder slots */
export const withTempImageFallback = (
  items,
  count = FIGMA_FACE_PORTRAITS.length,
) =>
  items?.length
    ? items
    : Array.from({ length: count }, (_, index) =>
        createTempItemByCount(index, count),
      );

export const withTempSeriesFallback = (series, count = 4) => {
  if (series?.length) {
    return series.map((item, episodeIndex) =>
      enrichSeriesItem(item, 0, episodeIndex),
    );
  }

  return Array.from({ length: count }, (_, episodeIndex) =>
    createTempEpisode(0, episodeIndex),
  );
};

export const withTempProgramFallback = (
  programs,
  count = FIGMA_PROGRAM_SECTIONS.length,
  sections = FIGMA_PROGRAM_SECTIONS,
) => {
  if (!programs?.length) {
    return sections
      .slice(0, count)
      .map((section, sectionIndex) =>
        createTempProgramSection(section, sectionIndex),
      );
  }

  return programs.map((program, sectionIndex) => {
    const fallbackSection = sections[sectionIndex % sections.length];

    return {
      ...program,
      name: hasLocalizedText(program.name)
        ? program.name
        : fallbackSection?.name || program.name,
      description: hasLocalizedText(program.description)
        ? program.description
        : {
            am: `${fallbackSection?.name?.am || "21TV"} հաղորդում`,
            en: `${fallbackSection?.name?.en || "21TV"} program`,
            ru: `${fallbackSection?.name?.ru || "21TV"} программа`,
          },
      link:
        program.link ||
        TEMP_VIDEO_LINKS[sectionIndex % TEMP_VIDEO_LINKS.length],
      series: program.series?.length
        ? program.series.map((item, episodeIndex) =>
            enrichSeriesItem(item, sectionIndex, episodeIndex),
          )
        : fallbackSection.images.map((_, episodeIndex) =>
            createTempEpisode(sectionIndex, episodeIndex),
          ),
    };
  });
};

export const withTempFilmFallback = (
  films,
  count = FIGMA_FILM_IMAGES.length,
) => {
  if (!films?.length) {
    return FIGMA_PROGRAM_SECTIONS.slice(0, count).map((section, index) => ({
      _id: `temp-film-${index}`,
      name: section.name,
      description: {
        am: `${section.name.am} — 21TV ֆիլմ`,
        en: `${section.name.en} — 21TV film`,
        ru: `${section.name.ru} — фильм 21TV`,
      },
      link: TEMP_VIDEO_LINKS[(index + 8) % TEMP_VIDEO_LINKS.length],
      createdAt: TEMP_EPISODE_DATES[index % TEMP_EPISODE_DATES.length],
    }));
  }

  return films.map((film, index) => ({
    ...film,
    name: hasLocalizedText(film.name)
      ? film.name
      : FIGMA_PROGRAM_SECTIONS[index % FIGMA_PROGRAM_SECTIONS.length].name,
    description: hasLocalizedText(film.description)
      ? film.description
      : {
          am: "21TV ֆիլմ",
          en: "21TV film",
          ru: "Фильм 21TV",
        },
    link: film.link || TEMP_VIDEO_LINKS[(index + 8) % TEMP_VIDEO_LINKS.length],
  }));
};
