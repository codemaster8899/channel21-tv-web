import { useTranslation } from "react-i18next";
import { monthNames } from "src/utils/config";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { ClickAwayListener, Dialog } from "@mui/material";
import playIcon from "src/assets/images/play.png";
import { useState } from "react";

const EpisodCard = ({ item, language }) => {
  const { t } = useTranslation();
  const [player, setPlayer] = useState({
    open: false,
    image: item.image,
    link: item.link,
  });
  return (
    <div
      className="w-[285px] relative rounded-[15px] overflow-hidden h-[180px] object-cover cursor-pointer"
      onClick={() => setPlayer({ ...player, open: true })}
    >
      <img
        src={item.image}
        width="285px"
        height="180px"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="w-full h-[51px] bg-black/05 backdrop-blur-lg absolute bottom-0 rounded-2xl text-white flex items-center">
        <div className="w-1/6 flex justify-center">
          <img
            src={require("src/assets/images/play.png")}
            alt=""
            width="25px"
          />{" "}
        </div>

        <div className="w-3/6 border-r borderWhiteGradient mr-2 p-1">
          <p className="text-xs font-semibold whitespace-nowrap">
            {item.title &&
              item.title[language]
                .split("")
                .map((i, ind) => {
                  if (ind < 14) {
                    return i;
                  }
                  if (ind === 14) {
                    return "...";
                  }
                })
                .join("")}
          </p>
          <p className="text-xs font-semibold text-white/60">
            {t(`calendar.${monthNames[new Date(item.date).getMonth()]}`)}{" "}
            {new Date(item.date).getDate()}{" "}
          </p>
        </div>
        <div>
          <div className="w-2/6 p-1">
            <p
              className="w-[75px] h-[25px] rounded-full text-center"
              style={{
                color: "black",
                background: "white",
                mixBlendMode: "screen",
              }}
            >
              {item.duration}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="absolute w-full h-[100vh] bg-darkBG/60">
        {/* <Dialog
          maxWidth="xl"
          open={player.open}
          onClose={() => {
            setPlayer({ ...player, open: false });
          }}
          className="bg-transparent"
          sx={{ background: "transparent" }}
        > */}
      {/* <ClickAwayListener
          onClickAway={() => setPlayer({ ...player, open: false })}
        >
          <div className="w-full overflow-hidden rounded-3xl">
            <ReactPlayer
              width="60vw"
              height="60vh"
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
        </ClickAwayListener> */}
      {/* </Dialog> */}
      {/* </div> */}
    </div>
  );
};

const mapState = (state) => ({
  language: state.main.language,
});
export default connect(mapState, null)(EpisodCard);
