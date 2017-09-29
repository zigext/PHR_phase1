import * as types from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    appId: 'HPHRp1'
}

export default function UserReducer(state = initialState, action = {}) {
    console.log('userReducer was called with state', state, 'and action', action)
    switch (action.type) {
        case types.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case types.GET_PROFILE:
            return {
                ...state,
                user: Object.assign(state.user, action.payload)
            }
        case types.ADD_NEW_SURGERY:
            return {
                ...state
            }
        default:
            return state
    }
}