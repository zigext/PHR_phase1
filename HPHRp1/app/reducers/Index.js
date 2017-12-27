import * as userReducer from './UserReducer'
import * as activityReducer from './ActivityReducer'
import { combineReducers } from 'redux'

// export {
//   userReducer
// }

// export default reducer = combineReducers({
//     userReducer
// })

// const rootReducer = combineReducers({
//     userReducer
// });
// console.log("root reducer = ", rootReducer)
// export default rootReducer

export default combineReducers(Object.assign(
    
    userReducer,
    
    
))