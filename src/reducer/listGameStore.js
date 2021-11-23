import * as Types from "../constant";
import listGame from "./../database/ListGame.json";
import ListGameService from "./../function/utils";
const ListGameSv = new ListGameService();

const deepCloneState = (state) => {
	const newState = JSON.stringify(state);
	return JSON.parse(newState);
}
const findIndex = (arr, id) => {
	const index = arr.findIndex((elem) => elem.id === id);
	return index;
}
var initialState = listGame;

const myReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.ADD_GAME: {
			const newState = deepCloneState(state);
			newState.unshift(action.payload);
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		case Types.UPDATE_GAME: {
			const newState = deepCloneState(state);
			const { id } = action.payload;
			const index = findIndex(newState, id);
			newState[index] = action.payload;
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		case Types.DELETE_GAME: {
			const newState = deepCloneState(state);
			const { id } = action.payload;
			const index = findIndex(newState, id);
			newState.splice(index, 1);
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		case Types.ADD_IDEA: {
			const newState = deepCloneState(state);
			const { currentGameId, id, name, linkBaseCode } = action.payload;
			const index = findIndex(newState, currentGameId);
			newState[index].idea.unshift({ id, name, linkBaseCode });
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		case Types.UPDATE_IDEA: {
			const newState = deepCloneState(state);
			const { id, name, linkBaseCode, currentGame } = action.payload;
			const index = findIndex(newState, currentGame);
			const indexIdea = findIndex(newState[index].idea, id);
			newState[index].idea[indexIdea] = { id, name, linkBaseCode };
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		case Types.DELETE_IDEA: {
			const newState = deepCloneState(state);
			const { id, currentGame } = action.payload;
			const index = findIndex(newState, currentGame);
			const indexIdea = findIndex(newState[index].idea, id);
			newState[index].idea.splice(indexIdea, 1);
			ListGameSv.writeFile(newState);
			state = newState;
			return state;
		}
		default:
			return state;
	}
};

export default myReducer;
