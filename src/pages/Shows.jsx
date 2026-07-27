import { useEffect } from "react";
import { connect } from "react-redux";
import ProgramAndShows from "src/component/ProgramAndShows";
const Shows = ({ programs }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <ProgramAndShows state={programs.shows} header={"shows"} />
    </div>
  );
};

const mapState = (state) => {
  return {
    programs: state.programs,
  };
};

export default connect(mapState, null)(Shows);
