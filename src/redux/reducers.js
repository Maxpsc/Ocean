import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authorityReducer from 'src/views/authority';
import homeReducer from 'src/views/home/homeRedux';
import regReducer from 'src/views/reg/regRedux';
import loginReducer from 'src/views/login/loginRedux';
// import user from './user';
// import publicReducer from './public';

export default combineReducers({
    authorityReducer,
    homeReducer,
    regReducer,
    loginReducer,
    router: routerReducer
});
