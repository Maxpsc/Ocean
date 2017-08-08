import { REGISTER } from 'src/constants';
const initialState = {
    username: '',
    password: '',
    repassword: '',
    hint: ''
};
export function register(data) {
    return (dispatch, getState) => {
        fetch("http://localhost:3000/api/reg",{
          method:'POST',
          mode:'cors',
          credentials: "same-origin",
          body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.error_code === 0){
                dispatch({
                    type: REGISTER,
                    payload: {
                        hint:res.items
                    }
                });
            }else{
                
            }
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
                hint: action.payload.hint
            };
        default:
            return state;
    }
};
