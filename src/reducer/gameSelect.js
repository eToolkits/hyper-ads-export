import * as Types from "../constant";
import GameService from "../services/Game.service";
const GameSV = new GameService();

const deepCloneState = (state) => {
  const newState = JSON.stringify(state);
  return JSON.parse(newState);
};
const findIndex = (arr, id) => {
  const index = arr.findIndex((elem) => elem.id === id);
  return index;
};
let initialState = [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SELECT_GAME: {
      let convertToArr = [];
      if (action.payload.idea) {
        let data = action.payload.idea;
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            convertToArr.push({ ...element });
          }
        }
        action.payload.idea = convertToArr;
      }
      state = action.payload;
      return state;
    }
    case Types.ADD_IDEA: {
      const newState = deepCloneState(state);
      if (!newState.idea) {
        newState["idea"] = [action.payload];
      } else {
        newState.idea.unshift(action.payload);
      }
      GameSV.addIdea(state.id, action.payload);
      state = newState;
      console.log("🚀 ~ file: gameSelect.js ~ line 41 ~ myReducer ~ newState", newState)
      return newState;
    }
    case Types.UPDATE_IDEA: {
      const newState = deepCloneState(state);
      const { id } = action.payload;
      const index = findIndex(newState.idea, id);
      newState.idea[index] = { ...action.payload };
      GameSV.updateIdea(state.id, action.payload);
      state = newState;
      return newState;
    }
    case Types.DELETE_IDEA: {
      const newState = deepCloneState(state);
      const { id } = action.payload;
      const index = findIndex(newState.idea, id);
      newState.idea.splice(index, 1);
      GameSV.deleteIdea(state.id, id);
      state = newState;
      return newState;
    }
    default:
      return state;
  }
};

export default myReducer;
