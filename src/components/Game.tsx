import {  ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { GameData } from "../game/types/GameData";
import GameManager from "../game/GameManager";
import { QuizInfo } from "../game/types/QuizData";
import { PlayerData } from "../game/types/PlayerData";
import Error from "../game/errors/Error";
import UpdateEvent from "../game/types/UpdateEvent";

//#region types
type GameContext = {
    auth: {
        signIn: (hostname: string) => Promise<void>;
        signOut: () => Promise<boolean>;
    };
    game: {
        data?: GameData;
        id?: string;
        err?: Error<any>;
    };
    connection: {
        create: (info: QuizInfo) => Promise<void>;
        exit: (destroy?: boolean) => Promise<void>;
        join: (id: string) => Promise<void>;
    };
    localPlayer: PlayerData;
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
        err?: Error<any>;
    }>({});
    const [localPlayer, setLocalPlayer] = createStore<PlayerData>({} as PlayerData);

    const onGameDataChanged: UpdateEvent = (update, id): void => {
        if(update.err){
            setGame({
                err: update.err
            });
        }else{
            setGame({
                data: update.data,
                id: id
            });
        }
    };

    const auth = {
        signIn: async (name: string): Promise<void> => {
            const player = await GameManager.auth.signIn(name);
            setLocalPlayer(player as PlayerData);
        },
    
        signOut: async (): Promise<boolean> => {
            return await GameManager.auth.signOut();
        }
    };

    const connection = {

        exit: async (destroy?: boolean): Promise<void> => {
            await GameManager.game.exit(destroy);
            setGame({});
        },

        create: async (info: QuizInfo): Promise<void> => {
            const data: GameData = {...game.data};
            data.quizInfo = info;
            data.host = localPlayer;
            data.state = 0;
            await GameManager.game.create(data, onGameDataChanged);
        },

        join: async (id: string): Promise<void> => {
            const joinResult = await GameManager.game.join(id, onGameDataChanged);
            onGameDataChanged(joinResult, id); 
        }
    };

    return (
        <gameContext.Provider value={{
            auth,
            connection,
            game,
            localPlayer
        }}>
            {props.children}
        </gameContext.Provider>
    );
};
//#endregion

export const getGame = () => useContext(gameContext) as GameContext;
export default Game;
