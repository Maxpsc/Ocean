import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Banner extends Component{
    constructor(props) {
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
    }
    handleRoute (nextRoute='') {
        let {history} = this.props;
        history.push(nextRoute);
    }
    render() {
        const {user} = this.props;
        const style = {
            marginLeft: 12,
            marginRight: 12
        };
        let subTitle;
        if(user.identity === 'guest'){
            subTitle = (
                <h2>
                    <RaisedButton label="Join us" secondary={true} style={style}
                        onTouchTap={this.handleRoute.bind(null, '/reg')}
                    />
                    or
                    <RaisedButton label="Login" style={style}
                        onTouchTap={this.handleRoute.bind(null, '/login')}
                    />
            </h2>
            );
        }else{
            subTitle = (<h2>Have a nice day! {user.username}</h2>);
        }
        return (
            <div className="banner">
                <h1>Welcome to MicroBlog!</h1>
                {subTitle}
            </div>
        );
    }
};
