import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {logout} from 'src/views/authority';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';

class UserLogged extends Component {
    render() {
        return (
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <MenuItem primaryText="Public" containerElement={<Link to="/public"></Link>} />
            <MenuItem primaryText="Logout" onTouchTap={this.props.handle} />
            </IconMenu>
        );
    }
};
class AdminLogged extends Component {
    render() {
        return (
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <MenuItem primaryText="Posts" containerElement={<Link to="/posts"></Link>} />
            <MenuItem primaryText="Users" containerElement={<Link to="/users"></Link>} />
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
    <MenuItem primaryText="Login" containerElement={<Link to="/login"></Link>} />
    </IconMenu>
);

class Header extends Component {
    constructor(){
        super();
        this.state = {
            drawer: false,
            dialog: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    toggleDrawer() {
        this.setState({drawer:!this.state.drawer});
    }
    showDialog() {
        this.setState({dialog: true});
    }
    hideDialog() {
        this.setState({dialog: false});
    }
    handleLogout() {
        const { history, logout } = this.props;
        logout();
        this.hideDialog();
        history.push('/');
    }
    render() {
        const { history, identity } = this.props;
        const { drawer } = this.state;
        const handleTitleTouch = () => {
            history.push('/');
        };
        let elemRight;
        switch(identity){
            case 'user':
                elemRight = (<UserLogged handle={this.showDialog} />);break;
            case 'admin':
                elemRight = (<AdminLogged handle={this.showDialog} />);break;
            default:
                elemRight = (<NotLogged />);break;
        }
        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.hideDialog}
            />,
            <FlatButton
                label="Logout"
                primary={true}
                onTouchTap={this.handleLogout}
            />
        ];
        return (
            <div>
                <AppBar
                    title="MicroBlog"
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                    onTitleTouchTap={handleTitleTouch}
                    iconElementRight={elemRight}
                />
            <Drawer open={drawer} openSecondary={true}>
                drawer
            </Drawer>
            <Dialog
              actions={dialogActions}
              modal={true}
              open={this.state.dialog}
              onRequestClose={this.hideDialog}
            >
              Make sure to logout?
            </Dialog>
            </div>
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
