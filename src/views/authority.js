import { LOG_IN, LOG_OUT, CHECK_AUTH } from 'src/constants';
import { fetchLogin, fetchLogout } from 'src/service/auth';
const initialState = {
    identity: 'guest',
    uid: '',
    username: ''
};
export function checkAuth() {
    
}
export function login(data, successCallback, errorCallback=() => {}) {
    return (dispatch, getState) => {
        //{usernmae:str,password:str}
        fetchLogin(data)
        .then(res => {
            console.log(res);
            dispatch({
                type: LOG_IN,
                payload: {
                    uid: res.items.user.uid,
                    username: res.items.user.username,
                    identity: res.items.user.identity
                }
            });
            successCallback && successCallback(res);
        })
        .catch(res => {
            errorCallback(res);
        });
    };
};
export function logout() {
    return (dispatch) => {
        fetchLogout()
        .then(res => {
            dispatch({
                type: LOG_OUT
            });
        })
        .catch(res => {
            console.log(res);
        });
    };
};
export default function authorityReducer(state = initialState, action) {
    switch(action.type){
        case CHECK_AUTH:
            return {
                identity: action.payload.identity,
                username: action.payload.username,
                uid: action.payload.uid
            };
        case LOG_IN:
            return {
                identity: action.payload.identity,
                username: action.payload.username,
                uid: action.payload.uid
            };
        case LOG_OUT:
            return {
                identity: 'guest',
                username: '',
                uid: ''
            };
        default:
            return state;
    }
};
