import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference, collection, getDocs, DocumentReference, doc, setDoc, deleteDoc, onSnapshot, getDoc } from "firebase/firestore";
import { Unsubscribe, UserCredential, deleteUser, getAuth, signInAnonymously } from "firebase/auth";
import { PlayerData } from "./types/PlayerData";
import { GameData, RequestedGameData } from "./types/GameData";
import { QuizList } from "./types/QuizData";
import { ConnectionError } from "./errors/ConnectionError";
import Error from "./errors/Error";
import UpdateEvent from "./types/UpdateEvent";


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
const signIn = async (name: string): Promise<PlayerData | undefined> => {
    const player: UserCredential = await signInAnonymously(auth);

    if(player){
        localPlayer = {name, uid: player.user.uid};
        return localPlayer;
    }
    
    return undefined;
};

const signOut = async (): Promise<boolean> => {
    if(auth.currentUser){
        await deleteUser(auth.currentUser);
        return true;
    }
    return false;
}
//#endregion

const getQuizInfos = async (): Promise<QuizList> => {
    const querySnapshot = await getDocs(quizListRef);

    if(!querySnapshot.empty)
        quizList = querySnapshot.docs.map(doc => doc.data()) as QuizList;
    
    return quizList;
};

//#region Game connection functions
const joinGame = async (id: string, update: UpdateEvent): Promise<RequestedGameData<ConnectionError>> => {
    const gameDoc = await getDoc(doc(db, "games", id));

    if(gameDoc.exists()){
        gameRef = doc(db, "games", id);
        game = gameDoc.data() as GameData;

        if(!game.players){
            game = {
                ...game,
                players: [localPlayer]
            };
            localPlayerIndex = 0;
        }else if((game.quizInfo?.max as number) > game.players.length){
            game.players.push(localPlayer);
            localPlayerIndex = game.players.length - 2;
        }else{
            return {
                err: new Error(ConnectionError.Full)
            };
        }

        await setDoc(gameRef, game);
        
        gameUnSub = onSnapshot(gameRef, doc => {
            if(doc.exists()){
                game = doc.data();
                update({data: game}, id);
            }
        });

        return {
            data: game
        };
    }else{
        return {
            err: new Error(ConnectionError.NotFound)
        };
    }
};

const createGame = async (data: GameData, update: UpdateEvent): Promise<void> => {
    game = data;
    gameRef = doc(collection(db, "games"));
    await setDoc(gameRef, game);

    gameUnSub = onSnapshot(gameRef, doc => {
        if(doc.exists())
            update({
                data: doc.data()
            }, doc.id);
        else{
            update({
                err: new Error(ConnectionError.NotFound),
            }, doc.id);
        }
    });
};

const exitGame = async (destroy?: boolean): Promise<void> => {
    gameUnSub();
    if(destroy){
        await deleteDoc(gameRef);
    }else{
        game.players = game.players?.splice(localPlayerIndex, 1);
        await setDoc(gameRef, game);
    }
    localPlayerIndex = -1;
    game = {};
    gameRef = {} as DocumentReference;
};
//#endregion

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
        join: joinGame
    }
};