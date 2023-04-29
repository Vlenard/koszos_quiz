import { ParentComponent } from "solid-js";

type BasicButtonProps = {
    onClick?: (ev: MouseEvent) => void;
    class?: string;
};

const BasicButton: ParentComponent<BasicButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} class={`"py-1 px-2 hover:bg-slate-300 rounded-lg ${props.class}`}>
            {props.children}
        </button>
    );
};

export default BasicButton;