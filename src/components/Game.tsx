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
        player?: PlayerData;
        data?: GameData;
        id?: string;
        err?: Error<any>;
    };
    connection: {
        create: (info: QuizInfo) => Promise<void>;
        exit: (destroy?: boolean) => Promise<void>;
        join: (id: string) => Promise<void>;
    };
};
//#endregion

//#region Context and fetch methods
const gameContext = createContext<GameContext>();
//#endregion

//#region Component
/**
 * @author Varadi
 * @description Generates a context to share game manager functions for child components
 * @param props Child components
 * @returns Return Game context
 */
const Game: ParentComponent = (props) => {

    const [game, setGame] = createStore<{
        data?: GameData;
        id?: string;
        err?: Error<any>;
        player?: PlayerData;
    }>({});

    /**
     * @author Varadi
     * @description Updating game store or set an error
     * @param {UpdateEvent} update The update data or the error message
     * @param {string} id Id of the game
     */
    const onGameDataChanged: UpdateEvent = (update, id): void => {
        if(update.err){
            setGame({
                data: undefined,
                id: undefined,
                err: update.err
            });
        }else{
            setGame({
                data: update.data,
                id: id,
                err: undefined
            });
        }
    };

    const auth = {
        /**
         * @author Varadi
         * @description Calling a sign in method from game manager which try to sign into firebase. 
         * After sign in load player data into game store
         * @param {string} name Name of the player which will displayed in the game
         */
        signIn: async (name: string): Promise<void> => {
            const player = await GameManager.auth.signIn(name);
            if(player.err){
                setGame({
                    player: undefined,
                    err: player.err,
                    data: undefined,
                    id: undefined
                });
            }else {
                setGame({
                    player: player.data,
                    err: undefined,
                    data: undefined,
                    id: undefined
                });
            }
        },
    
        /**
         * @author Varadi
         * @description Calling a sign out function from game maneger which sign out 
         * from firebase and set game store to an empty object
         * @returns {Promise<boolean>} If sign out was successfull then will return true 
         */
        signOut: async (): Promise<boolean> => {

            const signOuted = await GameManager.auth.signOut();

            setGame({
                data: undefined,
                err: undefined,
                id: undefined,
                player: undefined
            });
            
            return signOuted;
        }
    };

    const connection = {
        /**
         * @author Varadi
         * @description Quit from game. If you are the host the game will be destroyed, after you quit, otherwise you just exit
         * @param {boolean} destroy Recommended expression destroy Local player UID === Host player UID
         */
        exit: async (destroy?: boolean): Promise<void> => {
            await GameManager.game.exit(destroy);
        },

        /**
         * @author Varadi
         * @description Preparing the data to upload to firestore, registrate the update event to updating data in game store
         * @param {QuizInfo} info Info from quiz list
         */
        create: async (info: QuizInfo): Promise<void> => {
            const data: GameData = {...game.data};
            data.quizInfo = info;
            data.host = game.player;
            data.players = [game.player as PlayerData];
            data.state = 0;
            await GameManager.game.create(data, onGameDataChanged);
        },

        /**
         * @author Varadi
         * @description Try to join to a game by id param, registrate and call the update event to updating data in game store
         * @param {string} id Id of the game
         */
        join: async (id: string): Promise<void> => {
            const joinResult = await GameManager.game.join(id, onGameDataChanged);
            onGameDataChanged(joinResult, id); 
        }
    };

    return (
        <gameContext.Provider value={{
            auth,
            connection,
            game
        }}>
            {props.children}
        </gameContext.Provider>
    );
};
//#endregion

/**
 * @returns {GameContext} Return the context of the game
 */
export const getGame = () => useContext(gameContext) as GameContext;
export default Game;
