import { Component } from "solid-js";
import { getGame } from "../../Game";
import { getLayout } from "../../Layout";
import { View } from "../View";
import Header from "../../headers/Header";
import Input from "../../inputs/Input";
import DefaultButton from "../../buttons/DefaultButton";
import "./SignIn.css";

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

    const getRandomImage = (): number => {
        const v = Math.floor(Math.random() * 3);
        console.log(v);
        
        return v;
    }

    return (
        <div class="flex flex-col flex-1 bg-white dark:bg-darkGrey">
            <Header.Bar>
                <Header.Title>
                    Sign in
                </Header.Title>

                <Header.Contents>

                </Header.Contents>
            </Header.Bar>

            <div class="flex flex-1 justify-center items-center">
                <div class="min-h-[500px] min-w-[200px] flex flex-col items-center p-2 rounded-lg border-2 dark:border-grey dark:bg-darkGrey dark:shadow-light-box-shadow">
                    <div class={`bg-grey h-40 w-40 my-5 rounded-full border-2 dark:border-grey bg-center bg-no-repeat profile img-${getRandomImage()}`} />
                    <form action="#" class="flex flex-col justify-center mb-5">
                        <Input ref={inputRef} placeholder="Koszos Kufi" type="text" class="w-72 mb-5"/>
                        <DefaultButton type="submit" onClick={signIn}>Sign in</DefaultButton>
                    </form>
                    <p class="text-red-600">{game.err ? `Error: ${game.err?.getErrorMessage()}` : ""}</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;