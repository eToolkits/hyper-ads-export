import { combineReducers } from "redux";
import listGameStore from './listGameStore';
import gameSelect from './gameSelect';
const myReducer = combineReducers({
    listGameStore,
    gameSelect
})

export default myReducer