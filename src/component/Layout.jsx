import { ClickAwayListener, Dialog } from "@mui/material";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import FooterContainer from "./Footer/FooterContainer";
import HeaderContainer from "./Header/HeaderContainer";
import SwiperContainer from "./Swiper/SwiperContainer";
import playIcon from "src/assets/images/play.png";

const Layout = ({ children }) => {
  const link = useLocation();
  const [player, setPlayer] = useState({ open: false, image: "", link: "" });

  return (
    <div className="layout min-h-screen flex flex-col">
      <div
        className={`${
          link.pathname === "/faces" ||
          link.pathname === "/contact_us" ||
          link.pathname === "/tab_:id" ||
          link.pathname === "/schedule" ||
          link.pathname === "/films" ||
          link.pathname === "/shows" ||
          link.pathname === "/programs"
            ? "hidden"
            : ""
        }`}
      >
        {" "}
        {
          link.pathname === '/' ?
          <SwiperContainer player={player} setPlayer={setPlayer} />:
          <div></div>
        }
        
      </div>

      <div className="flex-1">
        {children}
      </div>
      <div className={`${link.pathname === "/contact_us" ? "hidden" : ""}`}>
        <FooterContainer />
      </div>
    </div>
  );
};

export default Layout;
