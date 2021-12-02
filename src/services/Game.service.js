import { db } from "./firebaseConfig";
import { ref, set, update } from "firebase/database";
export default class GameService {
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
    deleteGame(payload) {
        set(ref(db, `data/${payload.id}`), null)
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
    }
    updateIdea(idgame, payload) {
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
    }
}