import { combineReducers } from "redux";
import listGameStore from "./listGameStore";
import gameSelected from "./gameSelect";
import userData from "./userData";
const myReducer = combineReducers({
  listGameStore,
  gameSelected,
  userData,
});

export default myReducer;
