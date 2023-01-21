import React from "react";
import "./App.css";
import BillboardsMap from "./components/BillboardsMap";
import { version } from "react";

function App() {
  console.log(version);
  return (
    <div className="App">
      <BillboardsMap />
    </div>
  );
}

export default App;
