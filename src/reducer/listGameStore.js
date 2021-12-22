import * as Types from "../constant";
import GameService from "./../services/Game.service";
import { deepClone } from "../Utils";
const GameSV = new GameService();

const findIndex = (arr, id) => {
  const index = arr.findIndex((elem) => elem.id === id);
  return index;
};
var initialState = [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INIT_GAME: {
      const newState = action.payload;
      newState.map(game => {
        let arrIdea = [];
        for (const property in game.idea) {
          arrIdea.push(game.idea[property])
        }
        game.idea = arrIdea
      });
      state = newState;
      return state;
    }
    case Types.ADD_GAME: {
      const newState = deepClone(state);
      newState.unshift(action.payload);
      GameSV.addGame(action.payload);
      state = newState;
      return state;
    }
    case Types.UPDATE_GAME: {
      const newState = deepClone(state);
      const { id } = action.payload;
      const index = findIndex(newState, id);
      newState[index] = action.payload;
      GameSV.updateGame(action.payload);
      state = newState;
      return state;
    }
    case Types.DELETE_GAME: {
      const newState = deepClone(state);
      const { id } = action.payload;
      console.log(id);
      const index = findIndex(newState, id);
      newState.splice(index, 1);
      GameSV.deleteGame(action.payload);
      state = newState;
      return state;
    }
    default:
      return state;
  }
};

export default myReducer;
