import * as H from 'history';
import { ActionTypes, IAction } from '../types';


export function loginAsync(userId: string, userPw: string): IAction {
    return {
        type: ActionTypes.LOGIN_ASYNC,
        payload: {
            userId,
            userPw,
        }
    };
};

export function registerAsync(userId: string, userNickname: string,
    userPw: string): IAction {
    return {
        type: ActionTypes.REGISTER_ASYNC,
        payload: {
            userId,
            userNickname,
            userPw,
        }
    };
};

export function logout(): IAction {
    return {
        type: ActionTypes.LOGOUT,
        payload: {}
    }
};

export function updateProfileAsync(userId: string, userNickname: string,
    userAge: string, userSchool: string, userProfile: string): IAction {
    return {
        type: ActionTypes.UPDATE_PROFILE_ASYNC,
        payload: {
            userId,
            userNickname,
            userAge,
            userSchool,
            userProfile,
        }
    };
};

export function agreeAsync(userId: string, history: H.History): IAction {
    return {
        type: ActionTypes.AGREE_ASYNC,
        payload: {
            userId,
            history,
        }
    };
};
