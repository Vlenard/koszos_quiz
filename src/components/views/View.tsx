import { ParentComponent } from "solid-js";

export enum View{
    SignIn,
    MainMenu,
    Game,
    Lobby,
    Settings
};

type ViewContainerProps = {
    class?: string
};

export const ViewContainer: ParentComponent<ViewContainerProps> = (props) => {
    return (
        <div class={`flex flex-1 flex-col bg-white dark:bg-darkGrey ${props.class}`}>
            {props.children}
        </div>
    );
}; 