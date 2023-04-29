import { Component } from "solid-js";
import { ViewContainer } from "../View";
import BasicButton from "../../buttons/BasicButton";
import { getLayout } from "../../Layout";

const Settings: Component = () => {

    const { back } = getLayout();

    const back2Prev = (): void => {
        back();
    };

    return (
        <ViewContainer>
            <div class="flex justify-between p-2">
                <h1 class="text-lg">Settings</h1>
                <BasicButton onClick={back2Prev}>Back</BasicButton>
            </div>
            <hr />

        </ViewContainer>
    );
};

export default Settings;