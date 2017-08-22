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
import Post from 'src/views/post';
import AdminPosts from 'src/views/posts';
import AdminUsers from 'src/views/users';
import UserSetting from 'src/views/userSetting';
import UserPosts from 'src/views/userPosts';
import NoMatch from 'src/views/noMatch';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';

class MainApp extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { identity, style } = this.props;
        console.log(style);
        let curTheme = style === 'light' ? getMuiTheme(lightBaseTheme) : getMuiTheme(darkBaseTheme);
        console.log(curTheme);
        return (
            <MuiThemeProvider muiTheme={curTheme}>
                <div>
                    <Header />
                        <Paper>
                        <div className="wrapper">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/reg" component={Reg} />
                                <Route path="/login" component={Login} />
                                <Route path="/post" component={Post} />
                                {/*
                                <Route path="/public" component={Public} />
                                <Route path="/posts" component={AdminPosts} />
                                <Route path="/users" component={AdminUsers} />
                                */}
                                <UserRoute path="/public" component={Public} identity={identity} />
                                <UserRoute path="/usersetting" component={UserSetting} identity={identity} />
                                <UserRoute path="/userposts" component={UserPosts} identity={identity} />

                                <AdminRoute path="/posts" component={AdminPosts} identity={identity} />
                                <AdminRoute path="/users" component={AdminUsers} identity={identity} />

                                <Route component={NoMatch} />
                            </Switch>
                        </div>
                        </Paper>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}
injectTapEventPlugin();

function mapStateToProps(state){
    const { identity } = state.authorityReducer;
    const { style } = state.styleReducer;
    return {
        identity,
        style
    };
}
export default withRouter(connect(mapStateToProps)(MainApp));
