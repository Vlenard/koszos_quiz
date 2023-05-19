import { Component } from "solid-js";
import Titlebar from "./Titlebar";
import { getPreference } from "../preference/Preference";

const DarwinTitlebar: Component = (props) => {

    const pref = getPreference();

    return (
        <Titlebar class="h-7 justify-center items-center">
            <span class="text-xs font-medium text-black dark:text-lightText">{pref.lang()["title"]}</span>
        </Titlebar>
    );
};

export default DarwinTitlebar;