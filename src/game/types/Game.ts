import { DocumentReference } from "firebase/firestore";
import { QuizInfo } from "./QuizTypes";
import { Player } from "./Player";

export type Game = {
    quizInfo: QuizInfo;
    players: Array<DocumentReference<Player>>;
    turn: number;//-1 in menu
};