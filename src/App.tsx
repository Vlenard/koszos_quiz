import { Component } from "solid-js";
import Preference from "./components/Preference";
import Cloud from "./components/Cloud";
import Layout from "./components/Layout";

const App: Component = () => {
  return (
    <Preference>
      <Cloud>
        <Layout />
      </Cloud>
    </Preference>
  );
};

export default App;
