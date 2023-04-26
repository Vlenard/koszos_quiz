import { ParentComponent, createSignal } from "solid-js";
import { appWindow } from "@tauri-apps/api/window";

type TitlebarProps = {
    class?: string;
};

const Titlebar: ParentComponent<TitlebarProps> = (props) => {

    const [focus, setFocus] = createSignal<string>("focus");

    appWindow.onFocusChanged(({payload: focused}) => {
        setFocus(focused ? "focus" : "");
    });

    return (
        <div 
            data-tauri-drag-region 
            class={`w-full flex bg-white dark:bg-darkGrey transition-colors duration-300 select-none ${focus()} ${props.class}`}>
            {props.children}
        </div>
    );
};

export default Titlebar;