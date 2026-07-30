import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { connect } from "react-redux";
import FBOut from "src/assets/icons/FBOut";
import InstOut from "src/assets/icons/InstOut";
import ShareIcon from "src/assets/icons/ShareIcon";
import { getTempHardcodedImage } from "src/utils/tempHardcodedImages";

const ModalFace = ({ currentFace, fullWidth, setCurrentFace, language }) => {
  return (
    <div>
      {currentFace && (
        <Dialog
          maxWidth="lg"
          className="customModalFace"
          fullScreen={fullWidth}
          open={!!currentFace}
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
          onClose={() => {
            setCurrentFace(false);
          }}
        >
          {Object.keys(currentFace).length > 0 && (
            <div className=" w-full md:w-[620px] p-8 relative rounded-3xl">
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => {
                  setCurrentFace(false);
                }}
              >
                <Close />
              </div>
              <div className="rounded-[10px] overflow-hidden w-full md:w-[250px] h-[240px] float-left mr-5 mb-2">
                <img
                  src={getTempHardcodedImage(0)} // TEMPORARY: hardcoded image — revert to currentFace.image
                  width="250px"
                  height="240px"
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-xl font-semibold  my-2">
                  {currentFace.firstName?.[language]}{" "}
                  {currentFace.lastName?.[language]}
                </p>
                <p className="text-xs font-medium text-gray-700 mb-5">
                  {currentFace.role && currentFace.role[language]}
                </p>
                <p className="text-sm">
                  {currentFace.description && currentFace.description[language]}
                </p>
              </div>
              <div className="flex gap-2  mt-4 justify-center">
                {currentFace.facebookLink && (
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
                    onClick={() => window.open(currentFace.facebookLink)}
                  >
                    <FBOut />
                  </p>
                )}
                {currentFace.instagramLink && (
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
                    onClick={() => window.open(currentFace.instagramLink)}
                  >
                    <InstOut />
                  </p>
                )}
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
                  <ShareIcon />
                </p> */}
              </div>
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
};
const mapState = (state) => ({
  language: state.main.language,
});

export default connect(mapState, null)(ModalFace);
