import { DocumentReference } from "firebase/firestore";
import { QuizInfo } from "./QuizData";
import { PlayerData } from "./PlayerData";

export type GameData = {
    quizInfo?: QuizInfo;
    host?: PlayerData;
    players?: Array<PlayerData>;
    scores?: Array<number>;
    turn?: number;//-1 in menu
    selected?: number;
    time?: number;
};