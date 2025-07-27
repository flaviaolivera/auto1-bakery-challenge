// client/src/App.js

import React from "react";
import "./App.css";
import { Button } from "./components/common/buttons/Button";
import { IconButton } from "./components/common/buttons/IconButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bakery</h1>
      </header>

<Button variant="gradient-blue" label="Order" disabled />  // Bootstrap disabled
<IconButton icon="FiPlus" disabled />   
    </div>
  );
}

export default App;