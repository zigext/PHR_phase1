import * as userReducer from './UserReducer'
import { combineReducers } from 'redux'

// export {
//   userReducer
// }

// export default reducer = combineReducers({
//     userReducer
// })

export default combineReducers(Object.assign(
    userReducer
))