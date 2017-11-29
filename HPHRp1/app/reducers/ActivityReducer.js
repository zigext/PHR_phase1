import * as types from '../actions/actionTypes'

const initialState = {
    status: 'initial'
}

export default function UserReducer(state = initialState, action = {}) {
    console.log('ActivityReducer was called with state', state, 'and action', action)
    switch (action.type) {
        case types.START_ACTIVITY:
            return {
                ...state,
                activity: action.payload
            }
        default:
            return state
    }
}