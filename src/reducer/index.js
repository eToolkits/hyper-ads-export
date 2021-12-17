import { combineReducers } from "redux";
import listGameStore from "./listGameStore";
import gameSelected from "./gameSelect";
const myReducer = combineReducers({
  listGameStore,
  gameSelected,
});

export default myReducer;
