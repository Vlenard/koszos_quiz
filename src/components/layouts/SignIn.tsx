import { Component, createSignal } from "solid-js";
import { getGame } from "../Cloud";
import { getLayout } from "../Layout";
import { View } from "./View";

const SignIn: Component = () => {

    let inputRef: any;
    const [messsage, setMessage] = createSignal<string>("");
    const { signIn } = getGame();
    const { setContent } = getLayout();

    const onClick = (): void => {
        const name: string = (inputRef as HTMLInputElement).value;
        if (name !== "") { 
            setMessage("loading...");
            signIn(name).then(player => setContent(View.MainMenu)); 
        } else {
            setMessage("Name is required");
        }
    };

    return (
        <div class="flex-1">
            <input type="text" ref={inputRef} placeholder="Jenő" class="form-input"/>
            <button onClick={onClick}>Sign in</button>
            <p>{messsage()}</p>
        </div>
    );
};

export default SignIn;