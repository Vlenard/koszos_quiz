import { ParentComponent, createSignal } from "solid-js";
import { appWindow } from "@tauri-apps/api/window";
import { getGame } from "../GameContext";
import KoszosQuiz from "../../koszosQuiz/KoszosQuiz";

type TitlebarProps = {
    class?: string;
};

const Titlebar: ParentComponent<TitlebarProps> = (props) => {

    appWindow.onCloseRequested(() => {
        if (KoszosQuiz.game.inGame()) {
            KoszosQuiz.game.exit().then(() => {
                KoszosQuiz.auth.signOut();
            });
        } else {
            KoszosQuiz.auth.signOut();
        }
    });

    return (
        <div
            data-tauri-drag-region
            class={`w-full flex bg-white dark:bg-darkGrey select-none z-[1000] ${props.class}`}>
            {props.children}
        </div>
    );
};

export default Titlebar;