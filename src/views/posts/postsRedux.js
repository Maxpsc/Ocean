import { GET_POST, DELETE_POST, UPDATE_POST, EDITING_POST, CLEAR_POST_HINT } from 'src/constants';
import { fetchGet, fetchDelete, fetchUpdate } from 'src/service/posts';

let initialState = {
    posts: [],
    editPost: {
        id:'',
        title:'',
        content:'',
        user:'',
        create_time:''
    },
    hint: ''
};
export function getPosts(id) {
    return async (dispatch) => {
        try {
            const res = await fetchGet(id);
            dispatch({
                type: GET_POST,
                payload: res.items
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export function deletePost(id) {
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
            setTimeout(()=> {
                dispatch({
                    type: CLEAR_POST_HINT
                });
            },2000);
        } catch (error) {
            console.log(error);
        }
    };
};

export function editingPost(post) {
    return (dispatch) => {
        dispatch({
            type: EDITING_POST,
            payload: post
        });
    }
}
export function saveEditPost(id, post) {
    return async (dispatch) => {
        try {
            const updateRes = await fetchUpdate({id,post});
            dispatch({
                type: UPDATE_POST,
                payload: updateRes.items
            });
            const getRes = await fetchGet();
            dispatch({
                type: GET_POST,
                payload: getRes.items
            });
            setTimeout(()=> {
                dispatch({
                    type: CLEAR_POST_HINT
                });
            },2000);
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
                hint: action.payload
            };
        case EDITING_POST:
            return {
                ...state,
                editPost: action.payload
            };
        case UPDATE_POST:
            return {
                ...state,
                hint: action.payload
            };
        case CLEAR_POST_HINT:
            return {
                ...state,
                hint:''
            }
        default:return state;
    };
};
