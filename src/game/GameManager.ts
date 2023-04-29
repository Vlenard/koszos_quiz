import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference, collection, getDocs, DocumentReference, doc, setDoc, deleteDoc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { Unsubscribe, UserCredential, deleteUser, getAuth, signInAnonymously } from "firebase/auth";
import { PlayerData } from "./types/PlayerData";
import { GameData } from "./types/GameData";
import { QuizList } from "./types/QuizData";

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
  
//#region Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const quizListRef: CollectionReference = collection(db, "quizList");
const playersRef: CollectionReference = collection(db, "players");

/*
//#region sign in & sign out
const signInIntoApp = async (name: string): Promise<Player | undefined> => {

    const player: UserCredential = await signInAnonymously(auth);

    if(player) {
        const playerData: Player = {
            name: name,
            score: 0
        };

        playerRef = doc(collection(db, "players"));
        await setDoc(playerRef, playerData);
        
        return playerData;
    };

    return undefined;
};
const signOutFromApp = async (): Promise<void> => {
    await deleteDoc(playerRef);
    if(auth.currentUser)
        await deleteUser(auth.currentUser);
};
//#endregion

//#region game action
const createGame = async (info: QuizInfo): Promise<GameData | undefined> => {
    if(!info) return undefined;

};
//#endregion

//#region quiz action
const quizListFetcher = async (): Promise<QuizList> => {
    const docSnap: QuerySnapshot<DocumentData> = await getDocs(quizListRef);

    if(!docSnap.empty)
        return docSnap.docs.map(doc => doc.data()) as QuizList;

    return [];
};
//#endregion
*/

let localPlayer: PlayerData;
let game: GameData;
let gameRef: DocumentReference;
let gameUnSub: Unsubscribe;
let quizList: QuizList;

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

const getQuizList = async (): Promise<QuizList> => {
    const querySnapshot = await getDocs(quizListRef);

    if(!querySnapshot.empty)
        quizList = querySnapshot.docs.map(doc => doc.data()) as QuizList;
    
    return quizList;
};

const createGame = async (data: GameData, event: (data: GameData, id: string) => void): Promise<boolean> => {
    game = data;
    gameRef = doc(collection(db, "games"));
    await setDoc(gameRef, game);

    gameUnSub = onSnapshot(gameRef, doc => {
       if(doc.exists())
            event(doc.data(), doc.id);
    });

    return true;
};

const exitGame = async (): Promise<void> => {
    game = {};
    gameUnSub();
    await deleteDoc(gameRef);
    gameRef = {} as DocumentReference;
};

export default {
    signIn,
    signOut,
    getQuizList,
    createGame,
    exitGame
};