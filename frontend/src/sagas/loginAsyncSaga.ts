import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { IAction, ActionTypes } from '../types';


export interface LoginData {
    username: string,
    password: string,
};

function* loginAsync(action: IAction) {
    const { userId, userPw } = action.payload;
    const data: LoginData = {
        username: userId,
        password: userPw,
    };

    try {
        const response = (yield call(api.login, data)).data;

        if (response.success) {
            yield put({
                type: ActionTypes.LOGIN,
                payload: {
                    userId: response.user_id,
                    nickName: response.user_nickname,
                    userHead: response.user_head,
                    identity: response.identity,
                    blocktime: response.blocktime,
                    scores: response.scores,
                    register: response.register,
                }
            });
        }
        else {
            alert('登录失败');
        }
    } catch (err) {
        console.log(err);
    }
}

export default function*() {
    yield takeEvery(ActionTypes.LOGIN_ASYNC, loginAsync);
};
