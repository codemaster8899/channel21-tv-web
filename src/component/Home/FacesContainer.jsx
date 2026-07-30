import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  getEachfacesStateAC,
  hoverFaceCardAC,
} from "src/redux/reducers/FacesReducer";
import {
  getTempHardcodedImage,
  withTempImageFallback,
} from "src/utils/tempHardcodedImages";

const FacesContainer = ({ facesProps, language }) => {
  const [faces, setFaces] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    className: "  ",
    swipeToSlide: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const source = withTempImageFallback(facesProps, 8); // TEMPORARY: fallback when API returns empty
    if (source.length < 9) {
      setFaces([...source, ...source, ...source, ...source, ...source]);
    } else setFaces([...source]);
  }, [facesProps]);

  return (
    <div>
      <div className="w-full">
        <div className="mx-auto  w-11/12 xl:w-[1200px] flex justify-center gap-5 my-12 xl:my-28   box-border h-11 relative ">
          <p
            className="h-full cursor-pointer box-content relative z-10 px-12
                border-b-2 borderRedGradient"
            onClick={() => {
              navigate("faces");
            }}
          >
            {t("header.faces")}
          </p>
        </div>
      </div>

      {!!faces ? (
        <Slider
          {...settings}
          afterChange={(e) => {
            setFaces(
              faces.map((item, index) => {
                if (index === e) {
                  return { ...item, hover: true };
                } else {
                  return { ...item, hover: false };
                }
              }),
            );
          }}
        >
          {faces.map((item, index) => {
            return (
              <div
                key={`key_${index}`}
                className="h-[250px] lg:h-[300px] xl:h-[350px] w-[150px] lg:w-[250px] xl:w-[320px]"
              >
                <div className="relative w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={getTempHardcodedImage(index)} // TEMPORARY: hardcoded image — revert to item.image
                    width="320px"
                    alt=""
                    onMouseEnter={() => {
                      let newFaces = faces;
                      newFaces[index].hover = true;
                      setFaces([...newFaces]);
                    }}
                    onMouseOut={() => {
                      let newFaces = faces;
                      newFaces[index].hover = false;
                      setFaces([...newFaces]);
                    }}
                  />
                  <div
                    className={`absolute bottom-0 transit left-0 right-0  bg-gradient-to-t from-black to-transparent px-5 ${
                      item.hover ? "h-full opacity-100" : "opacity-0 h-0"
                    }`}
                    onMouseEnter={() => {
                      let newFaces = faces;
                      newFaces[index].hover = true;
                      setFaces([...newFaces]);
                    }}
                    onMouseOut={() => {
                      let newFaces = faces;
                      newFaces[index].hover = false;
                      setFaces([...newFaces]);
                    }}
                  >
                    <div className="absolute bottom-8 ">
                      <p className="text-white text-sm font-semibold">
                        {item.firstName && item.firstName[language]}{" "}
                        {item.lastName && item.lastName[language]}
                      </p>
                      <p className="text-white text-xs">
                        {item.role && item.role[language]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        ""
      )}
    </div>
  );
};
const mapState = (state) => ({
  facesProps: state.faces.eachFace,
  language: state.main.language,
});
const mapDispach = (dispatch) => ({
  hoverFaceCard(id, status) {
    dispatch(hoverFaceCardAC(id, status));
  },
});

export default connect(mapState, mapDispach)(FacesContainer);
