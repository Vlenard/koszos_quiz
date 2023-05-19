import { Component, For, Suspense, createResource } from "solid-js";
import { QuizList } from "../../../../game/types/QuizData";
import KoszosQuiz from "../../../../koszosQuiz/KoszosQuiz";
import QuizInfoContainer from "../../../containers/QuizInfoContainer";
import Spinner from "../../../loading/Spinner";

const HostView: Component = () => {

    const [quizes, modifyQuizes] = createResource<QuizList>(KoszosQuiz.quizes.list);

    return (
        <div class="absolute h-full w-full overflow-x-scroll flex flex-col items-center">
            <Suspense fallback={<Spinner />}>
                <For each={quizes()}>
                    {quiz => (
                        <QuizInfoContainer {...quiz}/>
                    )}
                </For>
            </Suspense>
        </div>
    );
};

export default HostView;