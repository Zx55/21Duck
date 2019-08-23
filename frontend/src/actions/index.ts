import { ActionTypes, IAction } from '../types';


export function loginAsync(userId: number, userPw: string): IAction {
    return {
        type: ActionTypes.LOGIN_ASYNC,
        payload: {
            userId,
            userPw
        }
    }
};

export function registerAsync(userId: number, userPw: string): IAction {
    return {
        type: ActionTypes.REGISTER_ASYNC,
        payload: {
            userId,
            userPw
        }
    }
};

export function logout(): IAction {
    return {
        type: ActionTypes.LOGOUT,
        payload: {}
    }
};
