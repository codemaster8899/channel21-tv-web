// TEMPORARY: Local hardcoded images replacing dynamic API image sources.
// Revert by deleting this file and restoring item.image usages in components.

import yerevanyanYereko from "src/assets/images/yerevanyan-yereko-gor-barseghyan.png";
import yerevanEveningTalkShow from "src/assets/images/yerevan-evening-talk-show.png";
import argishtiAronyanWithoutTie from "src/assets/images/argishti-aronyan-without-tie.png";
import withoutTieShowThumbnail from "src/assets/images/without-tie-show-thumbnail.png";
import argishtiAronyanInterview from "src/assets/images/argishti-aronyan-interview.png";
import hostPresenter21tv from "src/assets/images/21tv-host-presenter.png";
import karenHambardzumyanWithoutTie from "src/assets/images/karen-hambardzumyan-without-tie.png";
import gagikShahbazyanWithoutTie from "src/assets/images/gagik-shahbazyan-without-tie.png";
import tvHostGuestOnStage from "src/assets/images/tv-host-guest-on-stage.png";
import oreBariMorningShow from "src/assets/images/ore-bari-morning-show.png";
import orBariHoneyFeature from "src/assets/images/or-bari-honey-feature.png";
import boingOrchestraHovikArshakyan from "src/assets/images/boing-orchestra-hovik-arshakyan.png";
import armenianTvVarietyShow from "src/assets/images/armenian-tv-variety-show.png";
import orBariTalkShowThumbnail from "src/assets/images/or-bari-talk-show-thumbnail.png";
import tvShowGuestsElderlyCouple from "src/assets/images/tv-show-guests-elderly-couple.png";
import armenianTvInterview from "src/assets/images/armenian-tv-interview.png";
import orBariRafoKhachatryan from "src/assets/images/or-bari-rafo-khachatryan.png";
import talkShowCollage from "src/assets/images/talk-show-collage.png";

export const TEMP_HARDCODED_IMAGES = [
  yerevanyanYereko,
  yerevanEveningTalkShow,
  argishtiAronyanWithoutTie,
  withoutTieShowThumbnail,
  argishtiAronyanInterview,
  hostPresenter21tv,
  karenHambardzumyanWithoutTie,
  gagikShahbazyanWithoutTie,
  tvHostGuestOnStage,
  oreBariMorningShow,
  orBariHoneyFeature,
  boingOrchestraHovikArshakyan,
  armenianTvVarietyShow,
  orBariTalkShowThumbnail,
  tvShowGuestsElderlyCouple,
  armenianTvInterview,
  orBariRafoKhachatryan,
  talkShowCollage,
];

/** TEMPORARY: returns a local image by index (cycles through available images) */
export const getTempHardcodedImage = (index = 0) =>
  TEMP_HARDCODED_IMAGES[Math.abs(index) % TEMP_HARDCODED_IMAGES.length];
