import { HOME_INIT } from 'src/constants';
import { fetchGet } from 'src/service/posts';

const initialState = {
    posts: []
};
export function homeInit() {
    return async (dispatch) => {
        try {
            const res = await fetchGet({});
            dispatch({
                type: HOME_INIT,
                payloads: res.items
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export default function homeReducer(state = initialState, action) {
    switch (action.type){
        case HOME_INIT:
            return {
                posts: action.payloads
            };
        default:
            return state;
    }
};
