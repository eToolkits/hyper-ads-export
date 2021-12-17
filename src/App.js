import React from "react";
import NavigationBar from "./components/NavigationBar";
import RouterWrapper from "./Router";

const App = () => {
  return (
    <div className="app">
      <NavigationBar />
      <RouterWrapper />
    </div>
  );
};
export default App;
