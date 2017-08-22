import { LOG_IN, LOG_OUT, CHECK_AUTH } from 'src/constants';
import { fetchLogin, fetchLogout } from 'src/service/auth';
import { fetchDetail } from 'src/service/user';

let initialState;
if(sessionStorage.getItem('auth')){
    initialState = JSON.parse(sessionStorage.getItem('auth'));
}else{
    initialState = {
        identity: 'guest',
        uid: '',
        username: '',
        avator: '',
        password: ''
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
            const authRes = await fetchLogin(data);
            const userRes = await fetchDetail({uid: authRes.items.uid});
            let userStore = {
                uid: authRes.items.uid,
                username: authRes.items.user_name,
                identity: authRes.items.identity,
                avatar: userRes.items.avatar,
                password: userRes.items.password
            };
            dispatch({
                type: LOG_IN,
                payload: userStore
            });
            saveAuthToSession(userStore);
            successCallback && successCallback(authRes);
        } catch (err) {
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
                uid: action.payload.uid,
                password: action.payload.password,
                avatar: action.payload.avatar
            };
        case LOG_OUT:
            return {
                identity: 'guest',
                uid: '',
                username: '',
                avator: '',
                password: ''
            };
        default:
            return state;
    }
};
