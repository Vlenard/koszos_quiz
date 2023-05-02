import { Component } from "solid-js";
import BasicButton from "../../../buttons/BasicButton";
import { getGame } from "../../../Game";
import { getLayout } from "../../../Layout";
import { View } from "../../View";

const Join: Component = () => {

    let inputRef: any;
    const { connection, game } = getGame();
    const { setView } = getLayout();

    const join = (ev: MouseEvent): void => {

        ev.preventDefault();

        const input: string = (inputRef as HTMLInputElement).value;
        if (input !== "") connection.join(input).then(() => {
            if (!game.err)
                setView(View.Lobby, true);
        });
    };

    return (
        <div class="w-full h-max">
            <div class="flex w-full justify-center items-center p-2">
                <span class="mr-2">Game Id:</span>
                <form action="#">
                    <input type="text" ref={inputRef} placeholder="knasue34z23blansc"/>
                    <BasicButton type="submit" class="ml-2" onClick={join}>Join</BasicButton>
                </form>
            </div>

            <div class="flex w-full justify-center p-2">
                {game.err && <span class="text-red-600">Can't join to game: {game.err.getErrorMessage()}</span>}
            </div>
        </div>
    );
};

export default Join;