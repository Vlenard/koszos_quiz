import { Component, ParentComponent } from "solid-js";

type InputProps = {
    ref: any;
    placeholder?: string;
    type?: string;
    class?: string;
};

const Input: Component<InputProps> = (props) => {
    return (
        <input
            ref={props.ref}
            placeholder={props.placeholder} 
            type={props.type}  
            class={`outline-none p-2 px-4 rounded-full
                dark:bg-darkGrey hover:dark:bg-grey border-2 dark:border-grey 
                text-black dark:text-lightText
                focus:shadow-md transition-all duration-300 ${props.class}`}/>
    );
};

export default Input;