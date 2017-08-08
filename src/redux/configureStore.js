import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from 'src/redux/reducers';
//react-router-redux结合react-router4.0,将history加入Store
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
//调试用logger
const loggerMiddleware = createLogger();
//history
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

//生成Store方法
const configureStore = () => {
    const middlewares = [thunkMiddleware, loggerMiddleware, historyMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    //加入redux调试工具
    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const store = createStore(RootReducer, composeEnhancers(...enhancers));
    return store;
    //待完善：reducer热加载
};
export default configureStore;
