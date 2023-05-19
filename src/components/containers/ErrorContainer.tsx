import { Accessor, Component } from "solid-js";
import InfoContainer from "./InfoContainer";
import Error from "../../game/errors/Error";

type ErrorContainer = {
    when: Accessor<any>;
    class?: string;
};

const ErrorContainer: Component<ErrorContainer> = (props) => {
    return (
        <InfoContainer when={props.when} class={props.class}>
            <p class="text-red-500">{(props.when() as Error<any>).getError()}</p>
        </InfoContainer>
    );
};

export default ErrorContainer;