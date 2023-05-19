import { Component } from "solid-js";
import { QuizInfo } from "../../game/types/QuizData";
import DefaultButton from "../buttons/DefaultButton";
import { getPreference } from "../preference/Preference";

const QuizInfoContainer: Component<QuizInfo> = (props) => {
    
    const pref = getPreference();

    return (
        <div class="min-w-[500px] w-[40rem] mt-10 p-2 border-2 rounded-lg border-lightGrey dark:border-grey">
            <div class="pb-2 mb-2 border-b-2 border-lightGrey dark:border-grey text-lg text-black dark:text-lightText">
                {props.name}
            </div>

            <div class="pb-2 mb-2  text-black dark:text-lightText">
                {props.des}
            </div>

            <div class="flex justify-between items-center text-black dark:text-lightText">
                <span>{pref.lang()["max"]}: {props.max}</span>
                <DefaultButton class="px-4 py-1">Play</DefaultButton>
            </div>
        </div>
    );
};

export default QuizInfoContainer;