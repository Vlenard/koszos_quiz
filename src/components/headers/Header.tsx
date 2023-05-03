import { ParentComponent } from "solid-js";

const Contents: ParentComponent = (props) => {
    return (
        <div class="flex w-max">
            {props.children}
        </div>
    );
};

const Title: ParentComponent = (props) => {
    return (
        <h1 class="font-bold dark:text-lightText">{props.children}</h1>
    );
};

const Bar: ParentComponent = (props) => {
    return (
        <div class="flex justify-between p-2 border-b-2 dark:border-grey dark:shadow-light-box-shadow">
            {props.children}
        </div>
    )
};

export default {
    Bar,
    Title, 
    Contents
}