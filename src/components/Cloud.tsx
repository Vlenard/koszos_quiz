import { ParentComponent, Resource, Setter, createContext, createEffect, createResource, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Quiz, QuizInfo, QuizList } from "../game/types/QuizData";
import { GameData } from "../game/types/GameData";
import { Player } from "../game/types/Player";
import { signInIntoApp, signOutFromApp } from "../game/GameManager"


//#region types
type GameContext = {
    signIn: (name: string) => Promise<Player>;
    signOut: () => Promise<void>;
    player: Player;
};
//#endregion

//#region Context and fetch methods
const gameContext = createContext<GameContext>();
//#endregion

//#region Component
/**
 * Generates a context to share cloud functions for sub components
 */
const Cloud: ParentComponent = (props) => {
    const [gameData, setGameData] = createStore<GameData>({} as GameData);
    const [player, setPlayer] = createStore<Player>({} as Player);
    const [players, setPlayers] = createStore<string[]>([]);

    //#region game manager methods
    const signIn = async (name: string): Promise<Player> => {
        const signedInPlayer: Player = await signInIntoApp(name) as Player;
        setPlayer(signedInPlayer);
        return signedInPlayer;
    };

    const signOut = async (): Promise<void> => {
        await signOutFromApp();
        setPlayer({name: undefined, score: undefined});
    };

    const join = (): void => {

    };
    
    const host = (info: QuizInfo): void => {

    };

    const start = (): void => {

    };
    //#endregion

    return (
        <gameContext.Provider value={{
            signIn,
            signOut,
            player
        }}>
            {props.children}
        </gameContext.Provider>
    );
};
//#endregion

export const getGame = () => useContext(gameContext) as GameContext;
export default Cloud;
