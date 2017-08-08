import { PUBLIC } from 'src/constants';
let initialState = {
    username: ''
};
export default function publicReducer(state = initialState, action) {
    switch (action.type){
        case PUBLIC:
            return Object.assign({}, state, {
                username: action.username
            });
        default:
            return state;
    }
};
