import * as types from './actionTypes';

export const startActivity = () => {
    return {
        type: types.START_ACTIVITY,
        payload: {
            test:"start"
        }
    }
}
