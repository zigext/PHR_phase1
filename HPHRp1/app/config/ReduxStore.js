import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

import reducers from '../reducers/Index'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { AsyncStorage } from 'react-native';
import CreateLogger from 'redux-logger'
import UserReducer from '../reducers/UserReducer'
import ActivityReducer from '../reducers/ActivityReducer'

const config = {
    key: 'root',
    storage: AsyncStorage
}
console.log("reducers = ", reducers)
const reducer = persistCombineReducers(config, {ActivityReducer, UserReducer})


const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunkMiddleware, CreateLogger),
    )
);
//   let store = createStore(reducer)
let persistor = persistStore(store)
//   let store = "test"
//   let persistor = "persistStore(store)"

export { persistor, store }
