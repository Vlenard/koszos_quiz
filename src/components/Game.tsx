import { ParentComponent, Resource, Setter, createContext, createEffect, createResource, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Quiz, QuizInfo, QuizList } from "../game/types/QuizTypes";
import { Game } from "../game/types/Game";
import { Player } from "../game/types/Player";
import { signInIntoApp, signOutFromApp } from "../game/GameManager"


//#region types
type GameContext = {
    signIn: (name: string) => void;
    signOut: () => void;
    player: Player;
};
//#endregion

//#region Context and fetch methods
const Context = createContext<GameContext>();
//#endregion

//#region Component
/**
 * Generates a context to share cloud functions for sub components
 */
const GameComponent: ParentComponent = (props) => {

    const [quizList, setQuizList] = createStore<QuizList>([]);
    const [game, setGame] = createStore<Game>({} as Game);
    const [player, setPlayer] = createStore<Player>({} as Player);
    const [players, setPlayers] = createStore<string[]>([]);

    const signIn = (name: string) => {
        signInIntoApp(name).then(player => {
            if(player){
                setPlayer(player);
            }
        });
    };

    const signOut = (): void => {
        signOutFromApp().then(() => {
            setPlayer({
                name: undefined,
                score: undefined
            });
        });
    };

    const join = (): void => {

    };
    
    const host = (info: QuizInfo): void => {

    };

    const start = (): void => {

    };

    return (
        <Context.Provider value={{
            signIn,
            signOut,
            player
        }}>
            {props.children}
        </Context.Provider>
    );
};
//#endregion

export const getGame = () => useContext(Context) as GameContext;
export default GameComponent;
