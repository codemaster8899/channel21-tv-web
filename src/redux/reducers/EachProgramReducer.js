import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "src/api/api";

const ADD_EACH_STATE = "ADD_EACH_STATE";
const ADD_NEW_EPISOD = "ADD_NEW_EPISOD";
const CLEAR_STATE = "CLEAR_STATE";
const DELETE_HISTORY = "DELETE_HISTORY";
const EDIT_HISTORY = "EDIT_HISTORY";
const HOVER_HISTORY = "HOVER_HISTORY";
const initialState = {
  name: "",
  series: [],
  banners_order: "",
  image: "",
  description: "",
  program_type_id: "",
  hover: false,
  _id: "",
};

export const EachProgramReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EACH_STATE:
      return { ...action.data };
    case ADD_NEW_EPISOD:
      return { ...state, series: [...state.series, action.data] };
    case EDIT_HISTORY:
      let newState = state.series.map((item) => {
        if (item._id === action.data._id) {
          return { ...action.data };
        } else {
          return item;
        }
      });
      return {
        ...state,
        series: [...newState],
      };
    case HOVER_HISTORY:
      let newStateHover = state.series.map((item) => {
        if (item._id === action.id) {
          return { ...item, hover: action.status };
        } else {
          return item;
        }
      });
      return {
        ...state,
        series: [...newStateHover],
      };
    case CLEAR_STATE:
      return {
        name: "",
        series: [],
        banners_order: "",
        image: "",
        description: "",
        program_type_id: "",
        _id: "",
      };
    case DELETE_HISTORY:
      return {
        ...state,
        series: [...state.series.filter((item) => item._id !== action.data)],
      };
    default:
      return { ...state };
  }
};

export const addEachStateAC = (data) => ({ type: ADD_EACH_STATE, data });
export const addNewEpisodAC = (data) => ({ type: ADD_NEW_EPISOD, data });
export const deleteHistoryAC = (data) => ({ type: DELETE_HISTORY, data });
export const clearStateAC = () => ({ type: CLEAR_STATE });
export const editHistoryAC = (data) => ({
  type: EDIT_HISTORY,
  data,
});
export const hoverHistoryAC = (id, status) => ({
  type: HOVER_HISTORY,
  id,
  status,
});

export const addEachStateTC = (id) => (dispatch) => {
  getRequest(`get-program/${id}`).then((res) => {
    res.data.map((item, index) => {
      getRequest(`get-program-history/${item._id}`).then((response) => {
        dispatch(
          addEachStateAC({
            name: item.name,
            series: response.data,
            banners_order: item.banners_order,
            image: item.image,
            description: item.description,
            program_type_id: item.program_type_id,
            hover: false,
            _id: item._id,
          })
        );
      });
      return item;
    });
  });
};

export const addNewEpisodTC = (data) => (dispatch) => {
  postRequest("add-program-history", data).then((res) =>
    dispatch(addNewEpisodAC(res.data))
  );
};

export const editHistoryTC = (data, id) => (dispatch) => {
  putRequest(`edit-program-history/${id}`, data).then((res) => {
    dispatch(editHistoryAC(res.data));
  });
};

export const deleteHistoryTC = (data) => (dispatch) => {
  deleteRequest(`delete-program-history/${data}`).then((res) => {
    dispatch(deleteHistoryAC(data));
  });
};
