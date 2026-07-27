import { connect } from "react-redux";
import ProgramAndShows from "src/component/ProgramAndShows";

const Programs = ({ programs }) => {
  return (
    <div>
      <ProgramAndShows state={programs} header={"programs"} />
    </div>
  );
};
const mapState = (state) => {
  return {
    programs: state.programs.programs,
  };
};

export default connect(mapState, null)(Programs);
