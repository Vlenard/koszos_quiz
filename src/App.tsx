import { Component } from "solid-js";
import Preference from "./components/preference/Preference";
import Player from "./components/player/Player";
import Layout from "./components/Layout";

const App: Component = () => {
  return (
    <Preference>
      <Player>
        <Layout />
      </Player>
    </Preference>
  );
};

export default App;
