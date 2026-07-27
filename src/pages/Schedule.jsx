import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { setLoaderAC } from "src/redux/reducers/MainReducer";
import { getScheduleStateTC } from "src/redux/reducers/ScheduleReducer";
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Schedule = ({ getScheduleState, main, schedule, setLoader }) => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [selected, setSelected] = useState("0");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [onAir, setOnAir] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const checkDuration = (item) => {
    let duration =
      new Date(item.endDate).getTime() - new Date(item.startDate).getTime();
    let hour = duration / 3600000;
    let minute = (duration % 3600000) / 60000;
    let seconds = duration % 60000;
    if (hour >= 1) {
      return `${addZero(Math.floor(hour))}:${addZero(
        Math.floor(minute)
      )}:${addZero(seconds)}`;
    } else {
      return `${addZero(Math.floor(minute))}:${addZero(seconds)}`;
    }
  };
  useEffect(() => {
    setOnAir(
      schedule.filter((item) => {
        if (new Date(item.startDate).getHours() < 4) {
          return item.dates.includes(
            `${addZero(currentDay.getDate() - 1)}-${addZero(
              currentDay.getMonth() + 1
            )}-${currentDay.getFullYear()}`
          );
        } else {
          return item.dates.includes(
            `${addZero(currentDay.getDate())}-${addZero(
              currentDay.getMonth() + 1
            )}-${currentDay.getFullYear()}`
          );
        }
      })
    );
  }, [currentDay]);
  useEffect(() => {
    setLoader(false);
    setOnAir(
      schedule.filter((item) => {
        if (new Date(item.startDate).getHours() < 4) {
          return item.dates.includes(
            `${addZero(currentDay.getDate() - 1)}-${addZero(
              currentDay.getMonth() + 1
            )}-${currentDay.getFullYear()}`
          );
        } else {
          return item.dates.includes(
            `${addZero(currentDay.getDate())}-${addZero(
              currentDay.getMonth() + 1
            )}-${currentDay.getFullYear()}`
          );
        }
      })
    );
  }, [schedule]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    getScheduleState();

    let date;
    let newDays = [];
    for (let i = 0; i < 7; i++) {
      date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDate() === new Date().getDate()) {
        newDays.push({
          weekday: "Today",
          day: `${addZero(date.getDate())}.${addZero(date.getMonth())}`,
          date: date,
        });
      } else if (date.getDate() === new Date().getDate() + 1) {
        newDays.push({
          weekday: "Tomorrow",
          day: `${addZero(date.getDate())}.${addZero(date.getMonth())}`,
          date: date,
        });
      } else {
        newDays.push({
          weekday: weekday[date.getDay()],
          day: `${addZero(date.getDate())}.${addZero(date.getMonth())}`,
          date: date,
        });
      }
    }
    setDays(newDays);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="text-white bg-[#010006] bg-[url('src/assets/images/bg3.png')]  bg-no-repeat bg-cover pt-20 pb-24">
      <div className="mx-auto w-11/12 xl:w-[1200px] lg:flex md:mt-24 justify-center">
        <div>
          <div className="mx-auto w-[300px] sm:w-[600px] md:w-[700px] h-[168.75px] sm:h-[337px] md:h-[393.75px]">
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
              light={require("src/assets/images/Background4x.png")}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto md:w-11/12 xl:w-[1200px]">
        <div className="text-2xl font-semibold my-10 hidden md:block">
          <p> {t("schedule")}</p>
        </div>
        <div
          className="flex schedulDays h-[60px] pb-2 relative"
          style={{ overflowX: "scroll", overflowY: "hidden" }}
        >
          <div
            className={`absolute min-w-[120px] w-[14.2857143%] bottom-2 z-10 transit-2 border-b border-red-600`}
            style={{ left: `${selected}px` }}
          ></div>
          {days.map((item, index) => {
            return (
              <div
                className={`relative border-b border-white/30 w-[14.2857143%] flex justify-center min-w-[120px]`}
                key={index}
                onClick={(e) => {
                  setSelected(`${index * e.target.clientWidth}`);
                  setCurrentDay(item.date);
                }}
              >
                <p className="w-full text-center my-3 cursor-pointer">
                  {t(`calendar.short.${item.weekday}`)} {item.day}
                </p>
                {index !== days.length - 1 && (
                  <div className="absolute h-4 w-4 border-2 bg-red-600 border-[#34353C] rounded-full right-0 bottom-0 translate-x-1/2 translate-y-1/2 z-10"></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-14 rounded-[7px] overflow-hidden text-center text-sm md:text-lg">
          <div className="flex gap-[4px]">
            <div className="w-1/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818]">
              <p>{t("hours")}</p>
            </div>
            <div className="w-3/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818] ">
              <p>{t("title")}</p>
            </div>
            <div className="w-1/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818]">
              <p>{size.width > 520 ? t("length") : t("lengthShort")}</p>
            </div>
          </div>
          {onAir
            .sort((a, b) => {
              if (
                new Date(a.startDate).getTime() >
                new Date(b.startDate).getTime()
              ) {
                return 1;
              }
              if (
                new Date(a.startDate).getTime() <
                new Date(b.startDate).getTime()
              ) {
                return -1;
              }
              return 0;
            })
            .map((item, index) => {
              if (index % 2 === 1) {
                return (
                  <div className="flex gap-[4px]" key={index}>
                    <div className="w-1/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818]">
                      <p>
                        {addZero(new Date(item.startDate).getHours())}:
                        {addZero(new Date(item.startDate).getMinutes())}
                      </p>
                    </div>
                    <div className="w-3/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818] ">
                      {item.name && (
                        <p>
                          {size.width > 520
                            ? item.name[main.language]
                            : item.name[main.language]
                                .split("")
                                .map((i, ind) => {
                                  if (ind < 27) {
                                    return i;
                                  }
                                  if (ind === 27) {
                                    return "...";
                                  }
                                })
                                .join("")}
                        </p>
                      )}
                    </div>
                    <div className="w-1/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center bg-[#181818]">
                      <p>{checkDuration(item)}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex " key={index}>
                    <div className="w-1/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center">
                      <p>
                        {addZero(new Date(item.startDate).getHours())}:
                        {addZero(new Date(item.startDate).getMinutes())}
                      </p>
                    </div>
                    <div className="w-3/5 lg:w-1/3 flex min-h-[50px] md:h-[70px] items-center justify-center box-content border-x-[4px] border-[#181818] ">
                      {item.name && (
                        <p>
                          {size.width > 520
                            ? item.name[main.language]
                            : item.name[main.language]
                                .split("")
                                .map((i, ind) => {
                                  if (ind < 27) {
                                    return i;
                                  }
                                  if (ind === 27) {
                                    return "...";
                                  }
                                })
                                .join("")}
                        </p>
                      )}
                    </div>
                    <div className="w-1/5 lg:w-1/3  flex min-h-[50px] md:h-[70px] items-center justify-center ">
                      <p>{checkDuration(item)}</p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
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
    setLoader(data) {
      dispatch(setLoaderAC(data));
    },
  };
};
export default connect(mapState, mapDispatch)(Schedule);
