import { Email, LocalPhone, LocationOn } from "@mui/icons-material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import InputsArea from "src/component/ContactUs/InputsArea";
import { getContactUsTC, setLoaderAC } from "src/redux/reducers/MainReducer";

const ContactUs = ({ main, setLoader }) => {
  const { t } = useTranslation();
  useEffect(() => {
    setLoader(false);
  }, [main.contactUs]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="text-white bg-[#010006] bg-[url('src/assets/images/bg3.png')] relative min-h-[calc(100vh-48px)]  bg-no-repeat bg-cover pt-20 pb-[136px]">
      <div className="md:mx-auto md:w-11/12 xl:w-[1200px] mt-12 md:mt-20 xl:flex gap-24 ">
        <div className="mx-auto md:mx-0 w-11/12 md:w-full">
          <p className="borderRedGradient border-t-2 pt-1 w-fit text-base md:text-3xl font-medium mb-11">
            21 TV
          </p>
          <p className="text-sm">
            {main.contactUs?.description &&
              main.contactUs.description[main.language]}
          </p>
          <div className="flex flex-col  h-[118px] mt-20 text-sm">
            {main.contactUs?.phone && (
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-t w-4 h-4 from-red-700 to-red-500 flex justify-center items-center rounded-full">
                  <LocalPhone sx={{ fontSize: "12px" }} />
                </div>
                <p className="whitespace-nowrap">{main.contactUs.phone}</p>
              </div>
            )}
            {main.contactUs?.email && (
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-t w-4 h-4 from-red-700 to-red-500 flex justify-center items-center rounded-full">
                  <Email sx={{ fontSize: "12px" }} />
                </div>
                <p>{main.contactUs.email}</p>
              </div>
            )}
            {main.contactUs?.address && (
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-t w-4 h-4 from-red-700 to-red-500 flex justify-center items-center rounded-full">
                  <LocationOn sx={{ fontSize: "12px" }} />
                </div>
                <p className="w-4/5">{main.contactUs.address[main.language]}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto lg:w-5/6 xl:w-full">
          <InputsArea />
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="mx-auto    w-11/12 xl:w-[1200px] mt-8 pt-4 pb-8 text-white text-xs">
          <p>{`© ${new Date().getFullYear()} 21TV Armenia`}</p>
          <p className="mt-1">{t("copyrightArnology")}</p>
          <p className=" mt-1">{t("copyright")}</p>
        </div>
      </div>
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

export default connect(mapState, mapDispatch)(ContactUs);
