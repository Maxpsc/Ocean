import { HOME_INIT } from 'src/constants';
import { fetchGet } from 'src/service/posts';

const initialState = {
    posts: []
};
export function homeInit() {
    return (dispatch) => {
        fetchGet()
        .then(res => {
            dispatch({
                type: HOME_INIT,
                payloads: res.items
            });
        })
        .catch(res => {
            console.log(res);
        });
    };
}

export default function homeReducer(state = initialState, action) {
    switch (action.type){
        case HOME_INIT:
            return {
                ...state,
                posts: action.payloads
            };
        default:
            return state;
    }
};
