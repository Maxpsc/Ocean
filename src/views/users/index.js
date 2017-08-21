import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUsers, deleteUser, editingUser, saveEditUser } from './usersRedux';
import MTable from 'src/components/shared/MTable';
import MField from 'src/components/shared/MField';

class AdminUsers extends Component {
    constructor(props){
        super(props);
        this.beginEdit = this.beginEdit.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    beginEdit(index) {
        const { editingUser, users } = this.props;
        editingUser(users[index]);
    }
    setValue(key) {
        return (val) => {
            let nUser = Object.assign({},this.props.editUser);
            nUser[key] = val;
            this.props.editingUser(nUser);
        };
    }
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        let head = ['uid','identity','name','password','create_time','operation'];
        let { users, editUser, deleteUser, saveEditUser, hint } = this.props;
        const nUsers = users.map((user) => {
            const { uid, identity, user_name, password, create_time } = user;
            return {
                uid, identity, user_name, password, create_time
            };
        });
        const usernameReg = /^\w{3}\w*$/;
        return (
            <div className='list-wrap'>
                <h1>Admin Users</h1>
                <h5>{ hint }</h5>
                <MTable headList={head}
                    bodyList={nUsers}
                    deletable={true}
                    editable={true}
                    editItem={editUser}
                    editTitle="Edit User"
                    handleDelete={deleteUser}
                    handleBeginEdit={this.beginEdit}
                    handleSave={saveEditUser}
                >
                <div >
                    <MField
                        hintText="Username"
                        labelText="Username"
                        value={editUser.user_name}
                        errorText="should more than 3 chars"
                        required
                        match={usernameReg}
                        onChange={this.setValue('user_name')}
                    /><br />
                    <MField
                        hintText="Password"
                        labelText="Password"
                        value={editUser.password}
                        required
                        onChange={this.setValue('password')}
                    />
                </div>
                </MTable>
            </div>
        );
    }
}
function mapStateToProps(state){
    const { users, editUser, hint } = state.usersReducer;
    return {
        users,
        editUser,
        hint
    };
}
function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers,dispatch),
        deleteUser: bindActionCreators(deleteUser,dispatch),
        editingUser: bindActionCreators(editingUser,dispatch),
        saveEditUser: bindActionCreators(saveEditUser,dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
