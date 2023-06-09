import { Component } from "solid-js";
import "./Spinner.css";

const Spinner: Component = () => {
    return (
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    );
};

export default Spinner;