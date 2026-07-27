import { getRequest, postRequest, putRequest } from "src/api/api";

const CHANGE_THEM = "CHANGE_THEM";
const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
const SET_LIVE_LINK = "SET_LIVE_LINK";
const GET_CONTACT_US = "GET_CONTACT_US";
const SET_TIME = "SET_TIME";
const SET_LOADER = "SET_LOADER";
const GET_MEDIA_LINK = "GET_MEDIA_LINK";

let localStore = localStorage.getItem("dark");

const initialState = {
  loader: false,
  dark: false,
  language: "am",
  liveLink: "",
  contactUs: {},
  socialMedia: {},
  time: "",
};

if (localStore === "true") {
  initialState.dark = true;
} else {
  initialState.dark = false;
}
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEM:
      localStorage.setItem("dark", !state.dark);
      return {
        ...state,
        dark: !state.dark,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };
    case SET_LIVE_LINK:
      return {
        ...state,
        liveLink: action.data,
      };

    case GET_CONTACT_US:
      return {
        ...state,
        contactUs: action.data,
      };
    case GET_MEDIA_LINK:
      return {
        ...state,
        socialMedia: action.data,
      };
    case SET_LOADER:
      return { ...state, loader: action.data };
    case SET_TIME:
      return {
        ...state,
        time: action.data,
      };

    default:
      return state;
  }
};

export default MainReducer;

export const changeDarkAC = () => ({ type: CHANGE_THEM });
export const changeLanguageAC = (data) => ({ type: CHANGE_LANGUAGE, data });
export const setLiveLinkAC = (data) => ({ type: SET_LIVE_LINK, data });
export const getContactUsAC = (data) => ({ type: GET_CONTACT_US, data });
export const setTimeAC = (data) => ({ type: SET_TIME, data });
export const setLoaderAC = (data) => ({ type: SET_LOADER, data });
export const getMediaLinkAC = (data) => ({ type: GET_MEDIA_LINK, data });

export const getLiveLinkTC = () => (dispatch) => {
  getRequest("get-liveLink").then((res) => {
    const last = Array.isArray(res.data) ? res.data[res.data.length - 1] : null;
    if (last?.link) dispatch(setLiveLinkAC(last.link));
  });
};
export const addLiveLinkTC = (data) => (dispatch) => {
  postRequest("add-liveLink", data).then((res) => {
    dispatch(setLiveLinkAC(res.data.link));
  });
};
export const getContactUsTC = () => (dispatch) => {
  getRequest("get-contact").then((res) => {
    const last = Array.isArray(res.data) ? res.data[res.data.length - 1] : null;
    if (last) dispatch(getContactUsAC(last));
  });
  getRequest("get-media-links").then((res) => {
    const last = Array.isArray(res.data) ? res.data[res.data.length - 1] : null;
    if (last) dispatch(getMediaLinkAC(last));
  });
};
export const editContactUsTC = (data) => (dispatch) => {
  putRequest("edit-contact/627ccfaa864a46b26d8d4603", data).then((res) => {
    dispatch(getContactUsAC(res.data));
  });
};
export const editMediaLinkTC = (data) => (dispatch) => {
  putRequest("edit-media-link/627cc5d4e6a340a20419c77a", data).then((res) => {
    dispatch(getMediaLinkAC(res.data));
  });
};
