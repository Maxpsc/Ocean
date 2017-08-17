import { GET_POST, DELETE_POST, EDIT_POST } from 'src/constants';
import { fetchGet, fetchDelete, fetchEdit } from 'src/service/posts';

let initialState = {
    posts: []
};
export function getPosts(dispatch) {
    return (dispatch) => {
        fetchGet()
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.items
            });
        })
        .catch(res => {
            console.log(res);
        });
    };
};

export function deletePosts(id) {
    return (dispatch) => {
        fetchDelete({ids:[id]})
        .then(res => {
            fetchGet()
            .then(res => {
                dispatch({
                    type: GET_POST,
                    payload: res.items
                });
            })
            .catch(res => {
                console.log(res);
            });
        })
        .catch(res => {
            console.log(res);
        });
    };
};

export function editPost() {

};
export default function postsReducer (state = initialState, action) {
    switch(action.type){
        case GET_POST:
            return {
                posts: action.payload
            };
        // case DELETE_POST:
        // case EDIT_POST:

        default:return state;
    };
};
