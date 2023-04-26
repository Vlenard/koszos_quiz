import { ParentComponent, createContext } from "solid-js";

type PreferenceContext = {

};

const Context = createContext<PreferenceContext>();

const Preference: ParentComponent = (props) => {

    return (
        <Context.Provider value={{}}>
            {props.children}
        </Context.Provider>
    );
};

export default Preference;