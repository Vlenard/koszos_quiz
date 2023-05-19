import { ParentComponent } from "solid-js";

type BasicButtonProps = {
    selected?: boolean;
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    type?: "submit" | "reset" | "button" | undefined;
};

const BasicButton: ParentComponent<BasicButtonProps> = (props) => {
    return (
        <button 
            type={props.type} 
            onClick={props.onClick} 
            aria-selected={props.selected}
            class={`rounded-full bg-white dark:bg-darkGrey 
              hover:bg-lightGrey hover:dark:bg-grey text-black dark:text-lightText
                focus:outline-0 focus:outline-none focus:shadow-light
              aria-selected:bg-fblue aria-selected:text-white aria-selected:dark:bg-fblue aria-selected:dark:text-white ${props.class}`}>
            {props.children}
        </button>
    );
};

export default BasicButton;