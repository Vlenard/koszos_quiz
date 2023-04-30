import { DocumentReference } from "firebase/firestore";
import { QuizInfo } from "./QuizData";
import { PlayerData } from "./PlayerData";

export type GameData = {
    quizInfo?: QuizInfo;
    host?: PlayerData;
    players?: Array<PlayerData>;
    scores?: Array<number>;
    turn?: number; 
    state?: number;//0 menu | 1 game | 2 end | 3 host exit
    selected?: number;
    time?: number;
};