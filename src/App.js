import React from "react";
import NavigationBar from "./components/NavigationBar";
import RouterWrapper from "./Router";
const fs = window.require('fs');
const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL
const App = () => {
  try {
    if (!fs.existsSync(TempFolder)) {
      fs.mkdirSync(`${TempFolder}`, { recursive: true });
    }
  } catch (error) {
  }
  console.log("🚀 ~ file: App.js ~ line 6 ~ TempFolder", TempFolder)
  try {
    if (!fs.existsSync(TempFolder)) {
      fs.mkdirSync(`${TempFolder}`, { recursive: true });
    }
  } catch (error) {
  }
  return (
    <div className="app">
      <NavigationBar />
      <RouterWrapper />
    </div>
  );
};
export default App;
