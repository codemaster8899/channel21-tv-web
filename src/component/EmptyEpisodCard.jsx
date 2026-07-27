import { Delete, EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { monthNames } from "src/utils/config";

const EmptyEpisodCard = ({ item, count }) => {
  const { t } = useTranslation();
  return (
    <div className="w-[285px] relative rounded-2xl overflow-hidden h-[180px] object-cover cursor-pointer">
      <div className="h-full w-full flex items-center justify-center absolute bg-darkBG/60 z-10 ">
        <p className="drop-shadow-3xl text-[55px]">+{count}</p>
      </div>
      <img src={item.image} alt="" className="blur" />
    </div>
  );
};
const mapState = (state) => ({
  language: state.main.language,
});
export default connect(mapState, null)(EmptyEpisodCard);
