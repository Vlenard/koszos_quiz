import { Accessor, ParentComponent, createContext, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { GameData } from "../game/types/GameData";
import GameManager from "../game/GameManager";
import { QuizInfo } from "../game/types/QuizData";
import { PlayerData } from "../game/types/PlayerData";

//#region types
type GameContext = {
    signIn: (hostname: string) => Promise<void>;
    signOut: () => Promise<boolean>;
    game: {
        data?: GameData;
        id?: string;
    };
    localPlayer: PlayerData;
    createGame: (info: QuizInfo) => Promise<void>;
    exitGame: (destroy?: boolean) => Promise<void>;
    joinGame: (id: string) => Promise<void>;
};
//#endregion

//#region Context and fetch methods
const gameContext = createContext<GameContext>();
//#endregion

//#region Component
/**
 * Generates a context to share cloud functions for sub components
 */
const Game: ParentComponent = (props) => {

    const [game, setGame] = createStore<{
        data?: GameData;
        id?: string;
    }>({});
    const [localPlayer, setLocalPlayer] = createStore<PlayerData>({} as PlayerData);

    const onGameDataChanged = (ndata: GameData, id: string): void => {
        setGame({
            data: ndata,
            id: id
        });
    };

    const signIn = async (name: string): Promise<void> => {
        const player = await GameManager.signIn(name);
        setLocalPlayer(player as PlayerData);
    };

    const signOut = async (): Promise<boolean> => {
        return await GameManager.signOut();
    };

    const joinGame = async (id: string): Promise<void> => {
        const data: GameData = await GameManager.joinGame(id, onGameDataChanged);
        if(data.host)
            setGame({
                data: data,
                id: id
            });
    };

    const createGame = async (info: QuizInfo): Promise<void> => {
        const data: GameData = {...game.data};
        data.quizInfo = info;
        data.host = localPlayer;
        data.state = 0;
        await GameManager.createGame(data, onGameDataChanged);
    };

    const exitGame = async (destroy?: boolean): Promise<void> => {
        await GameManager.exitGame(destroy);
        setGame({});
    };

    return (
        <gameContext.Provider value={{
            signIn,
            signOut,
            game,
            localPlayer,
            createGame,
            exitGame,
            joinGame
        }}>
            {props.children}
        </gameContext.Provider>
    );
};
//#endregion

export const getGame = () => useContext(gameContext) as GameContext;
export default Game;
