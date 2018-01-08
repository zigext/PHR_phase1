import * as types from '../actions/actionTypes'


const initialState = {
    isLoggedIn: false,
    appId: 'HPHR',
    activity: []
}

export default function UserReducer(state = initialState, action = {}) {
    console.log('userReducer was called with state', state, 'and action', action)
    switch (action.type) {
        case types.LOG_IN:
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn,
                user: action.payload
            }
        case types.LOG_OUT:
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn
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
        case types.DELETE_SURGERY:
            return {
                ...state
            }
        case types.EDIT_PROFILE:
            return {
                ...state
            }
        case types.SAVE_ACTIVITY:
            if (state.activity.length > 5) { //Only save 5 last activities 
                console.log("activity history full")
                state.activity.shift() //remove first element from array
            }
            return {
                ...state,
                activity: [...state.activity, action.payload]
            }
        // case ActionConst.FOCUS:
        //     return {
        //         ...state,
        //         routeName: action.routeName
        //     }
        case 'persist/REHYDRATE': {
            // retrive stored data for reducer callApi
            // const savedData = action.payload.callApi || initialState;

            // return {
            //     ...state, ...savedData
            // };
            // // return {
            // //     ...state,
            // //     persistedState: action.payload
            // // }
        }
        default:
            return state
    }
}