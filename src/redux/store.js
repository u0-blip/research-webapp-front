import { createStore, combineReducers, applyMiddleware, compose } from 'redux';


import thunkMiddleware from 'redux-thunk';
import dataReducer from './reducer/dataReducers';

const reducers = combineReducers({
    data: dataReducer,
});


const initialState = {};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const middleware = [thunkMiddleware];
const enhancers = [applyMiddleware(...middleware)];
const enhancer = composeEnhancers(...enhancers);

const store = createStore(reducers, initialState, enhancer)

export default store;