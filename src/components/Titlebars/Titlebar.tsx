import { ParentComponent, createSignal } from "solid-js";
import { appWindow } from "@tauri-apps/api/window";
import { getGame } from "../Game";

type TitlebarProps = {
    class?: string;
};

const Titlebar: ParentComponent<TitlebarProps> = (props) => {

    const { auth, game, connection } = getGame();

    appWindow.onCloseRequested(() => {
        if (game.data) {
            connection.exit(game.player?.uid === game.data.host?.uid).then(() => {
                auth.signOut();
            })
        } else {
            auth.signOut();
        }
    });

    return (
        <div
            data-tauri-drag-region
            class={`w-full flex bg-white dark:bg-darkGrey transition-colors duration-300 select-none ${props.class}`}>
            {props.children}
        </div>
    );
};

export default Titlebar;