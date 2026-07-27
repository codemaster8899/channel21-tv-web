import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "src/api/api";

const ADD_PROGRAMSTATE = "ADD_PROGRAMSTATE";
const CHANGE_STATE = "CHANGE_STATE";
const DELETE_PROGRAM = "DELETE_PROGRAM";
const EDIT_PROGRAM = "EDIT_PROGRAM";
const initialState = { programs: [], shows: [], films: [] };

const ProgramsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return { ...action.data };
    case ADD_PROGRAMSTATE:
      return {
        ...state,
        [action.header]: [...state[action.header], action.data],
      };
    case EDIT_PROGRAM:
      let newState = { ...state };
      newState[action.header].map((item) => {
        if (item._id === action.id) {
          return { ...action.data, series: item.series };
        } else {
          return item;
        }
      });
      return {
        ...state,
        [action.header]: [...newState],
      };
      return;
    case DELETE_PROGRAM:
      return {
        ...state,
        [action.programtype]: [
          ...state[action.programtype].filter(
            (item) => item._id !== action.data
          ),
        ],
      };

    default:
      return state;
  }
};
export const addProgramStateAC = (data, header) => ({
  type: ADD_PROGRAMSTATE,
  data,
  header,
});
export const deleteProgramAC = (data, programtype) => ({
  type: DELETE_PROGRAM,
  data,
  programtype,
});
export const changeStateAC = (data) => ({ type: CHANGE_STATE, data });
export const editProgramAC = (data, header, id) => ({
  type: EDIT_PROGRAM,
  data,
  header,
  id,
});

export const getProgramsTC = () => {
  return (dispatch) => {
    getRequest("get-program-by-type/624d89fd69c3c4a1efa91efa")
      .then((res) => {
        res.data.map((item, index) => {
          getRequest(`get-program-history/${item._id}`).then((response) => {
            dispatch(
              addProgramStateAC(
                {
                  ...item,
                  series: response.data,
                },
                "programs"
              )
            );
          });
          return item;
        });
      })
      .then(() => {})
      .catch((err) => {
      });
  };
};
export const getFilmsTC = () => {
  return (dispatch) => {
    getRequest("get-program-by-type/627b742b3e200e8118224e1e")
      .then((res) => {
        res.data.map((item, index) => {
          return dispatch(addProgramStateAC(item, "films"));
        });
      })
      .then(() => {})
      .catch((err) => {
      });
  };
};
export const getShowsTC = () => (dispatch) => {
  getRequest("get-program-by-type/624d89f369c3c4a1efa91ef7")
    .then((res) => {
      res.data.map((item, index) => {
        getRequest(`get-program-history/${item._id}`).then((response) => {
          dispatch(
            addProgramStateAC(
              {
                ...item,
                series: response.data,
              },
              "shows"
            )
          );
        });
        return item;
      });
    })
    .catch((err) => {
      
    });
};
export const addNewProgramTC = (item, header) => (dispatch) => {
  postRequest("add-program", item).then((res) => {
    dispatch(
      addProgramStateAC(
        {
          ...res.data,
          series: [],
        },
        header
      )
    );
  });
};
export const editProgramTC = (data, header, id) => (dispatch) => {
  putRequest(`edit-program/${id}`, {
    name: data.name,
    image: data.image,
    description: data.description,
    program_type_id: data.program_type_id,
  }).then((res) => {
    dispatch(
      editProgramAC(
        {
          ...res.data,
          series: [],
        },
        header,
        id
      )
    );
  });
};
export const updateBannersTC = (data) => (dispatch) => {
  putRequest("update-banners", data).then((res) => {});
};
export const deleteTC = (data, type) => (dispatch) => {
  dispatch(deleteProgramAC(data, type));
  deleteRequest(`delete-program/${data}`);
};
export default ProgramsReducer;
