import { Component, For } from "solid-js";
import { ViewContainer } from "../View";
import BasicButton from "../../buttons/BasicButton";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";

const Lobby: Component = () => {
   
    const { game, localPlayer, connection } = getGame();
    const { back } = getLayout();

    const exit = (): void => {
        connection.exit(localPlayer.uid === game.data?.host?.uid).then(() => {
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
                <div class="flex flex-col flex-1 p-2">
                    <p>Game Id: <span class="select-text">{game.id}</span></p>
                </div>

                <div class="flex-none w-40 text-center">
                    <span>{game.data?.host?.name}(host)</span>
                    <hr />
                    <span>Other players</span>
                    <hr />
                    <ul>
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