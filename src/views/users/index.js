import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUsers } from './usersRedux';
import MTable from 'src/components/shared/MTable';

class AdminUsers extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        let head = ['id','identity','username','password','operation'];

        let {users,deleteUsers} = this.props;
        console.log(users);
        return (
            <div className='list-wrap'>
                admin users
                <MTable headList={head}
                    bodyList={users}
                    deletable={true}
                    editable={false}
                    handleDelete={deleteUsers}
                />
            </div>
        );
    }
}
function mapStateToProps(state){
    const { users } = state.usersReducer;
    return {
        users
    };
}
function mapDispatchToProps(dispatch){
    return {
        getUsers: bindActionCreators(getUsers,dispatch),
        // deleteUser: bindActionCreators(deleteUser,dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
