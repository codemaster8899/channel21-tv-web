import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "src/api/api";

//variebles

const GET_CONTENT_STATE = "GET_CONTENT_STATE";
const GET_EACHFACES_STATE = "GET_EACHFACES_STATE";
const HOVER_FACE_CARD = "HOVER_FACE_CARD";
const ADD_FACE = "ADD_FACE";
const EDIT_FACE = "EDIT_FACE";
const DELETE_FACE = "DELETE_FACE";

//initialState

const initialState = {
  content: {},
  eachFace: [],
};

// Reduser

const FacesReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTENT_STATE:
      return { ...state, content: action.data };
    case GET_EACHFACES_STATE:
      return { ...state, eachFace: action.data };
    case HOVER_FACE_CARD:
      let newStateHover = state.eachFace.map((item) => {
        if (item._id === action.id) {
          return { ...item, hover: action.status };
        } else {
          return item;
        }
      });
      return {
        ...state,
        eachFace: [...newStateHover],
      };
    case ADD_FACE:
      return {
        ...state,
        eachFace: [...state.eachFace, action.data],
      };
    case EDIT_FACE:
      let newEditState = state.eachFace.map((item) => {
        if (item._id === action.id) {
          return action.data;
        } else {
          return item;
        }
      });

      return {
        ...state,
        eachFace: newEditState,
      };
    case DELETE_FACE:
      let newDeleteState = state.eachFace.filter(
        (item) => item._id !== action.id
      );
      return {
        ...state,
        eachFace: newDeleteState,
      };
    default:
      return state;
  }
};
export default FacesReduser;

// Action Creaters

export const getContentStateAC = (data) => ({ type: GET_CONTENT_STATE, data });
export const getEachfacesStateAC = (data) => ({
  type: GET_EACHFACES_STATE,
  data,
});
export const hoverFaceCardAC = (id, status) => ({
  type: HOVER_FACE_CARD,
  id,
  status,
});
export const addFaceAC = (data) => ({ type: ADD_FACE, data });
export const editFaceAC = (data, id) => ({ type: EDIT_FACE, data, id });
export const deleteFaceAC = (id) => ({ type: DELETE_FACE, id });

// Thunk Creaters

export const getContentStateTC = () => (dispatch) => {
  getRequest("get-page-contents").then((res) => {
    res.data.map((item) => {
      if (item.title.en === "faces") {
        dispatch(getContentStateAC(item));
      }
    });
  });
};
export const getEachfacesStateTC = () => (dispatch) => {
  getRequest("get-faces").then((res) => {
    let newState = [];
    res.data.map((item) => newState.push({ ...item, hover: false }));
    dispatch(getEachfacesStateAC(newState));
  });
};
export const addFaceTC = (data) => (dispatch) => {
  postRequest("add-face", data).then((res) =>
    dispatch(addFaceAC({ ...res.data, hover: false }))
  );
};
export const editFaceTC = (data, id) => (dispatch) => {
  putRequest(`edit-face/${id}`, data).then((res) => {
    dispatch(editFaceAC({ ...res.data, hover: false }, id));
  });
};
export const deleteFaceTC = (id) => (dispatch) => {
  deleteRequest(`delete-face/${id}`).then(() => dispatch(deleteFaceAC(id)));
};
