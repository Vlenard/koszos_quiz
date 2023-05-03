import { Component, For, createEffect } from "solid-js";
import { ViewContainer } from "../View";
import BasicButton from "../../buttons/BasicButton";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { PlayerData } from "../../../game/types/PlayerData";

const Lobby: Component = () => {

    const { game, connection, auth } = getGame();
    const { back } = getLayout();

    const exit = (): void => {
        connection.exit(auth.isHost(game.player as PlayerData)).then(() => {
            back()
        });
    };

    const onHostExit = (): void => {
        if(!auth.isHost(game.player as PlayerData)){
            connection.cleanup().then(() => {
                back();
            });
        }
    };

    createEffect((): void => {
        switch (game.data?.state) {
            case 1://game

                break;
            case 3://host exit
                onHostExit();
                break;
            default:
                break;
        }
    });

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
                        <For each={game.data?.players?.slice(1, game.data.players.length)/*Remove host, because host is always the first in players list*/} >
                            {player => (
                                <li>
                                    <span class="mr-2">{player.name}</span>
                                    {auth.isHost(game.player as PlayerData) ?
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