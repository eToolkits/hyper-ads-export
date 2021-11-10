import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ChakraProvider } from "@chakra-ui/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducer';

import './index.css'
import App from './App'

const store = createStore(rootReducer);
const history = createBrowserHistory();

ReactDOM.render(
    <HashRouter history={history}>
        <Provider store={store}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </HashRouter>
    , document.getElementById('root'))
