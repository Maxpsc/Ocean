import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { changeStyle } from 'src/redux/styleReducer';
import { avatarUrl } from 'src/host';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
        this.toggleStyle = this.toggleStyle.bind(this);
    }
    handleRoute(url){
        const { history, handleHide } = this.props;
        handleHide();
        history.push(url);
    }
    toggleStyle(){
        const { history, style, changeStyle } = this.props;
        let target = style === 'light' ? 'dark' : 'light';
        changeStyle(target);
        history.push(history.location.pathname);
    }
    render(){
        const { history, uid, username, avatar, password, identity } = this.props;
        return (
            <div className="sideBar">
                {
                    (username && uid) ?
                    <div>
                        <h5>
                            Identity: {identity}
                        </h5>
                        <div className="avatar-box">
                            <img src={avatarUrl + avatar} title={username}></img>
                            <h1>{username}</h1>
                            <h3>uid: {uid}</h3>
                        </div>
                        <List>
                            <ListItem
                                primaryText="User Settings"
                                onClick={this.handleRoute.bind(null,'/usersetting')}
                             />
                            <ListItem
                                primaryText="User Posts"
                                onClick={this.handleRoute.bind(null,'/userposts')}
                            />
                            <Divider />
                            <ListItem
                                primaryText="Light on"
                                rightToggle={<Toggle />}
                                onClick={this.toggleStyle}
                            />
                        </List>
                    </div> :
                    <div>
                        <h5>Your are a guest now, please login.</h5>
                        <List>
                            <ListItem
                                primaryText="Light on"
                                rightToggle={<Toggle />}
                                onClick={this.toggleStyle}
                            />
                        </List>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        style: state.styleReducer.style
    };
}

function mapDispatchToProps(dispatch){
    return {
        changeStyle: bindActionCreators(changeStyle, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
