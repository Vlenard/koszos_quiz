import { ParentComponent } from "solid-js";

type IconButtonProps = {
    class?: string
    onClick?: (ev: MouseEvent) => void;
};

const IconButton: ParentComponent<IconButtonProps> = (props) => {
    return (
        <button
            onclick={props.onClick}
            class={`flex space-x-2 p-1 items-center rounded-full bg-transparent dark:text-lightText hover:bg-lightGrey hover:dark:bg-grey ${props.class}`}>
            {props.children}
        </button>
    );
};

export default IconButton;