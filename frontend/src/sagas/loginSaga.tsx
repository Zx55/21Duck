import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { IAction, ActionTypes } from '../types';


export interface loginData {
    username: string,
    password: string,
};

function* login(action: IAction) {
    const { userId, userPw } = action.payload;
    const data: loginData = {
        username: userId,
        password: userPw,
    };

    try {
        const response = yield call(api.login, data);
        if (response.data.success) {
            console.log(response.data);
            yield put({
                type: ActionTypes.LOGIN,
                payload: {
                    userId: response.data.user_id,
                    nickName: response.data.user_nickname,
                    userHead: response.data.user_head,
                    identity: response.data.identity,
                    blocktime: response.data.blocktime,
                    scores: response.data.scores,
                    register: response.data.register,
                }
            });
        }
        else {
            console.log('login fail');
        }
    } catch (err) {
        console.log(err);
    }
}

export default function*() {
    yield takeEvery(ActionTypes.LOGIN_ASYNC, login);
};
