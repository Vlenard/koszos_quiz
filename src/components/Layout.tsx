import { Component, Match, Switch, createContext, useContext } from "solid-js";
import { View, ViewContainer } from "./views/View";
import { createStore } from "solid-js/store";
import MainMenu from "./views/mainMenu/MainMenu";
import Game from "./views/game/Game";

type LayoutContext = {
    setView: (view: View, savePrev?: boolean) => void;
    back: () => void;
};

const layoutContext = createContext<LayoutContext>();

const Layout: Component = () => {

    const [content, setContent] = createStore<{
        current: View;
        prev?: View;
    }>({ current: View.MainMenu });

    const setView = (view: View, savePrev?: boolean): void => {
        if (savePrev)
            setContent(prev => ({ current: view, prev: prev.current }));
        else
            setContent({ current: view });

    };

    const back = (): void => {
        if (content.prev)
            setView(content.prev);
    };

    return (
        <layoutContext.Provider value={{
            setView,
            back
        }}>
            <Switch>
                <Match when={content.current === View.MainMenu}>
                    <MainMenu />
                </Match> 

                <Match when={content.current === View.Game}>
                    <Game />
                </Match>
            </Switch>
        </layoutContext.Provider>
    );
};

export const getLayout = () => useContext(layoutContext) as LayoutContext;
export default Layout;