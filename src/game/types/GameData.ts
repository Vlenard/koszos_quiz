import { DocumentReference } from "firebase/firestore";
import { QuizInfo } from "./QuizData";
import { Player } from "./Player";

export type GameData = {
    quizInfo: QuizInfo;
    players: Array<DocumentReference<Player>>;
    turn: number;//-1 in menu
    selected: number;
};