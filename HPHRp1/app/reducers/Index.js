// import * as userReducer from './UserReducer'
import userReducer from './UserReducer'
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

// export default combineReducers(Object.assign(
//     userReducer,
// ))

const appReducer = combineReducers({
    userReducer
    }
)

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer