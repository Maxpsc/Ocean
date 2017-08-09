import { LOG_IN, LOG_OUT, LOG_ERROR } from 'src/constants';
const initialState = {
    identity: 'guest',
    username: ''
};

export function login(data, successCallback, errorCallback=() => {}) {
    return (dispatch, getState) => {
        //{usernmae:str,password:str}
        console.log(data);
        let formData = new FormData();
        formData.append('json', JSON.stringify(data));
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        fetch("http://localhost:3000/api/login",{
          method:'POST',
          mode:'cors',
          credentials: "same-origin",
          headers: headers,
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.error_code === 0){
                dispatch({
                    type: LOG_IN,
                    payload: {
                        username: data.username
                    }
                });
                successCallback();
            }else{
                dispatch({
                    type: LOG_ERROR,
                    payload: {
                        error: res.items
                    }
                });
                setTimeout(function(){
                    dispatch({
                        type: LOG_ERROR,
                        payload: {
                            error: ''
                        }
                    });
                },2000);
                errorCallback();
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
};
export function logout() {
    return (dispatch) => {
        fetch("http://localhost:3000/api/logout",{
            method:'GET',
            mode:'cors',
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => {
            if(res.error_code === 0){
                dispatch({
                    type: LOG_OUT
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
};
export default function authorityReducer(state = initialState, action) {
    switch(action.type){
        case LOG_IN:
            return {
                identity: 'user',
                username: action.payload.username
            };
        case LOG_OUT:
            return {
                identity: 'guest',
                username: ''
            };
        default:
            return state;
    }
};
