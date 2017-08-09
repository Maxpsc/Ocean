import { PUBLIC_POST, PUBLIC_ERROR } from 'src/constants';
let initialState = {
    title: '',
    content: '',
    hint: ''
};
export function publicPost(data,successCallback,errorCallback) {
    return (dispatch) => {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        fetch("http://localhost:3000/api/posts/public",{
          method:'POST',
          mode:'cors',
          headers: headers,
          credentials: "same-origin",
          body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error_code === 0){
                successCallback && successCallback();
            }else{
                dispatch({
                    type:PUBLIC_ERROR,
                    payload: {
                        error: res.items
                    }
                });
                errorCallback && errorCallback(res);
            }
        });
    };
}

export default function publicReducer(state = initialState, action) {
    switch (action.type){
        case PUBLIC_POST:
            return {
                ...state,
                title: action.payload.title,
                content: action.payload.content
            };
        case PUBLIC_ERROR:
            return {
                ...state,
                hint: action.payload.error
            };
        default:
            return state;
    }
};
