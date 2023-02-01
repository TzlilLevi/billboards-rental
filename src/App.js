import React, { useState } from "react";
import "./App.css";
import BillboardsContainer from "./components/BillboardsContainer";
import { version } from "react";

import "react-sliding-pane/dist/react-sliding-pane.css";

function App() {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const openSearch = () => {
    setState({ isPaneOpen: true });
  };

  return (
    <div className="App">
      <BillboardsContainer />
    </div>
  );
}

export default App;
