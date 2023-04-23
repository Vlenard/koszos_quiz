import { DocumentReference } from "firebase/firestore";

export type Quiz = {
    questions: string[];
    answers: string[];
};

export type QuizInfo = {
    name: string;
    max: number;
    des: string;
    quiz: DocumentReference<Quiz>;
}; 

export type QuizList = Array<QuizInfo>;