import { ActionTypes, IAction } from '../types';
import { History } from 'history';


export function loginAsync(userId: string, userPw: string,
    history: History): IAction {
    return {
        type: ActionTypes.LOGIN_ASYNC,
        payload: {
            userId,
            userPw,
            history,
        }
    }
};

export function registerAsync(userId: string, userPw: string): IAction {
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
