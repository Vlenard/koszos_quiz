import { Component } from "solid-js";
import BasicButton from "../../../buttons/BasicButton";
import { getGame } from "../../../Game";
import { getLayout } from "../../../Layout";
import { View } from "../../View";

const Join: Component = () => {

    let inputRef: any;
    const { joinGame } = getGame();
    const { setView } = getLayout();

    const join = (): void => {
        const input: string = (inputRef as HTMLInputElement).value;
        if(input !== "") joinGame(input).then(() => {
            setView(View.Lobby, true);
        });
    };

    return (
        <div class="flex w-full h-max justify-center items-center p-2">
            <span class="mr-2">Game Id:</span>
            <input type="text" ref={inputRef} />
            <BasicButton class="ml-2" onClick={join}>Join</BasicButton>
        </div>
    );
};

export default Join;