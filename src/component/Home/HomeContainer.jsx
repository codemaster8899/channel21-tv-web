import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { changeDarkAC } from "src/redux/reducers/MainReducer";
import BanersContainer from "./BanersContainer";
import ConnectUs from "./ConnectUsContainer";
import FacesContainer from "./FacesContainer";

const HomeContainer = ({ main }) => {
  const [img, setImg] = useState(require("src/assets/images/Background4x.png"));
  useEffect(() => {
    if (main.dark) {
      setImg(require("src/assets/images/Background4d.png"));
    } else setImg(require("src/assets/images/Background4x.png"));
  }, [main.dark]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="dark:text-darkText">
      <div className="w-full pt-10 md:pt-20 flex justify-center ">
        <div className="rounded-2xl w-[280px] md:w-[600px] lg:w-[930px] h-[157.5px] md:h-[337.5px] lg:h-[523.125px] overflow-hidden">
          <img src="" alt="" />
          <ReactPlayer
            playing={true}
            url={main.liveLink}
            width="100%"
            height="100%"
            controls={true}
            playIcon={
              <button>
                <img src={require("src/assets/images/play.png")} />
              </button>
            }
            light={img}
          />
        </div>
      </div>
      <BanersContainer />
      <FacesContainer />
      <ConnectUs />
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
  };
};
export default connect(mapState, mapDispatch)(HomeContainer);
