import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference, collection, getDocs, DocumentReference, doc, setDoc, deleteDoc, onSnapshot, getDoc } from "firebase/firestore";
import { Unsubscribe, UserCredential, deleteUser, getAuth, signInAnonymously } from "firebase/auth";
import { PlayerData, RequestedPlayerData } from "./types/PlayerData";
import { GameData, RequestedGameData } from "./types/GameData";
import { QuizList } from "./types/QuizData";
import { ConnectionError } from "./errors/ConnectionError";
import Error from "./errors/Error";
import UpdateEvent from "./types/UpdateEvent";
import AuthError from "./errors/AuthError";


//#region Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiupN7TDtDoYptirlRlzH2AQpIPdjCIrI",
    authDomain: "quiz-game-a283c.firebaseapp.com",
    databaseURL: "https://quiz-game-a283c-default-rtdb.firebaseio.com",
    projectId: "quiz-game-a283c",
    storageBucket: "quiz-game-a283c.appspot.com",
    messagingSenderId: "559679834708",
    appId: "1:559679834708:web:3d25c3e66148152d8abbc1",
    measurementId: "G-82X1GE6N5C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const quizListRef: CollectionReference = collection(db, "quizList");
//#endregion

//#region references & datas
let localPlayer: PlayerData;
let localPlayerIndex: number = -1;
let game: GameData;
let gameRef: DocumentReference;
let gameUnSub: Unsubscribe;
let quizList: QuizList;
//#endregion

//#region authentication
/**
 * @author Varadi
 * @description Sign into firebase with an anonymous user. If name length 0 then will return an error. 
 * If the sign in successfull, it will return player's data especially uid which is generated by firebase
 * @param {string} name Name of the player which will displayed in the game
 * @returns {RequestedPlayerData} Data | Error
 */
const signIn = async (name: string): Promise<RequestedPlayerData> => {
    if (name.length === 0) return { err: new Error(AuthError.MissingName) };

    const player: UserCredential = await signInAnonymously(auth);

    if (player) {
        localPlayer = { name, uid: player.user.uid };
        return {
            data: localPlayer
        };
    }

    return {
        err: new Error(AuthError.Faild2SignIn)
    };
};

/**
 * @author Varadi
 * @description Sign out from firebase and delete the user. If you want to reset game manager variables you have the call "exitGame" method before this method 
 * @returns {boolean} If successfully delete a user return true
 */
const signOut = async (): Promise<boolean> => {
    if (auth.currentUser) {
        await deleteUser(auth.currentUser);
        return true;
    }
    return false;
}
//#endregion

//#region quiz function
/**
 * @author Varadi
 * @description Request the avaible quiz infos. An info contains maximum players, a title, a description and 
 * a reference to the questions and the answers of the quiz
 * @returns Infos about avaible quiz in firestore
 */
const getQuizInfos = async (): Promise<QuizList> => {
    const querySnapshot = await getDocs(quizListRef);

    if (!querySnapshot.empty)
        quizList = querySnapshot.docs.map(doc => doc.data()) as QuizList;

    return quizList;
};
//#endregion

//#region Game connection functions
/**
 * @author Varadi
 * @description Attempts to join a running party based on an "id" parameter. 
 * If it doesn't find the party it returns an error(Not found), 
 * if the party is already full it returns an error(full). 
 * If it finds it adds the player to the list of players and registers an update event if the data changes in the cloud.   
 * @param {string} id The game ID code
 * @param {UpdateEvent} update Update event of the game data
 * @returns {Promise<RequestedGameData<ConnectionError>>} Returns the game data or a specific error
 */
const joinGame = async (id: string, update: UpdateEvent): Promise<RequestedGameData<ConnectionError>> => {
    const gameDoc = await getDoc(doc(db, "games", id));

    if (gameDoc.exists()) {
        gameRef = doc(db, "games", id);
        game = gameDoc.data() as GameData;

        if (!game.players) {
            game = {
                ...game,
                players: [localPlayer]
            };
            localPlayerIndex = 0;
        } else if ((game.quizInfo?.max as number) > game.players.length) {
            game.players.push(localPlayer);
            localPlayerIndex = game.players.length - 2;
        } else {
            return {
                err: new Error(ConnectionError.Full)
            };
        }

        await setDoc(gameRef, game);

        gameUnSub = onSnapshot(gameRef, doc => {
            if (doc.exists()) {
                game = doc.data();
                update({ data: game }, id);
            }
        });

        return {
            data: game
        };
    } else {
        return {
            err: new Error(ConnectionError.NotFound)
        };
    }
};

/**
 * @author Varadi
 * @description It creates a party on firestrore based on pre-made game data, 
 * and then registers an update event if the data changes in the cloud.
 * @param {GameData} data Pre-created game data
 * @param {UpdateEvent} update Update event of the game data
 */
const createGame = async (data: GameData, update: UpdateEvent): Promise<void> => {
    game = data;
    gameRef = doc(collection(db, "games"));
    await setDoc(gameRef, game);

    gameUnSub = onSnapshot(gameRef, doc => {
        if (doc.exists())
            update({
                data: doc.data()
            }, doc.id);
        else {
            update({
                err: new Error(ConnectionError.NotFound),
            }, doc.id);
        }
    });
};

/**
 * @author Varadi
 * @description Quit from game. If you are the host the game will be destroyed, after you quit, otherwise you just exit.
 * Reset every local game manager variables
 * @param {boolean} destroy Recommended expression destroy Local player UID === Host player UID
 */
const exitGame = async (destroy?: boolean): Promise<void> => {
    if (destroy) {
        game.state = 3;
        await setDoc(gameRef, game);
        await deleteDoc(gameRef);
    } else {
        game.players = game.players?.splice(localPlayerIndex, 1);
        await setDoc(gameRef, game);
    }
    cleanupGame();
};

/**
 * @author Varadi
 * @description Deletes all firebase game variables
 */
const cleanupGame = async (): Promise<void> => {
    gameUnSub();
    localPlayerIndex = -1;
    game = {};
    gameRef = {} as DocumentReference;
};
//#endregion

const kickPlayerFromGame = async (player: PlayerData): Promise<GameData> => {
    
    game.players = game.players?.filter(item => item.uid !== player.uid);

    await setDoc(gameRef, game);

    return game;
};

export default {
    auth: {
        signIn,
        signOut,
    },
    quiz: {
        getInfos: getQuizInfos
    },
    game: {
        create: createGame,
        exit: exitGame,
        join: joinGame,
        cleanup: cleanupGame,
        kickPlayer: kickPlayerFromGame
    }
};