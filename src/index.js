import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import rootReducer from "./reducer";
import theme from "./Theme";

const store = createStore(rootReducer);
const history = createBrowserHistory();

ReactDOM.render(
  <HashRouter history={history}>
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </ChakraProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
