import listGame from "./../database/ListGame.json";
const fs = window.require("fs");
export class ListGameService {
    async addGame(payload) {
        listGame.unshift(payload)
        return this.writeFile(listGame);
    }
    async updateGame(payload) {
        const { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode, } = payload;
        const indexGameEdit = listGame.findIndex((game) => game.id === payload.id);
        const newData = { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode };
        listGame[indexGameEdit] = newData;
        return this.writeFile(listGame);
    }
    async deleteGame(id) {
        const indexGameDelete = listGame.findIndex((game) => game.id === id);
        listGame.splice(indexGameDelete, 1);
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