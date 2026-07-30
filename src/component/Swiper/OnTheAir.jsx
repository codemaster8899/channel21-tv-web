import { FC, useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";
import { monthNames } from "src/utils/config";
import { connect } from "react-redux";
import { getScheduleStateTC } from "src/redux/reducers/ScheduleReducer";
import { getTempHardcodedImage } from "src/utils/tempHardcodedImages";

const OnTheAir = ({ main, schedule, getScheduleState }) => {
  const myRef = useRef(undefined);
  const contRef = useRef(undefined);
  const [onAir, setOnAir] = useState([]);
  const { t } = useTranslation();
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const checkTime = (
    prevDate = `${
      monthNames[new Date().getMonth()]
    } ${new Date().getDate()}, ${new Date().getFullYear()}, 00:00:00`,
    nextDate = `${
      monthNames[new Date().getMonth()]
    } ${new Date().getDate()}, ${new Date().getFullYear()}, 23:59:59`,
  ) => {
    if (
      new Date(main.time).getTime() >= new Date(prevDate).getTime() &&
      new Date(main.time).getTime() < new Date(nextDate).getTime()
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    getScheduleState();
  }, []);
  useEffect(() => {
    if (contRef.current !== undefined && myRef.current !== undefined) {
      contRef.current.scrollTop =
        myRef.current.offsetTop - contRef.current.clientHeight / 2;
    }
  }, [myRef.current]);
  useEffect(() => {
    setOnAir(
      schedule.filter((item) => {
        if (new Date(item.startDate).getHours() < 4) {
          return item.dates.includes(
            `${addZero(
              new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
            )}-${addZero(
              new Date().getMonth() + 1,
            )}-${new Date().getFullYear()}`,
          );
        } else {
          return item.dates.includes(
            `${addZero(new Date().getDate())}-${addZero(
              new Date().getMonth() + 1,
            )}-${new Date().getFullYear()}`,
          );
        }
      }),
    );
  }, [schedule]);
  return (
    <div className="w-full h-full relative  bg-black/40 z-10 rounded-r-2xl ">
      <p className="m-2 lg:m-8 text-lg text-white font-semibold pt-8">
        {t("swiper.onAir")}
      </p>

      <div
        className="m-2 lg:m-8 mr-2 pr-6 customScroll overflow-y-scroll h-[calc(100%-110px)] scroll-smooth box-border"
        ref={contRef}
      >
        {onAir
          .sort((a, b) => {
            if (
              new Date(a.startDate).getTime() > new Date(b.startDate).getTime()
            ) {
              return 1;
            }
            if (
              new Date(a.startDate).getTime() < new Date(b.startDate).getTime()
            ) {
              return -1;
            }
            return 0;
          })
          .map((item, index) => {
            return (
              <div
                key={`key_${index}`}
                className={`h-32 flex items-center w-full p-2 hover:bg-white/20 rounded-3xl  ${
                  checkTime(
                    item.startDate,
                    onAir[index + 1 > onAir.length - 1 ? 0 : index + 1]
                      .startDate,
                  )
                    ? "bg-white/20 hover:bg-white/40"
                    : ""
                }`}
                ref={
                  checkTime(
                    item.startDate,
                    onAir[index + 1 > onAir.length - 1 ? 0 : index + 1]
                      .startDate,
                  )
                    ? myRef
                    : null
                }
              >
                <div className="flex gap-2 items-start">
                  <div className="w-[135px] h-[95px] lg:w-[155px] ml-3 rounded-lg overflow-hidden">
                    <div className="h-full w-full ">
                      <img
                        src={getTempHardcodedImage(index)} // TEMPORARY: hardcoded image — revert to item.image
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-[calc(100%-135px)] lg:w-[calc(100%-155px)]]">
                    <div className="w-full">
                      <p className="text-white w-full text-sm font-semibold whitespace-normal mb-1">
                        {item.name[main.language]}
                      </p>
                      <p className="text-white/70 text-xs mb-1">{`${t(
                        `calendar.${
                          monthNames[new Date(item.startDate).getMonth()]
                        }`,
                      )} ${
                        new Date(item.startDate).getTime() >
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate(),
                          23,
                          59,
                          59,
                        ).getTime()
                          ? addZero(
                              new Date(
                                new Date().setDate(new Date().getDate() + 1),
                              ).getDate(),
                            )
                          : addZero(new Date().getDate())
                      } ${addZero(
                        new Date(item.startDate).getHours(),
                      )}:${addZero(new Date(item.startDate).getMinutes())}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    main: state.main,
    schedule: state.schedule,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getScheduleState() {
      dispatch(getScheduleStateTC());
    },
  };
};
export default connect(mapState, mapDispatch)(OnTheAir);
