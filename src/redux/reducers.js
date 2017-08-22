import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authorityReducer from 'src/views/authority';
import homeReducer from 'src/views/home/homeRedux';
import regReducer from 'src/views/reg/regRedux';
import loginReducer from 'src/views/login/loginRedux';
import publicReducer from 'src/views/public/publicRedux';
import postsReducer from 'src/views/posts/postsRedux';
import usersReducer from 'src/views/users/usersRedux';
import styleReducer from './styleReducer';

export default combineReducers({
    styleReducer,
    authorityReducer,
    homeReducer,
    regReducer,
    loginReducer,
    publicReducer,
    postsReducer,
    usersReducer,
    router: routerReducer
});
