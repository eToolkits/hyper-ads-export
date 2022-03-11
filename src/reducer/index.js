import { combineReducers } from "redux";
import gameSelected from "./gameSelect";
import listGameStore from "./listGameStore";
import userData from "./userData";
const myReducer = combineReducers({
  listGameStore,
  gameSelected,
  userData,
});

export default myReducer;
