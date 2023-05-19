import { Component } from "solid-js";
import "@thisbeyond/solid-select/style.css";
import "./Select.css";
import { Select } from "@thisbeyond/solid-select";
import { getPreference } from "../preference/Preference";

export type LangOption = {
    name: string;
    label: string;
};

type LangSelectProps = {
    onChange: (value: LangOption) => void;
};

const LangSelect: Component<LangSelectProps> = (props) => {

    const pref = getPreference();
    const options: Array<LangOption> = [
        {name: "hu", label: "Magyar"},
        {name: "en", label: "English"}
    ];

    const format = (item: LangOption, type: "option" | "value"): string => item.label;

    const getCurrent = (): LangOption => {
        return options.filter(item => {
            if(item.name === pref.language()){
                return item;
            }
        })[0];
    };

    return (
        <Select class="custom-select" initialValue={getCurrent()} format={format} options={options} onChange={props.onChange}/>
    );
};

export default LangSelect;