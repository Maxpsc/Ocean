import { GET_POST, DELETE_POST, UPDATE_POST } from 'src/constants';
import { fetchGet, fetchDelete, fetchUpdate } from 'src/service/posts';

let initialState = {
    posts: [],
    hint: ''
};
export function getPosts(dispatch) {
    return async (dispatch) => {
        try {
            const res = await fetchGet();
            dispatch({
                type: GET_POST,
                payload: res.items
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export function deletePosts(id) {
    return async (dispatch) => {
        try {
            const deleteRes = await fetchDelete({id:id});
            dispatch({
                type: DELETE_POST,
                payload: deleteRes.items
            });
            const getRes = await fetchGet();
            dispatch({
                type: GET_POST,
                payload: getRes.items
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export function editPost(id, post) {
    return async (dispatch) => {
        try {
            const updateRes = fetchUpdate({id,post});
            dispatch({
                type: UPDATE_POST,
                payload: deleteRes.items
            });
            const getRes = await fetchGet();
            dispatch({
                type: GET_POST,
                payload: getRes.items
            });
        } catch (err) {
            console.log(err);
        }
    }
};
export default function postsReducer (state = initialState, action) {
    switch(action.type){
        case GET_POST:
            return {
                ...state,
                posts: action.payload
            };
        case DELETE_POST:
            return {
                ...state,
                hint: action.paylaod
            };
        case UPDATE_POST:
            return {
                ...state,
                hint: action.payload
            };
        default:return state;
    };
};
