import { useEffect, useRef, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import { Button, ClickAwayListener, Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";
import OnTheAir from "./OnTheAir";
import Slider from "react-slick";
import { connect } from "react-redux";
import { getSliderStateTC } from "src/redux/reducers/SliderReducer";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import Carousel from "./Carousel";
import playIcon from "src/assets/images/play.png";
import {
  getTempHardcodedImage,
  withTempImageFallback,
} from "src/utils/tempHardcodedImages";

const PlayButton = styled(Button)(() => ({
  borderRadius: "60px",
  background:
    "linear-gradient(180deg, #ED0000 -6.67%, #D2000D 50.89%, #D2010D 50.9%, #BB1721 100%)",
  "&:hover": {
    background:
      "linear-gradient(180deg, #D2000D -6.67%, #D2000D 50.89%, #D2010D 50.9%, #BB1721 100%)",
  },
}));
const SwiperContainer = ({
  getSliderState,
  slider,
  language,
  setLoader,
  player,
  setPlayer,
}) => {
  // const slider = useRef();

  const { t } = useTranslation();
  const [item, setItem] = useState({});
  const [newSlider, setNewSlider] = useState();
  useEffect(() => {
    let newItem = JSON.parse(JSON.stringify(item));
    if (item.link) {
      const slideIndex = slider.findIndex((s) => s.link === item.link);
      setPlayer({
        open: true,
        link: newItem.link,
        image: getTempHardcodedImage(slideIndex >= 0 ? slideIndex : 0), // TEMPORARY: hardcoded image — revert to newItem.image
      });
    }
  }, [item]);
  useEffect(() => {
    if (!player.open) {
    }
  }, [player]);

  useEffect(() => {
    getSliderState();
  }, []);
  // useEffect(() => {
  //   setLoader(false);
  // }, [slider]);
  const settings = {
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };
  return (
    <div>
      <div className="relative">
        <div className="relative h-[250px] md:h-[600px] xl:h-[840px] ">
          <Carousel>
            {withTempImageFallback(slider, 5) // TEMPORARY: fallback when API returns empty
              .sort((a, b) => {
                if (a.slider_order > b.slider_order) {
                  return 1;
                }
                if (a.slider_order < b.slider_order) {
                  return -1;
                }
                return 0;
              })
              .map((item, index) => {
                return (
                  <div className="w-full h-full relative" key={`key_${index}`}>
                    <img
                      src={getTempHardcodedImage(index)} // TEMPORARY: hardcoded image — revert to item.image
                      className="h-full w-full object-cover"
                      alt=""
                    />
                    {item.title?.[language] && (
                      <div className="absolute left-5 !h-fit md:left-auto md:right-0 xl:right-28 w-[330px] bottom-8 xl:bottom-32 ">
                        <h2 className="text-white text-base md:text-3xl font-semibold mb-1 md:mb-3 w-fit">
                          {item.title[language].toUpperCase()}
                        </h2>
                        <p className="text-white w-2/3 mb-2 md:mb-8 text-xs md:text-base">
                          {item.description?.[language]}
                        </p>
                        <PlayButton
                          onClick={() => {
                            setItem(item);
                          }}
                        >
                          <div className="text-white flex items-center gap-4 normal-case w-[141px] justify-center pointer-events-auto">
                            <img src={require("src/assets/icons/playB.png")} />
                            <p>{t("swiper.watchNow")}</p>
                          </div>
                        </PlayButton>
                      </div>
                    )}
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className="hidden md:block w-[430px] lg:w-[500px] h-[444px] lg:h-[635px] -mt-[360px] lg:-mt-[500px]">
          <OnTheAir />
        </div>
        {/* <Slider
          ref={(slide) => setNewSlider(slide)}
          {...settings}
          className="mySwiper h-[250px] md:h-[600px] xl:h-[840px] flex"
          onClick={(e) => e.preventDefault()}
        ></Slider> */}
      </div>

      <Dialog
        maxWidth="xl"
        open={player.open}
        onClose={() => {
          setPlayer({ open: false, image: "", link: "" });
        }}
      >
        <div
          className="w-[300px] sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] h-[168.75px] sm:h-[337px] md:h-[393.75px] lg:h-[562.5px] xl:h-[675px]"
          onClick={(e) => e.stopPropagation()}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            playing={true}
            controls
            url={`${player.link}`}
            playIcon={
              <button>
                <img src={playIcon} width="60px" />
              </button>
            }
            light={player.image}
          />
        </div>
      </Dialog>
    </div>
  );
};

const mapState = (state) => ({
  slider: state.slider,
  language: state.main.language,
});
const mapDispatch = (dispatch) => ({
  getSliderState() {
    dispatch(getSliderStateTC());
  },
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});
export default connect(mapState, mapDispatch)(SwiperContainer);
