import { JSX, ParentComponent } from "solid-js";

type BasicButtonProps = {
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    type?: "submit" | "reset" | "button" | undefined;
};

const BasicButton: ParentComponent<BasicButtonProps> = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} class={`"py-1 px-2 hover:bg-slate-300 rounded-lg ${props.class}`}>
            {props.children}
        </button>
    );
};

export default BasicButton;