import * as Types from "../constant";
var initialState = "";

const myReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.SEND_FILE: {
			state = action.data;
            console.log("🚀 ~ file: file.js ~ line 8 ~ myReducer ~ state", state)
			return state;
		}
		default:
			return state;
	}
};

export default myReducer;
