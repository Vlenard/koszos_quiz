import { Component, createSignal } from "solid-js";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { View } from "../View";
import BasicButton from "../../buttons/BasicButton";

const SignIn: Component = () => {

    let inputRef: any;
    const { auth, game } = getGame();
    const { setView } = getLayout();

    const signIn = (ev: MouseEvent): void => {

        ev.preventDefault();

        const name: string = (inputRef as HTMLInputElement).value;
        auth.signIn(name).then(() => {
            if (!game.err) {
                setView(View.MainMenu)
            }
        });
    };

    return (
        <div class="flex-1">
            <div class="flex w-full justify-center p-2">
                <form action="#">
                    <input type="text" ref={inputRef} placeholder="Jenő" class="form-input mr-2" />
                    <BasicButton type="submit" onClick={signIn}>Sign in</BasicButton>
                </form>
            </div>

            <div class="flex w-full justify-center p-2">
                <p>{game.err && game.err.getErrorMessage()}</p>
            </div>
        </div>
    );
};

export default SignIn;