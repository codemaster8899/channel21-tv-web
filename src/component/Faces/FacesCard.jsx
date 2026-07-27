import FBOut from "src/assets/icons/FBOut";
import InstOut from "src/assets/icons/InstOut";
import { Share } from "@mui/icons-material";
import { connect } from "react-redux";

const FacesCard = ({ index, item, onClickProps, language }) => {
  return (
    <div className={`w-full flex justify-center `}>
      <div className="w-full">
        <div className="w-full h-[230px] md:h-[250px] lg:h-[270px] rounded-[10px] overflow-hidden cursor-pointer">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
            onClick={() => onClickProps(item)}
            onMouseDownCapture={(e) => {
              e.target.style.cursor = "pointer";
            }}
            onMouseUpCapture={(e) => {
              e.target.style.cursor = "inherit";
            }}
            onMouseLeave={(e) => {
              e.target.style.cursor = "inherit";
            }}
          />
        </div>
        <div className="w-full flex justify-between mt-2 mb-1 items-center">
          <p
            className="font-semibold cursor-pointer"
            onClick={() => onClickProps(item)}
          >
            {item.firstName[language]}{" "}
            {item.lastName && item.lastName[language]}
          </p>
          {/* <p
            className="cursor-pointer"
            onMouseDownCapture={(e) => {
              e.target.style.color = "red";
            }}
            onMouseUpCapture={(e) => {
              e.target.style.color = "inherit";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "inherit";
            }}
          >
            <Share className="cursor-pointer" />
          </p> */}
        </div>
        <p
          className="leading-4 text-xs cursor-pointer"
          onClick={() => onClickProps(item)}
        >
          {" "}
          {item.description &&
            item.description[language]
              .split("")
              .map((i, ind) => {
                if (ind < 37) {
                  return i;
                }
                if (ind === 37) {
                  return "...";
                }
              })
              .join("")}{" "}
        </p>
        <div className="flex gap-2 my-2">
          {item.facebookLink && (
            <p
              className="cursor-pointer"
              onMouseDownCapture={(e) => {
                e.target.style.color = "red";
              }}
              onMouseUpCapture={(e) => {
                e.target.style.color = "inherit";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "inherit";
              }}
              onClick={() => window.open(item.facebookLink)}
            >
              <FBOut />
            </p>
          )}
          {item.instagramLink && (
            <p
              className="cursor-pointer"
              onMouseDownCapture={(e) => {
                e.target.style.color = "red";
              }}
              onMouseUpCapture={(e) => {
                e.target.style.color = "inherit";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "inherit";
              }}
              onClick={() => window.open(item.instagramLink)}
            >
              <InstOut />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => ({
  language: state.main.language,
});

export default connect(mapState, null)(FacesCard);
