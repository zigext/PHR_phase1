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

export const addNewSurgery = () => {
    return {
        type: types.ADD_NEW_SURGERY
    }
}

export const editProfile = () => {
    return {
        type: types.EDIT_PROFILE
    }
}