// import listGame from "../database/ListGame.json";
import { db } from "./firebaseConfig";
import { ref, set, onValue, update } from "firebase/database";
// const fs = window.require("fs");
export default class GameService {
    getGame() {
        const dataRef = ref(db, 'data/');
        onValue(dataRef, (snapshot) => {
            let data = snapshot.val();
        });
    }
    addGame(payload) {
        set(ref(db, `data/${payload.id}`), {
            ...payload,
        })
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });
    }
    updateGame(payload) {
        const updates = {};
        updates['data/' + payload.id] = payload;
        update(ref(db), updates)
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });
    }
    deleteGame(id) {
        set(ref(db, `data/${id}`), null)
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });
    }
    addIdea(idgame, payload) {
        set(ref(db, `data/${idgame}/idea/${payload.id}`), {
            ...payload,
        })
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });
        // const index = listGame.findIndex((game) => game.id === idgame);
        // console.log("🚀 ~ file: utils.js ~ line 22 ~ ListGameService ~ addIdea ~ index", index)
        // listGame[index].idea.unshift(payload);
        // return this.writeFile(listGame);
    }
    updateIdea(idgame, payload) {
        console.log(idgame);
        console.log(payload);
        const updates = {};
        updates['data/' + idgame + '/idea/' + payload.id] = payload;
        update(ref(db), updates)
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });

        // const indexGame = listGame.findIndex((game) => game.id === idgame);
        // const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === payload.id);
        // listGame[indexGame].idea[indexIdea] = payload;
        // return this.writeFile(listGame);
    }
    deleteIdea(idgame, ididea) {
        set(ref(db, `data/${idgame}/idea/${ididea}`), null)
            .then(() => {
                console.log("success");
                return "success"
            })
            .catch((error) => {
                return "error"
            });
        // const indexGame = listGame.findIndex((game) => game.id === idgame);
        // const indexIdea = listGame[indexGame].idea.findIndex((idea) => idea.id === ididea);
        // listGame[indexGame].idea.splice(indexIdea, 1);
        // return this.writeFile(listGame);
    }

    // writeFile(listGame) {
    //     try {
    //         fs.writeFileSync("./src/database/ListGame.json", JSON.stringify(listGame));
    //         return true

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}