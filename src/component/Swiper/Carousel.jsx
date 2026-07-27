import React, { useEffect, useState } from "react";
const Carousel = ({ interval = 5000, children }) => {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [click, setClick] = useState(false);
  const [mouseStart, setMouseStart] = useState();
  const [mouseCord, setMouseCord] = useState();
  const [step, setStep] = useState(0);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);

  const addIndex = (newPrevIndex, newIndex, newNextIndex) => {
    if (newNextIndex + 1 >= data.length) {
      newNextIndex = 0;
    } else {
      newNextIndex++;
    }
    if (newIndex + 1 >= data.length) {
      newIndex = 0;
    } else {
      newIndex++;
    }
    if (newPrevIndex + 1 >= data.length) {
      newPrevIndex = 0;
    } else {
      newPrevIndex++;
    }
    setPrevIndex(newPrevIndex);
    setIndex(newIndex);
    setNextIndex(newNextIndex);
    setStep(0);
    setClick(false);
  };
  const removeIndex = (newPrevIndex, newIndex, newNextIndex) => {
    if (newNextIndex - 1 < 0) {
      newNextIndex = data.length - 1;
    } else {
      newNextIndex--;
    }

    if (newPrevIndex - 1 < 0) {
      newPrevIndex = data.length - 1;
    } else {
      newPrevIndex--;
    }
    if (newIndex - 1 < 0) {
      newIndex = data.length - 1;
    } else {
      newIndex--;
    }
    setPrevIndex(newPrevIndex);
    setIndex(newIndex);
    setNextIndex(newNextIndex);
    setStep(0);
    setClick(false);
  };
  const changeHandeler = () => {
    let newIndex = index;
    let newNextIndex = nextIndex;
    let newPrevIndex = prevIndex;
    if (step > width / 4) {
      addIndex(newPrevIndex, newIndex, newNextIndex);
    }
    if (step < -width / 4) {
      removeIndex(newPrevIndex, newIndex, newNextIndex);
    }
  };
  useEffect(() => {
    if (children.length > 1) {
      setNextIndex(index + 1);
      setPrevIndex(index - 1);
    }

    if (children.length < 4) {
      setData([...children, ...children]);
    } else {
      setData([...children]);
    }
  }, [children]);
  useEffect(() => {
    let newWidth = width;
    function updateSize() {
      setWidth(window.innerWidth);
      newWidth = window.innerWidth;
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    let autoPlay = setInterval(() => {
      setStep(newWidth / 4 + 2);
    }, interval);

    return () => {
      window.removeEventListener("resize", updateSize);
      clearInterval(autoPlay);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    changeHandeler();
  }, [step]);

  return (
    <div className="w-full h-full overflow-hidden transit-3 flex relative text-3xl  mySwiper">
      {children.length > 1 ? (
        <div>
          {data.map((item, ind) => {
            return (
              <div
                key={ind}
                onTouchStart={(e) => {
                  setMouseStart(e.touches[0].clientX);
                  console.log(e, "touch start");
                  setClick(true);
                }}
                onTouchMove={(e) => {
                  if (click) {
                    console.log(e);
                    setMouseCord(e.touches[0].clientX);
                    setStep(mouseStart - e.touches[0].clientX);
                  }
                }}
                onTouchEnd={(e) => {
                  setStep(0);
                  setClick(false);
                }}
                onMouseDown={(mouseDownEvent) => {
                  setMouseStart(mouseDownEvent.clientX);
                  setClick(true);
                }}
                onMouseMove={(mouseMoveEvent) => {
                  if (click) {
                    setMouseCord(mouseMoveEvent.clientX);
                    setStep(mouseStart - mouseMoveEvent.clientX);
                  }
                }}
                onMouseUp={(e) => {
                  setStep(0);
                  setClick(false);
                }}
                onMouseLeave={(e) => {
                  setStep(0);
                  setClick(false);
                }}
                style={{
                  left:
                    ind === index
                      ? `${-step}px`
                      : ind === prevIndex
                      ? `calc(-100% - ${step}px)`
                      : ind === nextIndex
                      ? `calc(100% - ${step}px)`
                      : "",
                  display:
                    ind === index
                      ? "flex "
                      : ind === prevIndex
                      ? "flex "
                      : ind === nextIndex
                      ? "flex "
                      : "none",
                }}
                className={`w-full h-full transit-2 absolute`}
              >
                <div
                  draggable={false}
                  className="select-none w-full h-full	pointer-events-none"
                >
                  {" "}
                  {item}
                </div>
              </div>
            );
          })}
          <div className="flex">
            <ul className="absolute  flex gap-2 slick-dots">
              {children.map((element, i) => {
                return (
                  <li
                    key={i}
                    className={`w-3 h-3 rounded-full border border-white  ${
                      index % children.length === i
                        ? "bg-red-600 slick-active"
                        : "bg-white"
                    }`}
                  ></li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-full transit-2 absolute   text-center  items-center justify-center `}
        >
          <div
            draggable={false}
            className="select-none w-full h-full	pointer-events-none"
          >
            {" "}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
