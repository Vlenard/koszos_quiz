import { ParentComponent, createSignal } from "solid-js";
import { appWindow } from "@tauri-apps/api/window";
import { getGame } from "../Game";

type TitlebarProps = {
    class?: string;
};

const Titlebar: ParentComponent<TitlebarProps> = (props) => {

    const { signOut, game, exitGame } = getGame();

    appWindow.onCloseRequested(() => {
        if(game.data){
            exitGame().then(() => {
                signOut();
            });
        }else{
            signOut();
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