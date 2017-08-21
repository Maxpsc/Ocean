import { LOG_IN, LOG_OUT, CHECK_AUTH } from 'src/constants';
import { fetchLogin, fetchLogout } from 'src/service/auth';

let initialState;
if(sessionStorage.getItem('auth')){
    initialState = JSON.parse(sessionStorage.getItem('auth'));
}else{
    initialState = {
        identity: 'guest',
        uid: '',
        username: ''
    };
}
//save userData to sessionStorage
function saveAuthToSession(userStore) {
    sessionStorage.setItem('auth',JSON.stringify(userStore));
}
function clearAuthFromSession(){
    sessionStorage.removeItem('auth');
}

export function login(data, successCallback, errorCallback=() => {}) {
    return async (dispatch, getState) => {
        try {
            const res = await fetchLogin(data);
            let userStore = {
                uid: res.items.uid,
                username: res.items.user_name,
                identity: res.items.identity
            };
            dispatch({
                type: LOG_IN,
                payload: userStore
            });
            saveAuthToSession(userStore);
            successCallback && successCallback(res);
        } catch (err) {
            console.log(err);
            errorCallback && errorCallback(err);
        }
    };
};
export function logout() {
    return async (dispatch) => {
        try {
            await fetchLogout();
            dispatch({
                type: LOG_OUT
            });
            clearAuthFromSession();
        } catch(err) {
            console.log(err);
        }
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
