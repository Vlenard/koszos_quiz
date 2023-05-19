import { Component } from "solid-js";
import IconButton from "./IconButton";
import { VsSettingsGear } from 'solid-icons/vs'
import { getPreference } from "../preference/Preference";


const SettingsButton: Component = (props) => {

    const pref = getPreference();
    const onClick = (): void => {
        pref.toggleSettings();
    };

    return (
        <IconButton onClick={onClick} class="px-2">
            <span>{pref.lang()["settings"]}</span>
            <VsSettingsGear size={20}/>
        </IconButton>
    );
}; 

export default SettingsButton;