import { ArrowDropDown, ArrowDropUp, Close, Search } from "@mui/icons-material";
import {
  ClickAwayListener,
  Collapse,
  Dialog,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import HeaderNavigation from "./HeaderNavigation";
import MenuIcon from "src/assets/icons/MenuIcon";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeDarkAC,
  changeLanguageAC,
  setLoaderAC,
} from "src/redux/reducers/MainReducer";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import FacebookIcon from "src/assets/icons/FacebookIcon";
import TwiterIcon from "src/assets/icons/TwiterIcon";
import InstagramIcon from "src/assets/icons/InstagramIcon";
import YoutubeIcon from "src/assets/icons/YoutubeIcon";
import { getResultTC, setSearchItemAC } from "src/redux/reducers/SearchReducer";
import ReactPlayer from "react-player";
import OnTheAir from "../Swiper/OnTheAir";
const SearchButton = styled(Fab)(() => ({
  background:
    "linear-gradient(180deg, #ED0000 -6.67%, #D2000D 50.89%, #D2010D 50.9%, #BB1721 100%)",
  "&:hover": {
    background:
      "linear-gradient(180deg, #D2000D -6.67%, #D2000D 50.89%, #D2010D 50.9%, #BB1721 100%)",
  },
}));
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "#FFFFFF0d",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    background:
      "linear-gradient(180deg, #ED0000 -6.67%, #D2000D 50.89%, #D2010D 50.9%, #BB1721 100%)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#c2c2c3" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const HeaderBottom = ({
  main,
  setDark,
  changeLanguage,
  setLoader,
  setSearchItem,
  getResult,
}) => {
  const html = document.querySelector("html");
  const [openSideBar, setOpenSideBar] = useState(false);
  const [active, setActive] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [player, setPlayer] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [onAir, setOnAir] = useState(false);
  const [width, setWidth] = useState("");

  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchHandeler = () => {
    if (search.length > 0) {
      navigate("/results");
      setSearchItem(search);
      setSearch("");
      setActive(!active);
      getResult(search);
      setOpenSideBar(false);
    } else {
      setActive(!active);
    }
    setIsEnter(false);
  };
  useEffect(() => {
    main.dark
      ? html.setAttribute("class", "dark")
      : html.setAttribute("class", "light");
  }, [main.dark]);
  useEffect(() => {
    if (isEnter) {
      searchHandeler();
    }
  }, [isEnter]);
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    window.addEventListener("keypress", (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        setIsEnter(true);
      }
    });
    return () => {
      window.removeEventListener("keypress", (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
          setIsEnter(false);
        }
      });
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  useEffect(() => {
    if (width > 768) {
      setOnAir(false);
    }
  }, [width]);
  return (
    <div className="bg-gradient-to-b from-black to-transparent h-24  ">
      <div className=" h-full">
        <div className="hidden xl:flex mx-auto w-11/12 xl:w-[1200px] items-center justify-between h-full">
          <div className=" items-center gap-8 flex w-full ">
            <Link to="/">
              <img
                src={require("src/assets/images/logo_1.png")}
                alt=""
                onClick={() => {
                  setActiveLink("");
                  setLoader(true);
                }}
              />
            </Link>
            <HeaderNavigation
              vertical={false}
              active={activeLink}
              setActive={setActiveLink}
              setPlayer={setPlayer}
            />
          </div>
          <div className="flex text-white items-center gap-4 ">
            <div className="relative flex items-center">
              <input
                type="text"
                className={`rounded-full h-full  transit absolute right-0 bg-white/30  w-full focus:outline-none text-white placeholder:text-white  ${
                  active ? " w-56  p-4 pr-12" : " w-10 p-0"
                }`}
                placeholder={t("header.search")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <div>
                <SearchButton size="small" onClick={searchHandeler}>
                  <Search className="text-white" />
                </SearchButton>
              </div>
            </div>
            <LanguageSelector />

            <IOSSwitch
              sx={{ m: 1 }}
              checked={main.dark}
              onChange={() => {
                setDark();
              }}
            />
          </div>
        </div>

        <div className="w-full xl:hidden  h-full relative">
          <div className="mx-auto w-11/12 xl:w-[1200px] flex justify-between items-center h-full  ">
            <Link to="/">
              <img src={require("src/assets/images/logo_1.png")} alt="" />
            </Link>{" "}
            <div className="">
              <ClickAwayListener
                onClickAway={() => {
                  setOpenSideBar(false);
                }}
              >
                <div>
                  <div
                    className="text-white cursor-pointer"
                    onClick={() => {
                      setOpenSideBar(true);
                    }}
                  >
                    <MenuIcon />
                  </div>
                  <div
                    className={`absolute transit top-0 right-0 whitespace-nowrap ${
                      openSideBar ? "w-full sm:w-[400px]" : "w-0 "
                    }`}
                  >
                    {openSideBar && (
                      <div
                        className="w-full pb-10  transit bg-lightBG dark:bg-darkBG dark:text-darkText"
                        style={{ minHeight: "calc(100vh - 48px)" }}
                      >
                        <div className="bg-[#cfcfcf] dark:bg-[#0F0F0F] transit p-5 pt-2">
                          <div className="flex justify-between mb-6 items-center">
                            <div className="relative z-20">
                              <LanguageSelector />
                            </div>
                            <div className="flex gap-3 items-center">
                              <IOSSwitch
                                sx={{ m: 1 }}
                                checked={main.dark}
                                onChange={() => {
                                  setDark();
                                }}
                              />
                              <div
                                className=" relative z-10 cursor-pointer"
                                onClick={() => setOpenSideBar(false)}
                              >
                                <Close />
                              </div>
                            </div>
                          </div>
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                              className={`rounded-full h-full  transit absolute right-0 bg-white/30  w-full focus:outline-none text-black dark:text-white placeholder:text-white p-4 pr-12`}
                              placeholder={t("header.search")}
                            />

                            <div className=" w-full flex justify-end">
                              <SearchButton
                                size="small"
                                onClick={searchHandeler}
                              >
                                <Search className="text-white" />
                              </SearchButton>
                            </div>
                          </div>
                        </div>
                        <div className="transit-2">
                          <div
                            onClick={() => setOpenSideBar(false)}
                            className={`overflow-hidden h-fit transit-2  ${
                              onAir ? "h-0 " : ""
                            }`}
                          >
                            <HeaderNavigation
                              vertical={true}
                              active={activeLink}
                              setActive={setActiveLink}
                              setPlayer={setPlayer}
                            />
                          </div>
                        </div>
                        <div className="flex md:hidden justify-center w-full mt-5 relative">
                          {!onAir && (
                            <button
                              className="px-6 py-4 rounded-lg bg-[#c5c5c3] dark:bg-[#454549]"
                              onClick={() => {
                                setOnAir(true);
                              }}
                            >
                              {t("swiper.onAir")}
                            </button>
                          )}
                          {onAir && (
                            <div className="w-full h-[calc(100vh-210px)] relative">
                              <div
                                className=" absolute right-5 top-8 z-20 text-white cursor-pointer"
                                onClick={() => setOnAir(false)}
                              >
                                <Close />
                              </div>{" "}
                              <OnTheAir />
                            </div>
                          )}
                        </div>
                        <div
                          className="flex justify-center text-darkBG items-center gap-6 bg-white absolute bottom-0 h-[40px] md:hidden w-full"
                          onClick={() => setOpenSideBar(false)}
                        >
                          <p className="cursor-pointer">
                            <FacebookIcon />
                          </p>
                          <p className="cursor-pointer">
                            <TwiterIcon />
                          </p>
                          <p className="cursor-pointer">
                            <InstagramIcon />
                          </p>
                          <p className="cursor-pointer">
                            <YoutubeIcon />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        maxWidth="xl"
        open={player}
        onClose={() => {
          setPlayer(false);
        }}
      >
        <div className="w-[300px] sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] h-[168.75px] sm:h-[337px] md:h-[393.75px] lg:h-[562.5px] xl:h-[675px]">
          <ReactPlayer
            width="100%"
            height="100%"
            playing={true}
            controls
            url={main.liveLink}
            playIcon={
              <button>
                <img src={require("src/assets/images/play.png")} width="60px" />
              </button>
            }
            light={require("src/assets/images/Background4x.png")}
          />
        </div>
      </Dialog>
    </div>
  );
};
const mapState = (state) => {
  return {
    main: state.main,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setDark() {
      dispatch(changeDarkAC());
    },
    changeLanguage(data) {
      dispatch(changeLanguageAC(data));
    },
    setLoader(data) {
      dispatch(setLoaderAC(data));
    },
    setSearchItem(data) {
      dispatch(setSearchItemAC(data));
    },
    getResult(data) {
      dispatch(getResultTC(data));
    },
  };
};
export default connect(mapState, mapDispatch)(HeaderBottom);
