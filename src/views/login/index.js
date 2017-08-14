import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../authority';
import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            hint: ''
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
        console.log(this.props);
        let {username,password} = this.state;
        login({username, password},(res) => {
            history.push('/');
        },(res) => {
            this.setState({password: '', hint: res.items});
            setTimeout(() => {
                this.setState({hint:''});
            },2000);
        });
    }
    render() {
        let { username, password, hint } = this.state;
        const usernameReg = /^\w{3}\w*$/;
        const usernameValid = usernameReg.test(username);
        const passwordValid = password !== '';
        return (
            <div className="form-box">
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

function mapDispatchToProps(dispatch) {
    return {
        login:bindActionCreators(login,dispatch)
    };
}
export default withRouter(connect(null,mapDispatchToProps)(Login));
