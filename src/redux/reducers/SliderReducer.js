import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "src/api/api";

const GET_SLIDER_STATE = "GET_SLIDER_STATE";
const HOVER_SLIDE = "HOVER_SLIDE";
const ADD_SLIDE = "ADD_SLIDE";
const EDIT_SLIDE = "EDIT_SLIDE";
const DELETE_SLIDE = "DELETE_SLIDE";
const CHANGE_SLIDE_STATE = "CHANGE_SLIDE_STATE";

//

const initialState = [];

//

const SliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SLIDE_STATE:
      return [...action.data];
    case GET_SLIDER_STATE:
      return action.data.map((item) => ({ ...item, hover: false }));
    case HOVER_SLIDE:
      let newStateHover = state.map((item) => {
        if (item._id === action.id) {
          return { ...item, hover: action.status };
        } else {
          return item;
        }
      });
      return [...newStateHover];

    case ADD_SLIDE:
      return [...state, action.data];
    case EDIT_SLIDE:
      let newEditState = state.map((item) => {
        if (item._id === action.id) {
          return action.data;
        } else {
          return item;
        }
      });

      return [...newEditState];

    case DELETE_SLIDE:
      let newDeleteState = state.filter((item) => item._id !== action.id);
      return newDeleteState;
    default:
      return state;
  }
};
export default SliderReducer;

//

export const getSliderStateAC = (data) => ({ type: GET_SLIDER_STATE, data });
export const hoverSlideAC = (id, status) => ({
  type: HOVER_SLIDE,
  id,
  status,
});
export const addSlideAC = (data) => ({ type: ADD_SLIDE, data });
export const editSlideAC = (data, id) => ({ type: EDIT_SLIDE, data, id });
export const deleteSlideAC = (id) => ({ type: DELETE_SLIDE, id });
export const changeSlideStateAC = (data) => ({
  type: CHANGE_SLIDE_STATE,
  data,
});

//

export const getSliderStateTC = () => (dispatch) => {
  getRequest("get-sliders").then((res) => {
    dispatch(getSliderStateAC(res.data));
  });
};
export const addSlideTC = (data) => (dispatch) => {
  postRequest("add-slider", data).then((res) =>
    dispatch(addSlideAC({ ...res.data, hover: false }))
  );
};
export const editSlideTC = (data, id) => (dispatch) => {
  putRequest(`edit-slider/${id}`, data).then((res) =>
    dispatch(editSlideAC({ ...res.data, hover: false }, id))
  );
};
export const saveSlideTC = (data) => (dispatch) => {
  putRequest(`save-slider`, data).then((res) => {});
};
export const deleteSlideTC = (id) => (dispatch) => {
  deleteRequest(`delete-slider/${id}`).then(() => dispatch(deleteSlideAC(id)));
};
