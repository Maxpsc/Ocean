import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../authority';
// import { loginSuccess } from './loginRedux';

import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username,
            password: props.password
        };
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setValue(key) {
        return (val) => {
            let nState = Object.assign({},this.state);
            nState[key] = val;
            this.setState(nState);
        };
    }
    handleSubmit() {
        let {history,login} = this.props;
        let {username,password} = this.state;
        login({username, password},() => {
            history.push('/');
        },() => {
            this.setState({password:''});
        });
    }
    render() {
        let {hint} = this.props;
        let {username,password} = this.state;
        const usernameReg = /^\w{3}\w*$/;
        const usernameValid = usernameReg.test(username);
        const passwordValid = password !== '';
        return (
            <div className="login-box">
                <h1>Login</h1>
                <MField
                    hintText="Username"
                    labelText="Username"
                    value={username}
                    errorText="should more than 3 chars"
                    required
                    match={usernameReg}
                    onChange={this.setValue('username')}
                /><br />
                <MField
                    type="password"
                    hintText="Password"
                    labelText="Password"
                    value={password}
                    required
                    onChange={this.setValue('password')}
                /><br /><br />
                <RaisedButton
                    label='Login'
                    primary={true} disabled={!usernameValid || !passwordValid}
                    onTouchTap={this.handleSubmit}
                /><span className="submit-hint">{hint}</span>
            </div>
        );
    }
};
function mapStateToProps(state) {
    const {username,password,logining,hint} = state.loginReducer;
    return {
        username,
        password,
        logining,
        hint
    };
}
function mapDispatchToProps(dispatch) {
    return {
        login:bindActionCreators(login,dispatch)
        // loginSuccess:bindActionCreators(loginSuccess,dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
