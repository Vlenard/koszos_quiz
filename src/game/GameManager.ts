import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, DocumentReference, addDoc, setDoc, doc, DocumentData, deleteDoc, CollectionReference, QuerySnapshot } from "firebase/firestore";
import { User, UserCredential, deleteUser, getAuth, onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";
import { GameData } from "./types/GameData";
import { QuizInfo, QuizList } from "./types/QuizData";
import { Player } from "./types/Player";

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

// variables - refs
let game: GameData;
let playerRef: DocumentReference;
let quizListRef: CollectionReference = collection(db, "quizList");
//#endregion

//#region sign in & sign out
export const signInIntoApp = async (name: string): Promise<Player | undefined> => {

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
export const signOutFromApp = async (): Promise<void> => {
    await deleteDoc(playerRef);
    if(auth.currentUser)
        await deleteUser(auth.currentUser);
};
//#endregion

//#region game action
export const createGame = async (info: QuizInfo): Promise<GameData | undefined> => {
    if(!info) return undefined;

};
//#endregion

//#region quiz action
export const quizListFetcher = async (): Promise<QuizList> => {
    const docSnap: QuerySnapshot<DocumentData> = await getDocs(quizListRef);

    if(!docSnap.empty)
        return docSnap.docs.map(doc => doc.data()) as QuizList;

    return [];
};
//#endregion
