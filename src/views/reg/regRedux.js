// import { REGISTER, REGISTER_ERROR } from 'src/constants';
// import { fetchReg } from 'src/service/auth';
// const initialState = {
//     username: '',
//     password: '',
//     repassword: '',
//     hint: ''
// };
// export function register(data, successCallback, errorCallback) {
//     return (dispatch, getState) => {
//         fetchReg(data)
//         .then(res => {
//             // dispatch({
//             //     type: REGISTER,
//             //     payload: {
//             //         hint:`${res.items}, 请登录`
//             //     }
//             // });
//             successCallback && successCallback(res);
//         })
//         .catch(res => {
//             // dispatch({
//             //     type: REGISTER_ERROR,
//             //     payload: {
//             //         error:res.items
//             //     }
//             // });
//             errorCallback && errorCallback(res);
//         });
//
//         setTimeout(function(){
//             dispatch({
//                 type: REGISTER_ERROR,
//                 payload: {
//                     error:''
//                 }
//             });
//         },2000);
//     };
// };
//
// export default function regReducer(state = initialState, action) {
//     switch (action.type){
//         case REGISTER:
//             return {
//                 ...state,
//                 password:'',
//                 repassword:'',
//                 hint: action.payload.hint
//             };
//         case REGISTER_ERROR:
//             return {
//                 ...state,
//                 password:'',
//                 repassword:'',
//                 hint: action.payload.error
//             };
//         default:
//             return state;
//     }
// };
