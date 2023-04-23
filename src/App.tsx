import { Component } from "solid-js";
import Preference from "./components/Preference";
import Cloud from "./components/Cloud";
import Layout from "./components/Layout";

const App: Component = () => {
  return (
    <Cloud>
      <Preference>
        <Layout />
      </Preference>
    </Cloud>
  );
};

export default App;
