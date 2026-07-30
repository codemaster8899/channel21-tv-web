import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Slider, { slickGoTo } from "react-slick";

import ButtonNew from "src/component/ButtonNew";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import { getTempHardcodedImage } from "src/utils/tempHardcodedImages";
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  dots: false,
  arrows: false,
  autoplaySpeed: 5000,
  className: "w-full h-full",
  pauseOnHover: false,
};

const BanersContainer = ({ programs, setLoader }) => {
  const programRef = useRef();
  const shows = useRef();
  const films = useRef();
  const slider = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("programs");
  const [newSlider, setNewSlider] = useState();
  const [target, setTarget] = useState({ clientWidth: 132, offsetLeft: 0 });
  useEffect(() => {
    setLoader(false);
  }, [programs]);
  useEffect(() => {
    console.dir(target);
  }, [target]);
  return (
    <div className="w-full ">
      <div className="mx-auto   w-11/12 xl:w-[1200px] hidden md:flex justify-center  my-12 xl:my-20 border-b-2 borderGrayGradient box-border h-11 relative whitespace-nowrap">
        <div className=" flex  md:gap-5 relative w-fit">
          <div
            className={`box-content border-b-2 text-center borderRedGradient  h-full absolute transit `}
            style={{
              width: target.clientWidth,
              left: target.offsetLeft,
            }}
          ></div>
          <p
            className={`h-full text-center text-xs md:text-base cursor-pointer box-content relative z-10 whitespace-nowrap md:px-4 `}
            ref={programRef}
            onClick={(e) => {
              setCurrent("programs");
              setTarget(e.target);
              newSlider.slickGoTo(0);
            }}
            onDoubleClick={() => navigate("programs")}
          >
            {t(`header.programs`)}
          </p>
          <p
            className={`h-full text-center text-xs md:text-base cursor-pointer box-content relative z-10 whitespace-nowrap  md:px-4`}
            ref={shows}
            onClick={(e) => {
              setCurrent("shows");
              setTarget(e.target);
              newSlider.slickGoTo(1);
            }}
            onDoubleClick={() => navigate("shows")}
          >
            {t(`header.shows`)}
          </p>
          <p
            className={`h-full text-center text-xs md:text-base cursor-pointer box-content relative z-10 whitespace-nowrap md:px-4 `}
            ref={films}
            onClick={(e) => {
              setCurrent("films");
              setTarget(e.target);
              newSlider.slickGoTo(2);
            }}
            onDoubleClick={() => navigate("films")}
          >
            {t(`header.films`)}
          </p>
        </div>
      </div>
      <div className="mx-auto  w-11/12 xl:w-[1200px] flex md:hidden justify-center  my-12    box-content -z-0 relative whitespace-nowrap">
        <div className=" w-full h-full relative z-20">
          <Slider
            ref={(slider) => setNewSlider(slider)}
            {...settings}
            className="w-full h-full relative z-20"
            // asNavFor={initialSlide}
            afterChange={(e) => {
              if (e == 0) {
                setCurrent("programs");
                setTarget(programRef.current);
              }
              if (e == 1) {
                setTarget(shows.current);
                setCurrent("shows");
              }
              if (e == 2) {
                setTarget(films.current);
                setCurrent("films");
              }
            }}
          >
            <p
              className={`text-center text-xs md:text-base h-full  border-b-2 borderRedGradient  cursor-pointer  box-border pb-4 z-10 whitespace-nowrap md:px-4 `}
              onClick={(e) => {
                // setCurrent("programs");
                setTarget(e.target);
              }}
              onDoubleClick={() => navigate("programs")}
            >
              {t(`header.programs`)}
            </p>
            <p
              className={`text-center text-xs md:text-base h-full  border-b-2 borderRedGradient  cursor-pointer  box-border pb-4 z-10 whitespace-nowrap md:px-4 `}
              onClick={(e) => {
                // setCurrent("shows");
                setTarget(e.target);
              }}
              onDoubleClick={() => navigate("shows")}
            >
              {t(`header.shows`)}
            </p>
            <p
              className={`text-center text-xs md:text-base h-full  border-b-2 borderRedGradient  cursor-pointer  box-border pb-4 z-10 whitespace-nowrap md:px-4 `}
              onClick={(e) => {
                // setCurrent("films");
                setTarget(e.target);
              }}
              onDoubleClick={() => navigate("films")}
            >
              {t(`header.films`)}
            </p>
          </Slider>
        </div>
      </div>
      <div className="flex flex-wrap  justify-center  gap-y-3 mx-auto w-11/12 xl:w-[1200px]">
        {[...programs[current]]
          .sort((a, b) => {
            if (a.banners_order > b.banners_order) {
              return 1;
            }
            if (a.banners_order < b.banners_order) {
              return -1;
            }
            return 0;
          })
          .map((item, index) => {
            return (
              <div key={index} className="w-1/2 sm:w-1/3 xl:w-1/4">
                <div
                  className={`w-[135px] md:w-[220px] lg:w-[285px] h-[165px] md:h-[260px] lg:h-[315px] mx-auto rounded-xl overflow-hidden `}
                >
                  <Link to={`/tab_${item._id}`}>
                    <img
                      src={getTempHardcodedImage(index)} // TEMPORARY: hardcoded image — revert to item.image
                      width="285"
                      height="315"
                      onClick={() => {}}
                      className={`transit w-full h-full object-cover ${
                        index >= 4 ? "hidden md:block" : ""
                      }`}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      <div className="md:hidden flex justify-center mt-8">
        <div onClick={() => navigate(`/${current}`)}>
          <ButtonNew>{t("seeMore")}</ButtonNew>
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    programs: state.programs,
  };
};
const mapDispatch = (dispatch) => ({
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});
export default connect(mapState, mapDispatch)(BanersContainer);
