import { Component } from "solid-js";
import { QuizInfo } from "../../../game/types/QuizData";
import BasicButton from "../../buttons/BasicButton";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { View } from "../View";

const QuizContainer: Component<QuizInfo> = (props) => {

    const { createGame } = getGame();
    const { setView } = getLayout();

    const openLobby = (): void => {
        createGame(props).then(() => {
            setView(View.Lobby, true);
        });
    };

    return (        
        <div class="border-2 rounded-md my-2 mx-2 p-2 max-w-[300px] min-w-[300px]">
            <h1 class="text-lg pb-2">{props.name}</h1>
            <hr />
            <p class="py-2">{props.des}</p>
            <hr />
            <div class="flex justify-between pt-2">
                <span>Maximum player: {props.max}</span>
                <BasicButton onClick={openLobby}>Play</BasicButton>
            </div>
        </div>
    );
};

export default QuizContainer;