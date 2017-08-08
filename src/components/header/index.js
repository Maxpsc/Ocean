import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {logout} from 'src/views/authority';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends Component {
    render(){
        return (
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Logout" onTouchTap={this.props.handle} />
            </IconMenu>
        );
    }
};
const NotLogged = () => (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <MenuItem primaryText="Reg" containerElement={<Link to="/reg"></Link>} />
    <MenuItem primaryText="Login" containerElement={<Link to="/Login"></Link>} />
    </IconMenu>
);

class Header extends Component {
    constructor(){
        super();
    }
    render() {
        const { history, logout, identity } = this.props;
        const handleTitleTouch = () => {
            history.push('/');
        };
        const handleLogout = () => {
            if(confirm('Make sure logout?')){
                logout();
            }
        };
        const elemRight = identity === 'guest' ? (<NotLogged />) : (<Logged handle={handleLogout} />);
        return (
            <AppBar
                title="MicroBlog"
                onTitleTouchTap={handleTitleTouch}
                iconElementRight={elemRight}
            />
        );
    }
};

function mapStateToProps(state){
    return {
        identity: state.authorityReducer.identity
    };
}
function mapDispatchToProps(dispatch){
    return {
        logout: bindActionCreators(logout, dispatch)
    };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
