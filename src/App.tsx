import { Component } from "solid-js";
import Preference from "./components/Preference";
import Game from "./components/Game";
import Layout from "./components/Layout";

const App: Component = () => {
  return (
    <Preference>
      <Game>
        <Layout />
      </Game>
    </Preference>
  );
};

export default App;
