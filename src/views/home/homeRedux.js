import { HOME_INIT } from 'src/constants';
const initialState = {
    posts: []
};
export function homeInit() {
    return (dispatch) => {
        fetch("http://localhost:3000/api/posts",{
          method:'GET',
          mode:'cors',
          credentials: "same-origin"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.error_code === 0){
                dispatch({
                    type: HOME_INIT,
                    payloads: res.items
                });
            }
        })
        .catch(error => {
            console.log(error);
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
