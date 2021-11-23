import listGame from "./../database/ListGame.json";
const fs = window.require("fs");
export default class ListGameService {
    async addGame(payload) {
        listGame.unshift(payload)
        return this.writeFile(listGame);
    }
    async updateGame(payload) {
        const { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode, } = payload;
        const index = listGame.findIndex((game) => game.id === payload.id);
        const newData = { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode };
        listGame[index] = newData;
        return this.writeFile(listGame);
    }
    async deleteGame(id) {
        const index = listGame.findIndex((game) => game.id === id);
        listGame.splice(index, 1);
        return this.writeFile(listGame);
    }
    async addIdea(idgame, payload) {
        const index = listGame.findIndex((game) => game.id === idgame);
        console.log("🚀 ~ file: utils.js ~ line 22 ~ ListGameService ~ addIdea ~ index", index)
        listGame[index].idea.unshift(payload);
        return this.writeFile(listGame);
    }
    async updateIdea(idgame, payload) {
        console.log(idgame);
        console.log(payload);
        const indexGame = listGame.findIndex((game) => game.id === idgame);
        const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === payload.id);
        listGame[indexGame].idea[indexIdea] = payload;
        return this.writeFile(listGame);
    }
    async deleteIdea(idgame, ididea) {
        const indexGame = listGame.findIndex((game) => game.id === idgame);
        const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === ididea);
        listGame[indexGame].idea.splice(indexIdea, 1);
        return this.writeFile(listGame);
    }

    async writeFile(listGame) {
        try {
            fs.writeFileSync("./src/database/ListGame.json", JSON.stringify(listGame));
            return true
            
        }catch(err) {
            console.log(err);
        }
    }
}