import { ParentComponent } from "solid-js";

export enum View{
    SignIn,
    MainMenu,
    Game,
    Lobby,
    Settings
};

export const ViewContainer: ParentComponent = (props) => {
    return (
        <div class="flex flex-1 flex-col">
            {props.children}
        </div>
    );
}; 