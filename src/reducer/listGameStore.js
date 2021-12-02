import * as Types from "../constant";
import { db } from './../services/firebaseConfig';
import { ref, onValue } from "firebase/database";
import GameService from "./../services/Game.service";
const GameSV = new GameService();

const deepCloneState = (state) => {
	const newState = JSON.stringify(state);
	return JSON.parse(newState);
}
const findIndex = (arr, id) => {
	const index = arr.findIndex((elem) => elem.id === id);
	return index;
}
var initialState = () => {
	const dataRef = ref(db, "data/");
	onValue(dataRef, (snapshot) => {
		let convertToArr = [];
		let data = snapshot.val();
		for (const key in data) {
			if (Object.hasOwnProperty.call(data, key)) {
				const element = data[key];
				convertToArr.push({ ...element });
			}
		}
		localStorage.setItem("InitState", JSON.stringify(convertToArr));
	});
	return JSON.parse(localStorage.getItem("InitState"));
};

const myReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Types.ADD_GAME: {
			const newState = deepCloneState(state);
			newState.unshift(action.payload);
			GameSV.addGame(action.payload);
			state = newState;
			return state;
		}
		case Types.UPDATE_GAME: {
			const newState = deepCloneState(state);
			const { id } = action.payload;
			const index = findIndex(newState, id);
			newState[index] = action.payload;
			GameSV.updateGame(action.payload)
			state = newState;
			return state;
		}
		case Types.DELETE_GAME: {
			const newState = deepCloneState(state);
			const { id } = action.payload;
			console.log(id);
			const index = findIndex(newState, id);
			newState.splice(index, 1);
			GameSV.deleteGame(action.payload)
			state = newState;
			return state;
		}
		default:
			return state;
	}
};

export default myReducer;
