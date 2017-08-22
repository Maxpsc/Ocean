import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, {history} from 'src/redux/configureStore';
import MainApp from 'src/routes';

import './styles/main.min.css';

const store = configureStore();
const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MainApp />
        </ConnectedRouter>
    </Provider>,
    app
);
