import { Component, For, createContext } from "solid-js";
import { getGame } from "./Game";

type LayoutContext = {

};

const Context = createContext<LayoutContext>();

const Layout: Component = () => {

    const { signIn, player, signOut } = getGame();

    return (
        <Context.Provider value={{

        }}>
            {player.name ? (
                <div>
                    <p>{player.name}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => signIn("Jenő")}>Sign in</button>
                </div>
            )}
        </Context.Provider>
    );
};

export default Layout;