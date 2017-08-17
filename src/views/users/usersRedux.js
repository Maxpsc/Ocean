import { GET_USERS, EDIT_USER, DELETE_USER } from 'src/constants';
import { fetchUsers, fetchDelete, fetchEdit } from 'src/service/users';

let initialState = {
    users: []
};
export function getUsers(){
    return (dispatch) => {
        fetchUsers()
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_USERS,
                payload: res.items
            });
        })
        .catch(res => {
            console.log(res);
        });
    };
};

export default function usersReducers(state = initialState, action) {
    switch(action.type){
        case GET_USERS:
            return {
                users: action.payload
            };
        default:
            return state;
    }
};
