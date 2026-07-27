import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ButtonNew from "src/component/ButtonNew";
import { connect } from "react-redux";
import { getContactUsTC } from "src/redux/reducers/MainReducer";
import { useNavigate } from "react-router-dom";

const FollowButton = styled(Button)(() => ({
  borderRadius: "60px",
  background: "#ffffff",
  boxShadow: "0px 1px 10px #E5E5E5",
  "&:hover": {
    background: "#eeeeee  ",
  },
}));

const ConnectUs = ({ getContactUs, main }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mediaLink, setMediaLink] = useState({
    title: {
      am: "",
      ru: "",
      en: "",
    },
    description: {
      am: "",
      ru: "",
      en: "",
    },
    _id: "",
    facebookLink: "",
    youtubeLink: "",
    instagramLink: "",
    twitterLink: "",
    __v: 0,
  });
  const socialMedias = [
    {
      img: require("src/assets/icons/Fb.png"),
      subscribers: "100K",
      style: { color: "#197BF3" },
      name: "facebookLink",
    },
    {
      img: require("src/assets/icons/inst.png"),
      subscribers: "100K",
      name: "instagramLink",
      style: {
        background:
          "linear-gradient(180deg, #5B4FE9 0%, #8F39CE 20.31%, #C93F9A 39.06%, #E54D8C 63.02%, #FCBB45 81.25%, #FBE18A 100%)",
        WebkitBackgroundClip: " text",
        backgroundClip: " text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
      },
    },
    {
      img: require("src/assets/icons/Ytb.png"),
      subscribers: "100K",
      style: { color: "#FF0000" },
      name: "youtubeLink",
    },
    {
      img: require("src/assets/icons/twitter.png"),
      subscribers: "100K",
      style: { color: "#55ACEE" },
      name: "twitterLink",
    },
  ];
  useEffect(() => {
    getContactUs();
  }, []);
  useEffect(() => {
    if (!!main.socialMedia) {
      setMediaLink({
        ...main.socialMedia,
        facebookLink: !!main.socialMedia.facebookLink
          ? main.socialMedia.facebookLink
          : "",
        youtubeLink: !!main.socialMedia.youtubeLink
          ? main.socialMedia.youtubeLink
          : "",
        instagramLink: !!main.socialMedia.instagramLink
          ? main.socialMedia.instagramLink
          : "",
        twitterLink: !!main.socialMedia.twitterLink
          ? main.socialMedia.twitterLink
          : "",
      });
    }
  }, [main.socialMedia]);
  return (
    <div className="bg-[url('src/assets/images/TV21.png')] pt-28 bg-no-repeat bg-right-top mt-5">
      <div className="mx-auto  w-11/12 xl:w-[1200px] xl:flex">
        <div className=" !w-1/3 whitespace-nowrap">
          <p className="borderRedGradient border-t-2 pt-1 ml-2 w-fit text-xl font-medium">
            {" "}
            {t("header.aboutUs")}
          </p>
        </div>
        <div className="align-top xl:w-2/3 text-sm text-gray-700 dark:text-darkText/80 ">
          <p className="w-2/3 text-3xl font-medium pb-5 pt-3 xl:pt-1">21 TV</p>
          <p className="xl:columns-2	gap-10">
            {main.contactUs.description &&
              main.contactUs.description[main.language]}
          </p>
          <div className="text-center flex justify-center md:justify-end py-5">
            <div onClick={() => navigate("/contact_us")}>
              <ButtonNew>{t("contactUs")}</ButtonNew>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 transit bg-[#E5E5E5] dark:bg-[#333333]">
        <div className="mx-auto w-full md:w-11/12 xl:w-[1200px] xl:flex justify-between pt-1 ">
          <div className="w-11/12 sm:w-5/6 md:w-[540px] h-[319px] bg-black/10 rounded-[10px] border border-white/50 -mt-12 backdrop-blur flex flex-col justify-center px-10">
            {mediaLink.title && (
              <p className="text-white text-xl md:text-3xl	font-semibold mb-3 sm:mb-7">
                {mediaLink.title[main.language]}
              </p>
            )}
            {mediaLink.description && (
              <p className="text-white text-sm">
                {mediaLink.description[main.language]}
              </p>
            )}
          </div>
          <div className="ml-auto mr-0 grid md:flex justify-between xl:grid grid-cols-2 xl:gap-x-24 gap-y-11 py-9">
            {socialMedias.map((item, index) => {
              return (
                <div
                  className="w-[135px] md:w-[165px] mx-auto xl:w-[181px] h-[120px] rounded-[15px] bg-white text-center p-5 flex flex-col items-center mt-5"
                  style={{ boxShadow: "0px 1px 10px #E5E5E5" }}
                  key={index}
                >
                  <img src={item.img} alt="" className="-mt-10 mb-3" />
                  <p className="text-black mb-3 font-semibold">
                    {item.subscribers}
                  </p>
                  <FollowButton
                    onClick={() => {
                      window.open(mediaLink[item.name]);
                    }}
                  >
                    <div
                      className={`w-[102px] md:w-32 text-center text-sm  capitalize`}
                    >
                      <p style={item.style}> {t("follow")}</p>
                    </div>
                  </FollowButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  main: state.main,
});

const mapDispatch = (dispatch) => ({
  getContactUs() {
    dispatch(getContactUsTC());
  },
});

export default connect(mapState, mapDispatch)(ConnectUs);
