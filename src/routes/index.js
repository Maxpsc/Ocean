import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { UserRoute, AdminRoute } from './private';

import Header from 'src/components/header';
import Footer from 'src/components/footer';
import Home from 'src/views/home';
import Reg from 'src/views/reg';
import Login from 'src/views/login';
import Public from 'src/views/public';
import AdminPosts from 'src/views/posts';
import AdminUsers from 'src/views/users';
import NoMatch from 'src/views/noMatch';

import injectTapEventPlugin from 'react-tap-event-plugin';

class MainApp extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {identity} = this.props;
        return (
            <div>
                <Header />
                    <div className="wrapper">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/reg" component={Reg} />
                            <Route path="/login" component={Login} />
                            {/*
                            <Route path="/public" component={Public} />
                            <Route path="/posts" component={AdminPosts} />
                            <Route path="/users" component={AdminUsers} />
                            */}
                            <UserRoute path="/public" component={Public} identity={identity} />
                            <AdminRoute path="/posts" component={AdminPosts} identity={identity} />
                            <AdminRoute path="/users" component={AdminUsers} identity={identity} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                <Footer />
            </div>
        );
    }
}
injectTapEventPlugin();

function mapStateToProps(state){
    const { identity } = state.authorityReducer;
    return {
        identity
    };
}
export default withRouter(connect(mapStateToProps)(MainApp));
