import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, {history} from 'src/redux/configureStore';
import MainApp from 'src/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles/main.min.css';

const store = configureStore();
const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <MainApp />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    app
);

// async function run () {
//     try {
//         await new Promise.reject('sth wrong!');
//     } catch (err) {
//         console.warn(err);
//     }
//
// };
let run = new Promise(function(resolve,reject){
    console.log('this is promise');
    setTimeout(function(){
        resolve();
    },2000);
    // resolve();
});

run
.then( res => console.log(111))
.catch( err => console.log(err));
