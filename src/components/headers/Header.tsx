import { ParentComponent } from "solid-js";

const Contents: ParentComponent = (props) => {
    return (
        <div class="flex w-auto space-x-2">
            {props.children}
        </div>
    );
};

const Title: ParentComponent = (props) => {
    return (
        <span class="font-bold dark:text-lightText">{props.children}</span>
    );
};

const Bar: ParentComponent = (props) => {
    return (
        <div class="flex justify-between items-center p-2 border-b-2 dark:border-grey shadow-dark dark:shadow-light">
            {props.children}
        </div>
    )
};

export default {
    Bar,
    Title, 
    Contents
}