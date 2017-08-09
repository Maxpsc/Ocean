import { LOG_SUCCESS, LOG_ERROR } from 'src/constants';
const initialState = {
    username: '',
    password: '',
    logining: false,
    hint: ''
};
export function loginSuccess(data) {
    return (dispatch) => {
        dispatch({
            type: LOG_SUCCESS,
            payload:{
                hint:'login success'
            }
        });
    };
};

export default function loginReducer(state = initialState, action) {
    switch (action.type){
        case LOG_SUCCESS:
            return {
                ...state,
                hint: action.payload.hint
            };
        case LOG_ERROR:
            return {
                ...state,
                hint: action.payload.error
            };
        default:
            return state;
    }
};
