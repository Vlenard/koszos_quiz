import { Component, For, createResource } from "solid-js";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { View, ViewContainer } from "../View";
import QuizContainer from "./QuizContainer";
import BasicButton from "../../buttons/BasicButton";
import { QuizList } from "../../../game/types/QuizData";
import GameManager from "../../../game/GameManager";

const MainMenu: Component = () => {

    const { setView } = getLayout();
    const { signOut, localPlayer } = getGame();
    const [ quizList, modifyQuizList ]= createResource<QuizList>(GameManager.getQuizList);

    const signOutFromApp = async (): Promise<void> => {
        if(await signOut())
            setView(View.SignIn);
    };

    const openSettings = () => {
        setView(View.Settings, true);
    };

    return (
        <ViewContainer>
            <div class="flex justify-between p-2">
                <h1 class="text-lg">Main menu</h1>
                <BasicButton onClick={openSettings}>Settings</BasicButton>
            </div>
            <hr />
            <div class="flex p-2">
                <span class="mr-2">{localPlayer.name}</span>
                |
                <BasicButton class="ml-2" onClick={signOutFromApp}>Sign out</BasicButton>
            </div>
            <hr />
            <div class="flex-1 relative">
                <div class="absolute w-full h-full flex flex-col items-center overflow-y-scroll flex-wrap">
                    {!quizList.loading && (
                        <For each={quizList()}>
                            {quiz => (
                                <QuizContainer {...quiz}/>
                            )}
                        </For>
                    )}
                </div>
            </div>
        </ViewContainer>
    );
};

export default MainMenu;