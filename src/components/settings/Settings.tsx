import { Component } from "solid-js";
import { getPreference } from "../preference/Preference";
import IconButton from "../buttons/IconButton";
import { AiOutlineArrowRight } from "solid-icons/ai";
import Theme from "../types/Theme";
import { FiSun, FiMoon } from "solid-icons/fi";
import LangSelect, { LangOption } from "../selects/LangSelect";
import Lang from "../types/Lang";

const Settings: Component = () => {

    const pref = getPreference();

    const close = (): void => {
        pref.toggleSettings();
    };

    const onChange = (value: LangOption): void => {
        const nlang: Lang = value.name as Lang;
        if (nlang !== pref.language()) {
            pref.setLanguage(nlang);
        }
    };

    return (
        <div class="absolute left-full -translate-x-full h-[85%] top-[15%] w-52 z-50 flex">
            <div class="flex flex-col flex-1 p-2 border-l-2 border-t-2 rounded-lg border-lightGrey dark:border-grey shadow-dark dark:shadow-light bg-white dark:bg-darkGrey">
                <div class="border-b-2 mb-2 border-lightGrey dark:border-grey">
                    <IconButton onClick={close} class="px-2 mb-2 w-max">
                        <span>{pref.lang()["settings"]}</span>
                        <AiOutlineArrowRight />
                    </IconButton>
                </div>

                <IconButton onClick={pref.toggleTheme} class="p-2 mb-2 justify-center w-full border-2 border-lightGrey dark:border-grey">
                    <span>{pref.lang()["theme"]}</span>
                    {pref.theme() === Theme.Dark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </IconButton>

                <LangSelect onChange={onChange} />
            </div>
        </div>
    );
};

export default Settings;