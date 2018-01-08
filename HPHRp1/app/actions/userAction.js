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

export const logOut = (email, uid) => {
    return {
        type: types.LOG_OUT,

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


export const deleteSurgery = () => {
    return {
        type: types.DELETE_SURGERY
    }
}

export const editProfile = () => {
    return {
        type: types.EDIT_PROFILE
    }
}

export const saveActivity = (results, date, time) => {
    return {
        type: types.SAVE_ACTIVITY,
        payload: {
            results,
            date,
            time
        }
    }
}
