import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import ButtonNew from "src/component/ButtonNew";
import { SortIcon } from "src/assets/icons/SortIcon";
import { getFilmsTC } from "src/redux/reducers/ProgramsAndShows";

import { connect } from "react-redux";
import playIcon from "src/assets/images/play.png";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import { useEffect, useState } from "react";

const Films = ({ language, films, setLoader }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isDown, setIsDown] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [toShow, setToshow] = useState(pageSize);
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
    if (isDown) {
      setToshow(toShow + pageSize);
      setIsDown(false);
    }
  }, [isDown]);
  useEffect(() => {
    setLoader(false);
  }, [films]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    };
  }, []);
  return (
    <div className="text-lightText dark:text-darkText transit dark:bg-[#333333]">
      <p className="text-[#fff] md:text-4xl lg:text-5xl font-semibold w-full text-center max-md:pt-40 pt-24 pb-5 bg-[#17171B]">
        {t("header.films")}{" "}
      </p>
      <div className="bg-[url('src/assets/images/bgr2.png')] bg-no-repeat bg-[left_center] w-full">
        <div className="mx-auto w-11/12 xl:w-[1200px] py-12 ">
          <div className=" ">
            {[...films]
              .sort((a, b) => {
                if (
                  new Date(a.createdAt).getTime() <
                  new Date(b.createdAt).getTime()
                ) {
                  return 1;
                }
                if (
                  new Date(a.createdAt).getTime() >
                  new Date(b.createdAt).getTime()
                ) {
                  return -1;
                }
                return 0;
              })
              .map((item, index) => {
                if (index < toShow) {
                  return (
                    <div
                      key={index}
                      className={`w-full  ${index > 5 && "hidden md:block"}`}
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
                              light={item.image}
                            />
                          </div>
                        </div>
                        <div className="lg:flex w-full justify-center items-center pt-5">
                          <div className=" w-4/5">
                            <p className="font-semibold">
                              {item.name[language]}
                            </p>

                            <p className="text-xs">
                              {item.description[language]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => ({
  language: state.main.language,
  films: state.programs.films,
});
const mapDispatch = (dispatch) => ({
  getFilms() {
    dispatch(getFilmsTC());
  },
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});
export default connect(mapState, mapDispatch)(Films);
