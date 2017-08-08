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
            type: LOG_SUCCESS
        });
    };
};

export default function loginReducer(state = initialState, action) {
    switch (action.type){
        case LOG_SUCCESS:
            return {
                ...state,
                hint: 'login success'
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
