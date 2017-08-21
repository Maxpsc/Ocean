import { GET_USERS, EDITING_USER, UPDATE_USER, DELETE_USER, CLEAR_USER_HINT } from 'src/constants';
import { fetchUsers, fetchDelete, fetchUpdate } from 'src/service/users';

let initialState = {
    users: [],
    editUser: {
        uid: '',
        user_name: '',
        password: '',
        identity: '',
        create_time: ''
    },
    hint:''
};
export function getUsers(){
    return async (dispatch) => {
        try {
            const res = await fetchUsers();
            dispatch({
                type: GET_USERS,
                payload: res.items
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export function editingUser(user){
    return (dispatch) => {
        dispatch({
            type: EDITING_USER,
            payload: user
        });
    };
}
export function deleteUser(uid){
    return async (dispatch) => {
        try {
            const deleteRes = await fetchDelete({uid:uid});
            dispatch({
                type:DELETE_USER,
                payload:deleteRes.items
            });
            const getRes = await fetchUsers();
            dispatch({
                type: GET_USERS,
                payload: getRes.items
            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_USER_HINT
                });
            },2000);
        } catch (err) {
            console.log(err);
        }
    };
}
export function saveEditUser(uid,user){
    return async (dispatch) => {
        try {
            const updateRes = await fetchUpdate({uid,user});
            dispatch({
                type: UPDATE_USER,
                payload: updateRes.items
            });
            const getRes = await fetchUsers();
            dispatch({
                type: GET_USERS,
                payload: getRes.items
            });
            setTimeout(() => {
                dispatch({
                    type:CLEAR_USER_HINT
                });
            },2000);
        } catch (err) {
            console.log(err);
        }
    };
}

export default function usersReducers(state = initialState, action) {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case EDITING_USER:
            return {
                ...state,
                editUser: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                hint: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                hint: action.payload
            };
        case CLEAR_USER_HINT:
            return {
                ...state,
                hint: ''
            };
        default:
            return state;
    }
};
