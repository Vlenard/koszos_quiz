import { ParentComponent } from "solid-js";

type DefaultButtonProps = {
    onClick?: (ev: MouseEvent) => void;
    class?: string;
    type?: "submit" | "reset" | "button" | undefined;
};

const DefaultButton: ParentComponent<DefaultButtonProps> = (props) => {
    return (
        <button
            type={props.type} 
            onClick={props.onClick} 
            class={`p-2 rounded-full bg-fblue hover:bg-hfblue text-white focus:outline-0 focus:outline-none focus:shadow-light transition-all duration-300 ${props.class}`}>
            {props.children}
        </button>
    );
};

export default DefaultButton;