import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register } from './regRedux';
import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

class Reg extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username,
            password: props.password,
            repassword: props.repassword
        };
        this.setValue = this.setValue.bind(this);
    }
    setValue(key) {
        return (val) => {
            let nState = Object.assign({},this.state);
            nState[key] = val;
            this.setState(nState);
        };
    }
    render() {
        const { username, password, repassword } = this.state;
        const { register } = this.props;
        const submit = () => {
            console.log(this.state);
            console.log('Reg');
            register({
                username,password,repassword
            });
        };
        const usernameReg = /^\w{3}\w*$/;
        const passwordReg = /^\w{6}\w*$/;
        const usernameValid = usernameReg.test(username);
        const passwordValid = passwordReg.test(password);
        const repasswordValid = password === repassword;
        return (
            <div>
                <h1>Reg</h1>
                <MField
                    hintText="Username"
                    labelText="Username"
                    value={username}
                    errorText="should bigger than 3 chars"
                    required
                    match={/^\w{3}\w*$/}
                    onChange={this.setValue('username')}
                /><br />
                <MField
                    type="password"
                    hintText="Password"
                    labelText="Password"
                    value={password}
                    errorText="should bigger than 6 chars"
                    required
                    match={/^\w{6}\w*$/}
                    onChange={this.setValue('password')}
                /><br />
                <MField
                    type="password"
                    hintText="Repassword"
                    labelText="Repassword"
                    value={repassword}
                    errorText="please repeat your password"
                    required
                    match={'='+password}
                    onChange={this.setValue('repassword')}
                /><br />
                <RaisedButton
                    label="JOIN US!"
                    primary={true}
                    disabled={!usernameValid || !passwordValid || !repasswordValid}
                    onTouchTap={submit}
                />
            </div>
        );
    }
};
function mapStateToProps(state) {
    const { username,password,repassword } = state.regReducer;
    return {
        username,
        password,
        repassword
    };
}
function mapDispatchToProps(dispatch) {
    return {
        register:bindActionCreators(register, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reg);
