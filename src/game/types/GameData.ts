import { QuizInfo } from "./QuizData";
import { PlayerData } from "./PlayerData";
import Error from "../errors/Error";

export type RequestedGameData<T> = {
    data?: GameData;
    err?: Error<T>;
};

export type GameData = {
    quizInfo?: QuizInfo;
    host?: PlayerData;
    players?: Array<PlayerData>;
    scores?: Array<number>;
    turn?: number; 
    state?: number;//0 lobby | 1 game | 2 end | 3 host exit
    selected?: number;
    time?: number;
};