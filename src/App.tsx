import { Component } from "solid-js";
import Preference from "./components/Preference";
import Layout from "./components/Layout";
import GameComponent from "./components/Game";

const App: Component = () => {
  return (
    <Preference>
      <GameComponent>
        <Layout />
      </GameComponent>
    </Preference>
  );
};

export default App;
