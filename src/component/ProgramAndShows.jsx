import { PlayCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import EpisodCard from "./EpisodCard";
import { connect } from "react-redux";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import playIcon from "src/assets/images/play.png";
import EmptyEpisodCard from "./EmptyEpisodCard";
import {
  getFigmaHeroImage,
  getFigmaEpisodeImage,
  withTempProgramFallback,
  withTempSeriesFallback,
} from "src/utils/tempHardcodedImages";

const ProgramAndShows = ({ header, language, state, setLoader }) => {
  const [player, setPlayer] = useState({
    open: false,
    image: "",
    link: "",
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDown, setIsDown] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [toShow, setToshow] = useState(pageSize);
  useEffect(() => {
    if (isDown) {
      setToshow(toShow + pageSize);
      setIsDown(false);
    }
  }, [isDown]);
  const scrollDown = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      setIsDown(true);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => setLoader(false), 0);
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
  }, []);

  return (
    <div className="text-lightText dark:text-darkText transit dark:bg-[#333333]">
      <p className="text-[#fff] md:text-4xl lg:text-5xl font-semibold w-full text-center max-md:pt-40 pt-24 pb-5 bg-[#17171B]">
        {t("header." + header)}{" "}
      </p>
      <div className="h-[200px] md:h-[400px] w-full">
        <img
          src={getFigmaHeroImage(0)} // TEMPORARY: Figma hero — remove when API images are restored
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pb-12 xl:pb-28 ">
        {withTempProgramFallback(state, 3) // TEMPORARY: fallback when API returns empty
          .sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            if (
              new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
            ) {
              return 1;
            }
            if (
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
            ) {
              return -1;
            }
            return 0;
          })
          .map((item, index) => {
            if (index < toShow) {
              return (
                <div className="w-full" key={index}>
                  <div className="mx-auto  w-11/12 xl:w-[1200px] flex justify-center gap-5 my-12 xl:my-28 border-b-2 borderGrayGradient box-border h-11 relative ">
                    <div
                      className={`box-content border-b-2 borderRedGradient w-[160px] h-full absolute transit `}
                    ></div>
                    <p
                      className="h-full cursor-pointer box-content relative z-10 
                 flex items-center gap-2"
                    >
                      <Link to={`/tab_${item._id}`}>
                        <span className="text-red-700 md:hidden">
                          <PlayCircleOutline />
                        </span>{" "}
                        {item.name?.[language]}
                      </Link>
                    </p>
                    <p className="hidden md:block absolute right-0 text-sm  cursor-pointer">
                      <Link to={`/tab_${item._id}?`}>
                        <PlayCircleOutline className="text-red-700" />{" "}
                        {t("viewAll")}
                      </Link>
                    </p>
                  </div>
                  <div className="flex customScrollx overflow-x-scroll mx-auto  w-11/12 xl:w-[1200px] gap-5">
                    {withTempSeriesFallback(item.series, 4).map((i, ind) => {
                      if (item.series?.length > 3) {
                        if (ind < 3) {
                          return (
                            <div
                              key={ind}
                              className="flex justify-center"
                              onClick={() => {
                                setPlayer({
                                  image: getFigmaEpisodeImage(index * 4 + ind), // TEMPORARY: Figma episode — revert to i.image
                                  link: i.link,
                                  open: true,
                                });
                              }}
                            >
                              <EpisodCard item={i} index={index * 4 + ind} />
                            </div>
                          );
                        }
                        if (ind === 3) {
                          return (
                            <div
                              key={ind}
                              className="flex justify-center"
                              onClick={() => {
                                navigate(`/tab_${item._id}`);
                              }}
                            >
                              <EmptyEpisodCard
                                item={i}
                                count={(item.series?.length || 4) - 3}
                                index={index * 4 + ind}
                              />
                            </div>
                          );
                        }
                      } else {
                        return (
                          <div
                            key={ind}
                            className="flex justify-center "
                            onClick={() => {
                              setPlayer({
                                image: getFigmaEpisodeImage(index * 4 + ind), // TEMPORARY: Figma episode — revert to i.image
                                link: i.link,
                                open: true,
                              });
                            }}
                          >
                            <EpisodCard item={i} index={index * 4 + ind} />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <Dialog
        maxWidth="xl"
        open={player.open}
        onClose={() => {
          setPlayer({ image: "", link: "", open: false });
        }}
        className="bg-transparent"
        sx={{ background: "transparent" }}
      >
        <div className="w-[300px] sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] h-[168.75px] sm:h-[337px] md:h-[393.75px] lg:h-[562.5px] xl:h-[675px]">
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
            className="w-full"
            light={player.image}
          />
        </div>
      </Dialog>
    </div>
  );
};

const mapState = (state) => {
  return {
    programs: state.programs,
    language: state.main.language,
  };
};
const mapDispatch = (dispatch) => ({
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});

export default connect(mapState, mapDispatch)(ProgramAndShows);
