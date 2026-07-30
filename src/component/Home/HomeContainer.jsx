import { useEffect } from "react";
import { connect } from "react-redux";
import { changeDarkAC } from "src/redux/reducers/MainReducer";
import ProgramAndShows from "src/component/ProgramAndShows";

const HomeContainer = ({ programs }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="dark:text-darkText">
      <ProgramAndShows
        state={programs.programs}
        header="programs"
        showHero={false}
      />
    </div>
  );
};

const mapState = (state) => ({
  programs: state.programs,
});

const mapDispatch = (dispatch) => ({
  setDark() {
    dispatch(changeDarkAC());
  },
});

export default connect(mapState, mapDispatch)(HomeContainer);
