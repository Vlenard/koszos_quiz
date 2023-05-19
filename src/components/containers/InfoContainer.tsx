import { Accessor, ParentComponent, Show } from "solid-js";

type InfoContainerProps = {
    when: Accessor<any>;
    class?: string;
};

const InfoContainer: ParentComponent<InfoContainerProps> = (props) => {
    return (
        <Show when={props.when()}>
            <div class={`flex justify-center items-center mt-2 p-2 border-t-2 border-lightGrey dark:border-grey ${props.class}`}>
                {props.children}
            </div>
        </Show>
    );
}; 

export default InfoContainer;