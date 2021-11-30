import listGame from "./../database/ListGame.json";
import { db } from "./../services/firebaseConfig";
import { ref, child, get, set } from "firebase/database";
const fs = window.require("fs");
export default class ListGameService {
    getGame() { 
        let data = ref(db);
        get(child(data, `/data`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    addGame(payload) {
        listGame.unshift(payload)
        return this.writeFile(listGame);
    }
    updateGame(payload) {
        const { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode, } = payload;
        const index = listGame.findIndex((game) => game.id === payload.id);
        const newData = { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode };
        listGame[index] = newData;
        return this.writeFile(listGame);
    }
    deleteGame(id) {
        const index = listGame.findIndex((game) => game.id === id);
        listGame.splice(index, 1);
        return this.writeFile(listGame);
    }
    addIdea(idgame, payload) {
        const index = listGame.findIndex((game) => game.id === idgame);
        console.log("🚀 ~ file: utils.js ~ line 22 ~ ListGameService ~ addIdea ~ index", index)
        listGame[index].idea.unshift(payload);
        return this.writeFile(listGame);
    }
    updateIdea(idgame, payload) {
        console.log(idgame);
        console.log(payload);
        const indexGame = listGame.findIndex((game) => game.id === idgame);
        const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === payload.id);
        listGame[indexGame].idea[indexIdea] = payload;
        return this.writeFile(listGame);
    }
    deleteIdea(idgame, ididea) {
        const indexGame = listGame.findIndex((game) => game.id === idgame);
        const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === ididea);
        listGame[indexGame].idea.splice(indexIdea, 1);
        return this.writeFile(listGame);
    }

    writeFile(listGame) {
        try {
            fs.writeFileSync("./src/database/ListGame.json", JSON.stringify(listGame));
            return true

        } catch (err) {
            console.log(err);
        }
    }
}