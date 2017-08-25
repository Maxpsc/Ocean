import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import Dropzone from 'react-dropzone';

import { avatarUrl } from 'src/host';
import { md5 } from 'src/service/auth';
import { login } from 'src/views/authority';
import { uploadAvatar, fetchUpdate } from 'src/service/user';

import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

const dropZoneStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '#00bcd4 dashed 4px',
    borderRadius: 10,
    minWidth: 200,
    width: '25%',
    minHeight: 100,
    height:'12vh',
    padding:10,
    cursor: 'pointer'
};
const h1Style = {
    textAlign:'center',
    fontSize:'1.2rem',
    marginBottom: 4
};
const pStyle = {
    fontSize:'0.9rem'
};
class UserSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username,
            avatar: props.avatar,
            opassword: '',
            npassword: '',
            hint: '',
            btnDisabled: false
        };
        this.setValue = this.setValue.bind(this);
        this.showHint = this.showHint.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    setValue(key) {
        return (val) => {
            let nState = Object.assign({},this.state);
            nState[key] = val;
            this.setState(nState);
        };
    }
    showHint(err){
        this.setState({hint: err, opassword: '',npassword: '', btnDisabled: true});
        setTimeout(() => {
            this.setState({hint: '', opassword: '',npassword: '', btnDisabled: false});
        },2000);
    }
    handleUpload(files) {
        console.log(files);
        uploadAvatar(files[0])
        .then(res => {
            this.setState({avatar: res.items.filename});
        })
        .catch(res => {
            this.showHint(res);
        });
    }
    handleUpdate() {
        const { uid, login } = this.props;
        const { username, avatar, opassword, npassword } = this.state;
        console.log('save',this.state);
        fetchUpdate({
            uid,
            opassword: md5(opassword),
            user:{
                user_name: username,
                avatar,
                password: md5(npassword)
            }
        })
        .then(res => {
            this.showHint(res.items);
            //reset authorityReducer
            login({
                username,
                password: md5(npassword)
            })
        })
        .catch(res => {
            this.showHint(res.items);
        });
    }
    render() {
        const { username, avatar, opassword, npassword, hint, btnDisabled } = this.state;
        const usernameReg = /^\w{3}\w*$/;
        const passwordReg = /^\w{6}\w*$/;
        const usernameValid = usernameReg.test(username);
        const opasswordValid = passwordReg.test(opassword);
        const npasswordValid = passwordReg.test(npassword);

        return (
            <div style={{textAlign:'center'}}>
                <QueueAnim>
                    <img className="avatar-img" src={avatarUrl + avatar} key="avatar"></img>
                    <Dropzone
                        style={dropZoneStyle}
                        multiple={false}
                        accept="image/jpg,image/jpeg,image/png"
                        onDrop={this.handleUpload}
                    >
                        <h1 style={h1Style}>Upload Avatar</h1>
                        <p style={pStyle}>Drop an image or click to select an image to upload.</p>
                        <p style={pStyle}>Support: jpg, jpeg, png</p>
                    </Dropzone>

                    <div key="body">
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
                            hintText="Old Password"
                            labelText="Old Password"
                            value={opassword}
                            required
                            onChange={this.setValue('opassword')}
                        /><br />
                        <MField
                            type="password"
                            hintText="New Password"
                            labelText="New Password"
                            value={npassword}
                            required
                            onChange={this.setValue('npassword')}
                        /><br /><br />
                        <RaisedButton
                            label='Update'
                            primary={true}
                            disabled={!usernameValid || !opasswordValid || !npasswordValid || btnDisabled}
                            onTouchTap={this.handleUpdate}
                        /><span className="submit-hint">{hint}</span>
                    </div>
                </QueueAnim>
            </div>
        );
    }
};

function mapStateToProps(state){
    const { uid, username, avatar, password } = state.authorityReducer;
    return {
        uid,
        username,
        avatar,
        password
    };
}
function mapDispatchToProps(dispatch){
    return {
        login: bindActionCreators(login, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);
