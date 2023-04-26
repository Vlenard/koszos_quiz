import { Component, For, createResource } from "solid-js";
import { QuizList } from "../../game/types/QuizData";
import { quizListFetcher } from "../../game/GameManager";
import { getGame } from "../Cloud";
import { getLayout } from "../Layout";
import { View } from "./View";

const MainMenu: Component = () => {

    const [quizList, modifyQuizList] = createResource<QuizList>(quizListFetcher);
    const { player, signOut } = getGame();
    const { setContent } = getLayout();

    const signOutFromApp = (): void => {
        signOut().then(() => {
            setContent(View.SignIn);
        });
    };

    return (
        <div class="flex-1">
            <h2 class="text-xl">Game menu</h2>
            <hr />
            <p>{player.name}</p>
            <button onClick={signOutFromApp}>Sign out</button>
            <hr />
            <h3 class="text-lg">Quizes</h3>
            <br />
            <div class="w-full max-h-full overflow-y-scroll">
                {!quizList.loading && (
                    <For each={quizList()}>
                        {quiz => (
                            <>
                                <div>
                                    <h4>{quiz.name}</h4>
                                    <p>{quiz.des}</p>
                                    <p>Maximum players: {quiz.max}</p>
                                    <button>Play</button>
                                </div>
                                <br />
                                <br />
                                <br />
                            </>
                        )}
                    </For>
                )}
            </div>
        </div>
    );
};

export default MainMenu;