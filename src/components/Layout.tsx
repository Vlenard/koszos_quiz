import { Component, JSX, Match, Setter, Switch, createContext, createSignal, useContext } from "solid-js";
import SignIn from "./layouts/SignIn";
import { View } from "./layouts/View";
import MainMenu from "./layouts/MainMenu";
import MacOSTitlebar from "./Titlebars/MacOSTitlebar";

type LayoutContext = {
    setContent: Setter<View>
};

const layoutContext = createContext<LayoutContext>();

const Layout: Component = () => {

    const [content, setContent] = createSignal<View>(View.SignIn);

    return (
        <layoutContext.Provider value={{
            setContent
        }}>
            {true /* if mac*/ ? <MacOSTitlebar /> : null}
            <Switch>
                <Match when={content() === View.SignIn}>
                    <SignIn />
                </Match>

                <Match when={content() === View.MainMenu}>
                    <MainMenu />
                </Match>
            </Switch>
        </layoutContext.Provider>
    );
};

export const getLayout = () => useContext(layoutContext) as LayoutContext;
export default Layout;