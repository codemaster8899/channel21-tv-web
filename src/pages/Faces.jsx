import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonNew from "src/component/ButtonNew";
import FacesCard from "src/component/Faces/FacesCard";
import ModalFace from "src/component/Faces/ModalFace";
import { connect } from "react-redux";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import {
  getFigmaFacesHero,
  getFigmaFacePortrait,
  withTempImageFallback,
  FIGMA_FACE_PORTRAITS,
} from "src/utils/tempHardcodedImages";

const Faces = ({ faces, setLoader }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isDown, setIsDown] = useState(false);
  const [pageSize, setPageSize] = useState(24);
  const [toShow, setToshow] = useState(pageSize);
  const resize = () => {
    setWidth(window.innerWidth);
  };
  const [currentFace, setCurrentFace] = useState(false);
  const { t } = useTranslation();
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
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [width]);
  useEffect(() => {
    setLoader(false);
  }, [faces.eachFace]);
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
      <div className="h-[250px] md:h-[600px] w-full ">
        <img
          src={getFigmaFacesHero()} // TEMPORARY: Figma faces hero — revert to faces.content.image
          alt="team"
          width="100%"
          height="600px"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="text-lg md:text-4xl lg:text-5xl font-semibold w-full text-center mt-12 md:mt-28">
        {t("header.faces")}
      </p>
      <div className="mx-auto w-11/12 xl:w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 py-12 md:py-28">
        {withTempImageFallback(faces.eachFace, FIGMA_FACE_PORTRAITS.length) // TEMPORARY: Figma faces fallback
          .map((item, index) => {
            if (index < toShow) {
              return (
                <FacesCard
                  index={index}
                  item={item}
                  key={index}
                  onClickProps={setCurrentFace}
                />
              );
            }
          })}
      </div>
      {/* <div className="w-full flex justify-center md:hidden pb-12">
        <ButtonNew>
          <div className="">{t("readMore")}</div>
        </ButtonNew>
      </div> */}
      <ModalFace
        currentFace={currentFace}
        fullWidth={width < 425}
        setCurrentFace={setCurrentFace}
      />
    </div>
  );
};
const mapState = (state) => ({
  faces: state.faces,
});
const mapDispatch = (dispatch) => ({
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});
export default connect(mapState, mapDispatch)(Faces);
