import { REGISTER, REGISTER_ERROR } from 'src/constants';
const initialState = {
    username: '',
    password: '',
    repassword: '',
    hint: ''
};
export function register(data, successCallback, errorCallback) {
    return (dispatch, getState) => {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        fetch("http://localhost:3000/api/reg",{
          method:'POST',
          mode:'cors',
          headers: headers,
          credentials: "same-origin",
          body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error_code === 0){
                dispatch({
                    type: REGISTER,
                    payload: {
                        hint:`${res.items}, 请登录`
                    }
                });
                successCallback && successCallback();
            }else{
                dispatch({
                    type: REGISTER_ERROR,
                    payload: {
                        error:res.items
                    }
                });
                errorCallback && errorCallback();
            }
            setTimeout(function(){
                dispatch({
                    type: REGISTER_ERROR,
                    payload: {
                        error:''
                    }
                });
            },2000);
        })
        .catch(error => {
            console.log(error);
        });
    };
};

export default function regReducer(state = initialState, action) {
    switch (action.type){
        case REGISTER:
            return {
                ...state,
                password:'',
                repassword:'',
                hint: action.payload.hint
            };
        case REGISTER_ERROR:
            return {
                ...state,
                password:'',
                repassword:'',
                hint: action.payload.error
            };
        default:
            return state;
    }
};
