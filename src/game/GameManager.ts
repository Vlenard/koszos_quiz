import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, DocumentReference, addDoc, setDoc, doc, DocumentData, deleteDoc } from "firebase/firestore";
import { User, UserCredential, deleteUser, getAuth, onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";
import { Game } from "./types/Game";
import { QuizInfo } from "./types/QuizTypes";
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
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

let game: Game;
let playerRef: DocumentReference;

//#region login & logout
onAuthStateChanged(auth, (user): void => {
    if(user){//signed in

    }else{
        signOutFromApp();
    }
});
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

export const createGame = async (info: QuizInfo): Promise<Game | undefined> => {
    if(!info) return undefined;

};
