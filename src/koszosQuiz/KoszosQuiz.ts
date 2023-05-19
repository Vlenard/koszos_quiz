import { CollectionReference, DocumentReference, Unsubscribe, collection, getDocs, getFirestore } from "firebase/firestore";
import { PlayerData } from "../game/types/PlayerData";
import { GameData } from "../game/types/GameData";
import UpdateEvent from "./UpdateEvent";
import Error from "../game/errors/Error";
import AuthError from "../game/errors/AuthError";
import { initializeApp } from "firebase/app";
import { UserCredential, deleteUser, getAuth, signInAnonymously } from "firebase/auth";
import { QuizInfo, QuizList } from "../game/types/QuizData";
import { ConnectionError } from "../game/errors/ConnectionError";

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


const koszosQuiz = (() => {
    //private
    let player: PlayerData | undefined;
    let isHost: boolean;
    let game: GameData | undefined;
    let gameId: string;
    let inGame: boolean;
    let gameRef: DocumentReference | undefined;
    let unsubscribe: Unsubscribe | undefined;
    let update: UpdateEvent;

    const cleanup = (): void => {
        player = undefined;
        game = undefined;
        gameRef = undefined;
        gameId = "";
        unsubscribe = undefined;
    };

    //public
    return {
        game: {
            onUpdate: (ev: UpdateEvent): void => {
                update = ev;
            },

            join: async (gameId: string): Promise<Error<ConnectionError> | void> => {
                if(gameId.length === 0) return new Error(ConnectionError.InvalidId);

                
            },

            host: async (): Promise<Error<ConnectionError> | void> => {
                
            },

            exit: async (): Promise<void> => {

            },

            start: async (): Promise<void> => {
                if(isHost){

                }
            },

            getId: (): string => gameId,

            inGame: (): boolean => inGame
        }, 


        auth: {
            signIn: async (name: string): Promise<Error<AuthError> | void> => {
                if(name.length === 0) return new Error(AuthError.MissingName);

                const playerCred: UserCredential = await signInAnonymously(auth);

                if(!playerCred)
                    return new Error(AuthError.Faild2SignIn);

                player = {name: name, uid: playerCred.user.uid};
            },

            signOut: async (): Promise<void> => {
                if (auth.currentUser) {
                    await deleteUser(auth.currentUser);
                    player = undefined;
                }
            },

            isHost: (): boolean => {
                isHost = game?.host?.uid === player?.uid;
                return isHost;
            },

            getPlayer: (): PlayerData | undefined => player
        },

        quizes: {
            list: async (): Promise<QuizList> => {
                const querySnapshot = await getDocs(quizListRef);

                if(querySnapshot.empty) return [];

                return querySnapshot.docs.map(doc => doc.data() as QuizInfo);
            }
        }
    };
})();

export default koszosQuiz;