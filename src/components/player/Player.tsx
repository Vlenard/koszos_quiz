import { Accessor, ParentComponent, Show, batch, createContext, createSignal, useContext } from "solid-js";
import { Transition } from "solid-transition-group";
import SignIn from "./signIn/SignIn";
import "./Player.css";
import AuthError from "../../game/errors/AuthError";
import Error from "../../game/errors/Error";
import koszosQuiz from "../../koszosQuiz/KoszosQuiz";
import Layout from "../Layout";

type PlayerContext = {
    name: Accessor<string>;
    authed: Accessor<boolean>;
    signIn: (ev: MouseEvent) => void;
    signOut: () => void;
};

const playerCTX = createContext<PlayerContext>();

const Player: ParentComponent = (props) => {

    let inputRef: any;
    const [name, setName] = createSignal<string>(koszosQuiz.auth.getPlayer()?.name as string);
    const [authed, setAuthed] = createSignal<boolean>(koszosQuiz.auth.getPlayer() !== undefined);
    const [loading, setLoading] = createSignal<boolean>(false);
    const [error, setError] = createSignal<Error<AuthError>>();

    const signIn = (ev: MouseEvent): void => {
        const input: string = (inputRef as HTMLInputElement).value;

        ev.preventDefault();
        batch((): void => {
            setLoading(true);
            setError();
        });
        koszosQuiz.auth.signIn(input).then((err) => {
            batch((): void => {
                if (err) {
                    setError(err);
                } else {
                    setName(input);
                    setAuthed(true);
                }
                setLoading(false);
            });
        });
    };

    const signOut = (): void => {
        batch((): void => {
            setError();
            setName("");
            setAuthed(false);
        });
        koszosQuiz.auth.signOut();
    };

    return (
        <playerCTX.Provider value={{
            name,
            authed,
            signIn,
            signOut
        }}>
            <div class="relative flex flex-1">
                <Transition name="player-sign-in">
                    {!authed() && (
                        <SignIn loading={loading} error={error} signIn={signIn} ref={inputRef} />
                    )}
                </Transition>

                <Show when={authed()}>
                    {props.children}
                </Show>
            </div>
        </playerCTX.Provider>
    );
};

export const getPlayer = () => useContext(playerCTX) as PlayerContext;
export default Player;