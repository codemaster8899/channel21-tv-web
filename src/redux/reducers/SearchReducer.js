import { getRequest, postRequest, putRequest } from "src/api/api";

const SET_SEARCH_ITEM = "SET_SEARCH_ITEM";
const GET_RESULT = "GET_RESULT";
const CLEAR_RESULT = "CLEAR_RESULT";

const initialState = {
  searchItem: "",
  result: [],
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESULT:
      return { ...state, result: [...state.result, action.data] };
    case SET_SEARCH_ITEM:
      return { ...state, searchItem: action.data };
    case CLEAR_RESULT:
      return { ...state, result: [] };
    default:
      return state;
  }
};

export default SearchReducer;

export const setSearchItemAC = (data) => ({ type: SET_SEARCH_ITEM, data });
export const getResultAC = (data) => ({ type: GET_RESULT, data });
export const clearResultAC = () => ({ type: CLEAR_RESULT });

export const getResultTC = (data) => (dispatch) => {
  getRequest(`search/${data}`).then((res) => {
    dispatch(clearResultAC());
    let newData = [];
    res.data.searchProgram.map((item) => {
      if (!newData.includes(item._id)) {
        newData.push(item._id);
      }
    });
    res.data.searchProgramHistory.map((item) => {
      if (!newData.includes(item.programId)) {
        newData.push(item.programId);
      }
      // res.data.searchProgram.map((element) => {
      //   if (element._id !== item.programId) {
      //     newData.push(item.programId);
      //   }
      // });
    });

    newData.map((item) => {
      getRequest(`get-program/${item}`).then((res) => {
        res.data.map((item, index) => {
          if (item.program_type_id === "627b742b3e200e8118224e1e") {
            dispatch(
              getResultAC({
                ...item,
                hover: false,
              })
            );
          } else {
            getRequest(`get-program-history/${item._id}`).then((response) => {
              dispatch(
                getResultAC({
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
          }
          return item;
        });
      });
    });
  });
};
