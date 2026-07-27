import { Email, LocalPhone, LocationOn } from "@mui/icons-material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getContactUsTC } from "src/redux/reducers/MainReducer";
import { HeaderConfigs } from "src/utils/config";
const FooterContainer = ({ main, programs, getContactUs }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#17171B] px-2 py-8">
      <div className="mx-auto  w-11/12 xl:w-[1200px] md:flex justify-between text-sm text-white/70 leading-6">
        <div className="h-fit md:w-1/3">
          <p className="font-semibold mb-6">{t("contactUs")}</p>
          <div className="flex flex-col justify-between h-full ">
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
                <p> {main.contactUs.email}</p>
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
        <div className="md:w-1/5">
          <p className="font-semibold mt-8 md:mt-0 mb-6">{t("basic")}</p>
          <div className="columns-2 md:columns-1">
            {HeaderConfigs.map((item, index) => {
              return (
                <Link key={index} to={item.navigation}>
                  <p>{t(`header.${item.title}`)}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="md:w-2/5">
          <p className="font-semibold mb-6 mt-8 md:mt-0">
            {t("header.programs")}
          </p>
          <div className="columns-2">
            {programs.map((item, index) => {
              return (
                <Link key={index} to={`/tab_${item._id}`}>
                  <p>{item.name[main.language]}</p>{" "}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-white/30 mx-auto  w-11/12 xl:w-[1200px] mt-8 pt-4 pb-8 text-white text-xs">
        <p>© {new Date().getFullYear()} 21TV Armenia</p>
        <p className="mt-1">{t("copyrightArnology")}</p>
        <p className="w-11/12 md:w-4/5 mt-1">{t("copyright")}</p>
      </div>
    </div>
  );
};
const mapState = (state) => ({
  main: state.main,
  programs: [...state.programs.programs, ...state.programs.shows],
});
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(FooterContainer);
