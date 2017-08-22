import React, {Component} from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import { fetchReg, md5 } from 'src/service/auth';
import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

export default class UserSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
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
        const { username, password, repassword } = this.state;
        fetchReg({
            username,
            'password': md5(password),
            'repassword': md5(repassword),
            'identity':'user'
        })
        .then(res => {
            this.setState({password:'',repassword:'',hint:res.items});
        })
        .catch(res => {
            this.setState({password:'',repassword:'',hint:res.items});
        });
        setTimeout(() => {
            this.setState({hint:''});
        },2000);
    }
    render() {
        const { username, password, repassword, hint } = this.state;
        const usernameReg = /^\w{3}\w*$/;
        const passwordReg = /^\w{6}\w*$/;
        const usernameValid = usernameReg.test(username);
        const passwordValid = passwordReg.test(password);
        const repasswordValid = password === repassword;
        return (
            <div className="form-box">
                <QueueAnim>
                    <h1 key="title">Reg</h1>
                    <div key="body">
                        <MField
                            hintText="Username"
                            labelText="Username"
                            value={username}
                            errorText="should more than 3 chars"
                            required
                            match={/^\w{3}\w*$/}
                            onChange={this.setValue('username')}
                        /><br />
                        <MField
                            type="password"
                            hintText="Password"
                            labelText="Password"
                            value={password}
                            errorText="should more than 6 chars"
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
                        /><br /><br />
                        <RaisedButton
                            label="JOIN US!"
                            primary={true}
                            disabled={!usernameValid || !passwordValid || !repasswordValid}
                            onTouchTap={this.handleSubmit}
                        /><span className="submit-hint">{hint}</span>
                    </div>
                </QueueAnim>
            </div>
        );
    }
};
