import * as types from './actionTypes';

export const logIn = (email, uid) => {
    return {
        type: types.LOG_IN,
        payload: {
            uid,
            email
        }
    }
}
export const getProfile = (profile) => {
    return {
        type: types.GET_PROFILE,
        payload: {
            profile
        }
    }
}