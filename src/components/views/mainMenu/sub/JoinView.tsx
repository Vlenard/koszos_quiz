import { Component, Show, batch, createSignal } from "solid-js";
import Input from "../../../inputs/Input";
import DefaultButton from "../../../buttons/DefaultButton";
import { getPreference } from "../../../preference/Preference";
import Error from "../../../../game/errors/Error";
import InfoContainer from "../../../containers/InfoContainer";
import Spinner from "../../../loading/Spinner";
import koszosQuiz from "../../../../koszosQuiz/KoszosQuiz";
import { getLayout } from "../../../Layout";
import { View } from "../../View";
import ErrorContainer from "../../../containers/ErrorContainer";

const Join: Component = () => {

    let input_ref: any;
    const pref = getPreference();
    const layout = getLayout();
    const [loading, setLoading] = createSignal<boolean>(false);
    const [error, setError] = createSignal<Error<any>>();

    const join = () => {
        const input: string = (input_ref as HTMLInputElement).value;
        koszosQuiz.game.join(input).then(err => {
            if(err){
                batch((): void => {
                    setLoading(false);
                    setError(err);
                });
            }else{
                layout.setView(View.Game, true);
            }
        });
    };

    return (
        <div class="flex flex-1 justify-center items-start p-10">
            <div class="min-w-[500px] w-[40rem] h-auto p-2 border-2 rounded-lg border-lightGrey dark:border-grey">
                <div class="flex justify-between items-center space-x-2">
                    <span class="text-lg text-black dark:text-lightText">Game Id</span>
                    <Input ref={input_ref} />
                    <DefaultButton onClick={join} class="px-3 py-1">
                        Join
                    </DefaultButton>
                </div>

                <InfoContainer when={loading} class="pb-0">
                    <Spinner />
                </InfoContainer>

                <ErrorContainer when={error} class="pb-0" />
            </div>
        </div>
    );
};

export default Join;