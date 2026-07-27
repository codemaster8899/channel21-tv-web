import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { EachProgramReducer } from "./reducers/EachProgramReducer";
import FacesReduser from "./reducers/FacesReducer";
import MainReducer from "./reducers/MainReducer";
import ProgramsReducer from "./reducers/ProgramsAndShows";
import ScheduleReducer from "./reducers/ScheduleReducer";
import SearchReducer from "./reducers/SearchReducer";
import SliderReducer from "./reducers/SliderReducer";
const rootReducer = combineReducers({
  programs: ProgramsReducer,
  main: MainReducer,
  eachProgram: EachProgramReducer,
  faces: FacesReduser,
  schedule: ScheduleReducer,
  slider: SliderReducer,
  search: SearchReducer,
});

export const store = configureStore({ reducer: rootReducer });
