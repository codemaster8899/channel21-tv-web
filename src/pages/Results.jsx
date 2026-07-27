import { useEffect } from "react";
import { connect } from "react-redux";
import ResutContainer from "src/component/ResutContainer";
import { getResultTC, setSearchItemAC } from "src/redux/reducers/SearchReducer";

const Results = ({ programs, search, setSearchItem, getResult }) => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return () => {
      setSearchItem("");
    };
  }, []);
  useEffect(() => {
  }, [search.result]);
  return (
    <div>
      {search.result && (
        // search.result.map()
        <ResutContainer state={search.result} header={"results"} />
      )}
    </div>
  );
};
const mapState = (state) => {
  return {
    programs: state.programs.programs,
    search: state.search,
  };
};
const mapDispatch = (dispatch) => ({
  setSearchItem(data) {
    dispatch(setSearchItemAC(data));
  },
  getResult(data) {
    dispatch(getResultTC(data));
  },
});

export default connect(mapState, mapDispatch)(Results);
