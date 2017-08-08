import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'src/components/header';
import Footer from 'src/components/footer';
import Home from 'src/views/home';
import Reg from 'src/views/reg';
import Login from 'src/views/login';
import NoMatch from 'src/views/noMatch';

import injectTapEventPlugin from 'react-tap-event-plugin';

class MainApp extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/reg" component={Reg} />
                        <Route path="/login" component={Login} />
                        <Route component={NoMatch} />
                    </Switch>
                <Footer />
            </div>
        );
    }
}
injectTapEventPlugin();

export default MainApp;
