//variables

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "src/api/api";

const GET_SCHEDULE_STATE = "GET_SCHEDULE_STATE";
const ADD_SCHEDULE = "ADD_SCHEDULE";

//state

const initialState = [];

//reducer

const ScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_STATE:
      return [...action.data];
    case ADD_SCHEDULE:
      return [...state, action.data];
    default:
      return state;
  }
};
export default ScheduleReducer;

//action creators

export const getScheduleStateAC = (data) => ({
  type: GET_SCHEDULE_STATE,
  data,
});
export const addScheduleAC = (data) => ({ type: ADD_SCHEDULE, data });

//thunk creators

export const getScheduleStateTC = () => (dispatch) => {
  getRequest("get-schedules").then((res) =>
    dispatch(getScheduleStateAC(res.data))
  );
};
export const addScheduleTC = (data) => (dispatch) => {
  postRequest("add-schedule", data).then((res) => {
    dispatch(addScheduleAC(res.data));
  });
};
export const editScheduleTC = (data, id) => (dispath) => {
  putRequest(`update-schedule/${id}`, data).then((res) => {});
};
export const deleteScheduleTC = (id) => (dispatch) => {
  
  deleteRequest(`delete-schedule/${id}`);
};
