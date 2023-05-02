import { Component, For, Match, Switch, createResource, createSignal } from "solid-js";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { View, ViewContainer } from "../View";
import QuizContainer from "./QuizContainer";
import BasicButton from "../../buttons/BasicButton";
import { QuizList } from "../../../game/types/QuizData";
import GameManager from "../../../game/GameManager";
import Host from "./subViews/Host";
import Join from "./subViews/Join";

enum MainMenuSubView {
    Host,
    Join,
    Create
}

const MainMenu: Component = () => {

    const { setView } = getLayout();
    const { auth, game } = getGame();
    const [subView, setSubView] = createSignal<MainMenuSubView>(MainMenuSubView.Host);

    const signOutFromApp = async (): Promise<void> => {
        if (await auth.signOut())
            setView(View.SignIn);
    };

    const openSettings = () => {
        setView(View.Settings, true);
    };

    const changeSubView = (nsview: MainMenuSubView): void => {
        if(nsview !== subView()){
            setSubView(nsview);
        }
    };

    return (
        <ViewContainer>
            <div class="flex justify-between p-2">
                <h1 class="text-lg">Main menu</h1>
                <BasicButton onClick={openSettings}>Settings</BasicButton>
            </div>
            <hr />
            <div class="flex p-2">
                <span class="mr-2">{game.player?.name}</span>
                |
                <BasicButton class="ml-2" onClick={signOutFromApp}>Sign out</BasicButton>
            </div>
            <hr />
            <div class="flex justify-center p-2">
                <BasicButton class="mx-2" onClick={(): void => changeSubView(MainMenuSubView.Host)}>Host</BasicButton>
                <BasicButton class="mx-2" onClick={(): void => changeSubView(MainMenuSubView.Join)}>Join</BasicButton>
                <BasicButton class="mx-2" onClick={(): void => changeSubView(MainMenuSubView.Create)}>Create</BasicButton>
            </div>
            <hr />
            <div class="flex flex-1 relative">
                <Switch>
                    <Match when={subView() === MainMenuSubView.Host}>
                        <Host />
                    </Match>

                    <Match when={subView() === MainMenuSubView.Join}>
                        <Join />
                    </Match>
                </Switch>
            </div>
        </ViewContainer>
    );
};

export default MainMenu;