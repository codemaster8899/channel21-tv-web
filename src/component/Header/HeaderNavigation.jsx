import { HeaderConfigs } from "src/utils/config";
import { v4 as uuid_v4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
const HeaderNavigation = ({
  vertical,
  active,
  setActive,
  main,
  setLoader,
  setPlayer,
}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const link = useLocation();
  return (
    <div className="headerNavigation w-full mt-2">
      <ul
        className={`
          flex gap-3 font-semibold w-full relative  ${
            vertical ? "flex-col text-black dark:text-darkText" : "text-white"
          }`}
      >
        {!vertical && (
          <li
            className={`absolute -bottom-3 transit ${
              isNaN(ref.current?.offsetLeft + ref.current?.clientWidth / 2)
                ? "opacity-0"
                : ""
            }
             
            `}
            style={{
              position: "absolute",
              left: `${
                !isNaN(ref.current?.offsetLeft + ref.current?.clientWidth / 2)
                  ? ref.current?.offsetLeft + ref.current?.clientWidth / 2
                  : 0
              }px`,
            }}
          >
            <p className="w-2 h-2 rounded-full bg-red-600"></p>
          </li>
        )}
        {HeaderConfigs.map(({ title, navigation }) => {
          if (link.pathname === navigation) {
          }
          return (
            <li
              key={uuid_v4()}
              className={` cursor-pointer flex justify-between items-center ${
                title === "live" ? "text-red-600" : ""
              } ${vertical ? "!pb-2 pt-0 px-4 w-full" : "w-fit"} ${
                vertical && title != "live"
                  ? "border-b border-[#c3c3c3] dark:border-[#333333]"
                  : ""
              } ${
                vertical && link.pathname === navigation ? "border-red-600" : ""
              }`}
              ref={
                active === title || link.pathname === navigation ? ref : null
              }
              onClick={(e) => {
                if (title === "live") {
                  setPlayer(true);
                } else {
                  setActive(title);
                  navigate(navigation);
                }
              }}
            >
              <p>{t(`header.${title}`)}</p>
              {vertical && link.pathname === navigation ? (
                <span className="w-3 h-3 rounded-full block bg-red-600"></span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const mapState = (state) => ({
  main: state.main,
});
const mapDispatch = (dispatch) => ({
  setLoader(data) {
    dispatch(setLoaderAC(data));
  },
});
export default connect(mapState, mapDispatch)(HeaderNavigation);
