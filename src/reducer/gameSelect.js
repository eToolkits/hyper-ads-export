import * as Types from "../constant";
import { db } from '../services/firebaseConfig';
import { ref, set, onValue, update } from "firebase/database";
import GameService from "../services/Game.service";
const GameSV = new GameService();

const deepCloneState = (state) => {
    const newState = JSON.stringify(state);
    return JSON.parse(newState);
}
const findIndex = (arr, id) => {
    const index = arr.findIndex((elem) => elem.id === id);
    return index;
}
let initialState = [];

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SELECT_GAME: {
            let convertToArr = [];
            if (action.payload.idea) {
                let data = action.payload.idea
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const element = data[key];
                        convertToArr.push({ ...element });
                    }
                }
                action.payload.idea = convertToArr;
            }
            state = action.payload
            return state
        }
        case Types.ADD_IDEA: {
            const newState = deepCloneState(state);
            newState.unshift(action.payload);
            GameSV.addIdea(state.id, action.payload)
            state = newState;
            return state;
        }
        case Types.UPDATE_IDEA: {
            const newState = deepCloneState(state);
            const { id, name, linkBaseCode, currentGame } = action.payload;
            const index = findIndex(newState, currentGame);
            const indexIdea = findIndex(newState[index].idea, id);
            newState[index].idea[indexIdea] = { id, name, linkBaseCode };
            // ListGameSv.writeFile(newState);
            state = newState;
            return state;
        }
        case Types.DELETE_IDEA: {
            const newState = deepCloneState(state);
            const { id, currentGame } = action.payload;
            const index = findIndex(newState, currentGame);
            const indexIdea = findIndex(newState[index].idea, id);
            newState[index].idea.splice(indexIdea, 1);
            // ListGameSv.writeFile(newState);
            state = newState;
            return state;
        }
        default:
            return state;
    }
};

export default myReducer;
