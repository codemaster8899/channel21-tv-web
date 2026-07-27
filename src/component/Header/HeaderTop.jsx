import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import CalendarIcon from "src/assets/icons/CalendarIcon";
import FacebookIcon from "src/assets/icons/FacebookIcon";
import InstagramIcon from "src/assets/icons/InstagramIcon";
import TwiterIcon from "src/assets/icons/TwiterIcon";
import YoutubeIcon from "src/assets/icons/YoutubeIcon";
import { setTimeAC } from "src/redux/reducers/MainReducer";
import { monthNames } from "src/utils/config";
let options = { weekday: "long" };

const HeaderTop = ({ setTimeToState, main }) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const { t } = useTranslation();

  const [weekday, setWeekday] = useState(
    new Intl.DateTimeFormat("en-US", options).format(new Date().getDay())
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
  const [day, setDay] = useState(new Date().getDate());
  const [time, setTime] = useState(
    `${addZero(new Date().getHours())}:${addZero(
      new Date().getMinutes()
    )}:${addZero(new Date().getSeconds())}`
  );
  const setDate = () => {
    setWeekday(
      new Intl.DateTimeFormat("en-US", options).format(new Date().getDay())
    );
    setYear(new Date().getFullYear());
    setMonth(monthNames[new Date().getMonth()]);
    setDay(new Date().getDate());
    setTime(
      `${addZero(new Date().getHours())}:${addZero(
        new Date().getMinutes()
      )}:${addZero(new Date().getSeconds())}`
    );
    setTimeToState(
      `${
        monthNames[new Date().getMonth()]
      } ${new Date().getDate()} ${new Date().getFullYear()} ${addZero(
        new Date().getHours()
      )}:${addZero(new Date().getMinutes())}:${addZero(
        new Date().getSeconds()
      )}`
    );
  };
  useEffect(() => {
    let interval = setInterval(setDate, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" h-12 flex items-center justify-between mx-auto w-11/12 xl:w-[1200px]">
      <div className="flex items-center gap-3">
        <div className="text-red-600">
          <CalendarIcon />
        </div>
        <p className="text-xs md:text-sm">
          {t(`calendar.${weekday}`)} : {t(`calendar.${month}`)} {day}, {year}
        </p>
      </div>
      <div className="flex items-center gap-8">
        <p className="text-xs md:text-sm">{time}</p>
        <div className="hidden md:flex gap-6">
          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(main.socialMedia.facebookLink);
            }}
          >
            <FacebookIcon />
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(main.socialMedia.twitterLink);
            }}
          >
            <TwiterIcon />
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(main.socialMedia.instagramLink);
            }}
          >
            <InstagramIcon />
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              window.open(main.socialMedia.youtubeLink);
            }}
          >
            <YoutubeIcon />
          </p>
        </div>
      </div>
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
    setTimeToState(data) {
      dispatch(setTimeAC(data));
    },
  };
};
export default connect(mapState, mapDispatch)(HeaderTop);
