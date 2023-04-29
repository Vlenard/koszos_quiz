import { Component, For } from "solid-js";
import { ViewContainer } from "../View";
import BasicButton from "../../buttons/BasicButton";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";

const Lobby: Component = () => {
   
    const { game, localPlayer, exitGame } = getGame();
    const { back } = getLayout();

    const exit = (): void => {
        exitGame().then(() => {
            back()
        });
    };

    return (
        <ViewContainer>
            <div class="flex justify-between p-2">
                <span class="text-lg">Lobby</span>
                <div>
                    <BasicButton onClick={exit}>Back</BasicButton>
                    <BasicButton>Play</BasicButton>
                </div>
            </div>
            <hr />
            <div class="flex flex-1">
                <div class="flex flex-col flex-1">
                    <p>{game.id}</p>
                </div>

                <div class="flex-none w-28">
                    <ul>
                        <li>{localPlayer.name} (you)</li>
                        <For each={game.data?.players} >
                            {player => (
                                <li>
                                    <span class="mr-2">{player.name}</span>
                                    {localPlayer.uid === game.data?.host?.uid ? 
                                        <BasicButton>X</BasicButton> : null
                                    }
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </div>
        </ViewContainer>
    );
};

export default Lobby;