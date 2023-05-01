import { Component, For, createResource } from "solid-js";
import QuizContainer from "../QuizContainer";
import { QuizList } from "../../../../game/types/QuizData";
import GameManager from "../../../../game/GameManager";

const Host: Component = () => {

    const [quizList, modifyQuizList] = createResource<QuizList>(GameManager.quiz.getInfos);

    return (
        <div class="absolute w-full h-full flex flex-col items-center overflow-y-scroll flex-wrap">
            {!quizList.loading && (
                <For each={quizList()}>
                    {quiz => (
                        <QuizContainer {...quiz} />
                    )}
                </For>
            )}
        </div>
    );
};

export default Host;