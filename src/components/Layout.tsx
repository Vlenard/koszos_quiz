import { Component, Match, Setter, Switch, createContext, createSignal, useContext } from "solid-js";
import SignIn from "./views/signIn/SignIn";
import { View } from "./views/View";
import MainMenu from "./views/mainMenu/MainMenu";
import MacOSTitlebar from "./Titlebars/MacOSTitlebar";
import Lobby from "./views/lobby/Lobby";
import Settings from "./views/settings/Settings";
import { createStore } from "solid-js/store";

type LayoutContext = {
    setView: (view: View, savePrev?: boolean) => void;
    back: () => void;
};

const layoutContext = createContext<LayoutContext>();

const Layout: Component = () => {

    const [content, setContent] = createStore<{
        current: View;
        prev?: View;
    }>({current: View.SignIn});

    const setView = (view: View, savePrev?: boolean): void => {
        if(savePrev)
            setContent(prev => ({current: view, prev: prev.current}));
        else 
            setContent({current: view});
    };

    const back = (): void => {
        if(content.prev){
            setContent(prev => ({current: prev.prev}));
        }
    };

    return (
        <layoutContext.Provider value={{
            setView,
            back
        }}>
            {true /* if mac*/ ? <MacOSTitlebar /> : null}

            <Switch>
                <Match when={content.current === View.SignIn}>
                    <SignIn />
                </Match>

                <Match when={content.current === View.MainMenu}>
                    <MainMenu />
                </Match>

                <Match when={content.current === View.Lobby}>
                    <Lobby />
                </Match>
                
                <Match when={content.current === View.Settings}>
                    <Settings />
                </Match>
            </Switch>
        </layoutContext.Provider>
    );
};

export const getLayout = () => useContext(layoutContext) as LayoutContext;
export default Layout;