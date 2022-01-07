import * as Types from "../constant";

let initialState = [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USER_DATA: {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default myReducer;
