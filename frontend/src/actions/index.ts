import ActionTypes from '../types/ActionTypes';


export function loginAsync(userId: String, userPw: String) {
    return {
        type: ActionTypes.LOGIN_ASYNC,
        payload: {
            userId,
            userPw
        }
    }
};

export function registerAsync(userId: String, userPw: String) {
    return {
        type: ActionTypes.REGISTER_ASYNC,
        payload: {
            userId,
            userPw
        }
    }
};

export function logout() {
    return {
        type: ActionTypes.LOGOUT,
        payload: {}
    }
};
