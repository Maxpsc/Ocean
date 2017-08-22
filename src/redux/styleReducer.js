import { CHANGE_STYLE } from 'src/constants';
let initialState = {
    style: 'light'
};

export function changeStyle(style){
    return (dispatch) => {
        dispatch({
            type: CHANGE_STYLE,
            payload: style
        });
    };
};

export default function styleReducer(state = initialState, action){
    switch(action.type){
        case CHANGE_STYLE:
            return {
                style: action.payload
            };
        default:
            return state;
    }
};
