import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import EpisodCard from "src/component/EpisodCard";
import ButtonNew from "src/component/ButtonNew";
import { SortIcon } from "src/assets/icons/SortIcon";
import { connect } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  addEachStateTC,
  clearStateAC,
} from "src/redux/reducers/EachProgramReducer";
import playIcon from "src/assets/images/play.png";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import {
  getTempHardcodedImage,
  withTempImageFallback,
} from "src/utils/tempHardcodedImages";
import {
  ClickAwayListener,
  Collapse,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Pagination from "src/component/Pagination";

const EachProgram = ({
  eachProgram,
  setLoader,
  addEachState,
  language,
  clearState,
}) => {
  const [pageSize, setPageSize] = useState(20);
  let [query, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [episods, setEpisods] = useState([]);
  const [currentPage, setCurrentPage] = useState(false);
  const [fromNewest, setFromNewest] = useState(true);
  const [openFiltr, setOpenFiltr] = useState(false);
  const [width, setWidth] = useState("");

  const [player, setPlayer] = useState({
    open: false,
    image: "",
    link: "",
  });

  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    addEachState(id);
    setLoader(false);
    return () => {
      clearState();
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  useEffect(() => {
    if (width < 1280) {
      setPageSize(18);
    } else {
      setPageSize(20);
    }
  }, [width]);
  useEffect(() => {
    if (query.get("page") > 1) {
      setCurrentPage(query.get("page"));
    } else setCurrentPage(false);
  }, [query.get("page")]);
  useEffect(() => {
    setEpisods([...eachProgram.series]);
    setLoader(false);
  }, [eachProgram.series]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const displayEpisods = withTempImageFallback(episods, 8); // TEMPORARY: fallback when API returns empty

  return (
    <div className="text-lightText dark:text-darkText transit dark:bg-[#333333]">
      <div className="bg-[#0F0F0F] text-darkText pt-28 pb-8">
        <div className="bg-[url('src/assets/images/TV21.png')] bg-no-repeat bg-right-top w-full">
          <div className="mx-auto w-11/12 xl:w-[1200px] lg:flex">
            <div>
              {displayEpisods.length > 0 && (
                <div className="md:w-[500px] h-[200px] md:h-[330px]">
                  {displayEpisods[displayEpisods.length - 1]?.link ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      playing={true}
                      playIcon={
                        <button>
                          <img src={playIcon} width="60px" />
                        </button>
                      }
                      controls
                      url={displayEpisods[displayEpisods.length - 1].link}
                      light={getTempHardcodedImage(0)} // TEMPORARY: hardcoded image — revert to episods[...].image
                    />
                  ) : (
                    <img
                      src={getTempHardcodedImage(0)} // TEMPORARY: hardcoded image — revert to episods[...].image
                      alt=""
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="lg:flex w-full justify-center items-center pt-5">
              <div className=" w-4/5">
                <p className="font-semibold">{eachProgram.name?.[language]}</p>

                <p className="text-xs">{eachProgram.description?.[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('src/assets/images/bgr2.png')] bg-no-repeat bg-[left_center] w-full">
        <div className="mx-auto w-11/12 xl:w-[1200px] py-12 h-fit">
          <div className="flex justify-between">
            <p
              className="borderRedGradient border-t-2 pt-1 ml-2 mb-12 w-fit text-xl font-medium cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowBack /> <span> {t("back")}</span>
            </p>
            <div className="relative w-fit text-right z-10">
              <p
                className=" pt-1 ml-2 mb-12 w-fit text-xl text-right font-medium flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenFiltr(true)}
              >
                <SortIcon />
                <span className="hidden md:block"> {t("sort")}</span>
              </p>
              <Collapse
                in={openFiltr}
                timeout="auto"
                unmountOnExit
                className="absolute top-10 right-0 bg-white whitespace-nowrap w-fit px-3 text-gray-700 rounded shadow text-center"
              >
                <ClickAwayListener onClickAway={() => setOpenFiltr(false)}>
                  <List className="!py-0">
                    <ListItem className="!p-0 !text-center">
                      <ListItemText
                        onClick={() => {
                          setFromNewest(true);
                          setOpenFiltr(false);
                        }}
                        className="cursor-pointer hover:bg-lightBG"
                      >
                        {t("newToOld")}
                      </ListItemText>
                    </ListItem>

                    <Divider />
                    <ListItem className="!p-0 !text-center">
                      <ListItemText
                        onClick={() => {
                          setFromNewest(false);
                          setOpenFiltr(false);
                        }}
                        className="cursor-pointer hover:bg-lightBG"
                      >
                        {t("oldToNew")}
                      </ListItemText>
                    </ListItem>
                  </List>
                </ClickAwayListener>
              </Collapse>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 ">
            {displayEpisods
              .sort((a, b) => {
                if (!a.date || !b.date) return 0;
                if (fromNewest) {
                  if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
                    return 1;
                  }
                  if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                    return -1;
                  }
                  return 0;
                } else {
                  if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
                    return 1;
                  }
                  if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
                    return -1;
                  }
                  return 0;
                }
              })
              .map((item, index) => {
                if (
                  index >= ((currentPage ? currentPage : 1) - 1) * pageSize &&
                  index < (currentPage ? currentPage : 1) * pageSize
                ) {
                  return (
                    <div
                      key={index}
                      className={`w-full flex justify-center `}
                      onClick={() =>
                        setPlayer({
                          image: getTempHardcodedImage(index), // TEMPORARY: hardcoded image — revert to item.image
                          link: item.link,
                          open: true,
                        })
                      }
                    >
                      <EpisodCard item={item} index={index} />
                    </div>
                  );
                }
              })}
          </div>
          {displayEpisods.length > pageSize && (
            <div className="w-full flex justify-end mt-20">
              <Pagination
                count={Math.ceil(displayEpisods.length / pageSize)}
                currentPage={currentPage ? currentPage : 1}
                setCurrentPage={(e) => {
                  if (e > 1) {
                    navigate(`?page=${e}`);
                  }
                  if (e == 1) {
                    navigate(`/tab_${id}`);
                  }
                  setCurrentPage(e);
                }}
              />
            </div>
          )}
        </div>
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
        {/* <div className="w-full overflow-hidden rounded-3xl"> */}
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
        {/* </div> */}
      </Dialog>
    </div>
  );
};

const mapState = (state) => {
  return {
    eachProgram: state.eachProgram,
    language: state.main.language,
  };
};
const mapDispatch = (dispatch) => {
  return {
    addEachState(id) {
      dispatch(addEachStateTC(id));
    },
    clearState() {
      dispatch(clearStateAC());
    },
    setLoader(data) {
      dispatch(setLoaderAC(data));
    },
  };
};

export default connect(mapState, mapDispatch)(EachProgram);
