import { PlayCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import EpisodCard from "./EpisodCard";
import { connect } from "react-redux";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import playIcon from "src/assets/images/play.png";
import { getTempHardcodedImage } from "src/utils/tempHardcodedImages";

const ResutContainer = ({ header, language, state, setLoader }) => {
  const [player, setPlayer] = useState({
    open: false,
    image: "",
    link: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => setLoader(false), 0);
  }, []);
  return (
    <div className="text-lightText dark:text-darkText transit dark:bg-[#333333]">
      <p className="text-[#fff] md:text-4xl lg:text-5xl font-semibold w-full text-center pt-40 max-md:pt-40 pt-24 pb-5 bg-[#17171B]">
        {t("header." + header)}{" "}
      </p>
      <div className="pb-12 xl:pb-28 ">
        {[...state]
          .sort((a, b) => {
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
            if (item.program_type_id === "627b742b3e200e8118224e1e") {
              return (
                <div
                  key={index}
                  className={`mx-auto w-11/12 xl:w-[1200px] my-12 xl:my-28  ${
                    index > 5 && "hidden md:block"
                  }`}
                >
                  <div className="border-b borderRedGradient w-2/3 mx-auto h-1" />
                  <div className="w-full lg:flex p-10 box-border">
                    <div>
                      <div className="md:w-[500px] h-[200px] md:h-[330px] rounded-2xl overflow-hidden">
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          playing={true}
                          controls
                          url={item.link}
                          playIcon={
                            <button>
                              <img src={playIcon} width="60px" />
                            </button>
                          }
                          light={getTempHardcodedImage(index)} // TEMPORARY: hardcoded image — revert to item.image
                        />
                      </div>
                    </div>
                    <div className="lg:flex w-full justify-center items-center pt-5">
                      <div className=" w-4/5">
                        <p className="font-semibold">{item.name[language]}</p>

                        <p className="text-xs">{item.description[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
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
                        {item.name[language]}
                      </Link>
                    </p>
                    <p className="hidden md:block absolute right-0 text-sm  cursor-pointer">
                      <Link to={`/tab_${item._id}`}>
                        <PlayCircleOutline className="text-red-700" />{" "}
                        {t("viewAll")}
                      </Link>
                    </p>
                  </div>
                  <div className="flex overflow-hidden mx-auto  w-11/12 xl:w-[1200px] gap-5">
                    {item.series.map((i, ind) => {
                      return (
                        <div
                          key={ind}
                          className="flex justify-center"
                          onClick={() =>
                            setPlayer({
                              image: getTempHardcodedImage(ind), // TEMPORARY: hardcoded image — revert to i.image
                              link: i.link,
                              open: true,
                            })
                          }
                        >
                          <EpisodCard item={i} index={ind} />
                        </div>
                      );
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

export default connect(mapState, mapDispatch)(ResutContainer);
