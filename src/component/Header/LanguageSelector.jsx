import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { changeLanguageAC } from "src/redux/reducers/MainReducer";

const LanguageSelector = ({ changeLanguage, main }) => {
  const [openLanguageBar, setOpenLanguageBar] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState();
  const { t, i18n } = useTranslation();

  const languages = [
    { title: "Հայ", code: "am" },
    { title: "Eng", code: "en" },
    { title: "Рус", code: "ru" },
  ];
  const changeLanguageHandeler = (item) => {
    setOpenLanguageBar(false);
    changeLanguage(item.code);
  };
  useEffect(() => {
    setCurrentLanguage(
      languages.filter((item) => item.code === main.language)[0].title
    );
    i18n.changeLanguage(main.language);
  }, [main.language]);

  return (
    <div className="relative w-14 text-inherit">
      <p
        onClick={() => setOpenLanguageBar(!openLanguageBar)}
        className="w-full flex justify-between cursor-pointer"
      >
        {currentLanguage}
        {openLanguageBar ? <ArrowDropUp /> : <ArrowDropDown />}
      </p>
      <Collapse
        in={openLanguageBar}
        timeout="auto"
        unmountOnExit
        className="absolute bg-white w-full text-gray-700 rounded shadow text-center"
      >
        <List className="!py-0">
          {languages
            .filter((item) => item.title !== currentLanguage)
            .map((item, index) => {
              return (
                <ListItem className="!p-0 !text-center" key={`key_${index}`}>
                  <ListItemText
                    onClick={() => {
                      changeLanguageHandeler(item);
                    }}
                    className="cursor-pointer hover:bg-lightBG"
                  >
                    {item.title}
                  </ListItemText>
                  <Divider />
                </ListItem>
              );
            })}
        </List>
      </Collapse>
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
    changeLanguage(data) {
      dispatch(changeLanguageAC(data));
    },
  };
};
export default connect(mapState, mapDispatch)(LanguageSelector);
