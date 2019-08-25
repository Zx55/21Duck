import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { IAction, ActionTypes } from '../types';


export interface RegisterData {
    username: string;
    nickname: string;
    password: string;
};

function* registerAsync(action: IAction) {
    const { userId, userNickname, userPw, history } = action.payload;
    const data: RegisterData = {
        username: userId,
        nickname: userNickname,
        password: userPw,
    };

    try {
        const response = (yield call(api.register, data)).data;

        if (response.register_status === 'success') {
            yield put({
                type: ActionTypes.REGISTER,
                payload: {
                    userId: userId,
                    nickName: userNickname,
                    userHead: 'https://c-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg',
                    identity: 1,
                    blocktime: 0,
                    scores: 0,
                    register: 0,
                }
            });
            setTimeout(() => history.push('/explore'), 3000);
        }
        else {
            alert('该手机号已经被注册');
        }
    } catch (err) {
        console.log(err);
    }
}

export default function*() {
    yield takeEvery(ActionTypes.REGISTER_ASYNC, registerAsync);
};
