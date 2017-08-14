// import { PUBLIC_POST, PUBLIC_ERROR } from 'src/constants';
// import { fetchPublic } from 'src/service/posts';
//
// let initialState = {
//     title: '',
//     content: '',
//     hint: ''
// };
// export function publicPost(data,successCallback,errorCallback) {
//     return (dispatch) => {
//         fetchPublic(data)
//         .then(res => {
//             successCallback && successCallback();
//         })
//         .catch(res => {
//             dispatch({
//                 type:PUBLIC_ERROR,
//                 payload: {
//                     error: res.items
//                 }
//             });
//             errorCallback && errorCallback(res);
//         });
//     };
// }
//
// export default function publicReducer(state = initialState, action) {
//     switch (action.type){
//         case PUBLIC_POST:
//             return {
//                 ...state,
//                 title: action.payload.title,
//                 content: action.payload.content
//             };
//         case PUBLIC_ERROR:
//             return {
//                 ...state,
//                 hint: action.payload.error
//             };
//         default:
//             return state;
//     }
// };
