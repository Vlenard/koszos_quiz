import { Accessor, Component } from "solid-js";
import Header from "../../headers/Header";
import Input from "../../inputs/Input";
import DefaultButton from "../../buttons/DefaultButton";
import "./SignIn.css";
import AuthError from "../../../game/errors/AuthError";
import SettingsButton from "../../buttons/SettingsButton";
import { getPreference } from "../../preference/Preference";
import Spinner from "../../loading/Spinner";
import ErrorContainer from "../../containers/ErrorContainer";
import Error from "../../../game/errors/Error";


type SignInProps = {
    ref: any;
    signIn: (ev: MouseEvent) => void;
    error: Accessor<Error<AuthError> | undefined>;
    loading: Accessor<boolean>;
};

const SignIn: Component<SignInProps> = (props) => {

    const pref = getPreference();
    const getRandomImage = (): number => {
        const index = Math.floor(Math.random() * 3);
        return index;
    }

    return (
        <div class="absolute w-full h-full flex flex-col justify-center bg-white dark:bg-darkGrey">
            <Header.Bar>
                <Header.Title>
                    {pref.lang()["signIn"]}
                </Header.Title>

                <Header.Contents>
                    <SettingsButton />
                </Header.Contents>
            </Header.Bar>
 

            <div class="flex flex-1 justify-center items-center">
                <div class="min-h-[500px] min-w-[200px] flex flex-col items-center p-2 rounded-lg border-2 dark:border-grey dark:bg-darkGrey shadow-dark dark:shadow-light">
                    <div class={`bg-grey h-40 w-40 my-5 rounded-full border-2 dark:border-grey bg-center bg-no-repeat profile img-${getRandomImage()}`} />
                    <form action="#" class="flex flex-col justify-center mb-5">
                        <Input ref={props.ref} placeholder="Koszos Kufi" type="text" class="w-72 mb-5"/>
                        <DefaultButton type="submit" onClick={props.signIn}>{pref.lang()["signIn"]}</DefaultButton>
                    </form>
                    <p class="text-black dark:text-lightGrey">{props.loading() && (<Spinner />)}</p>
                    <ErrorContainer when={props.error} class="border-b-2"/>
                </div>
            </div>
        </div>
    );
};

export default SignIn;