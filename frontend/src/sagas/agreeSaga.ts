import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { IAction, ActionTypes, IRequestUser } from '../types';
import { message } from 'antd';


function* agreeAsync(action: IAction) {
    const { userId, history } = action.payload;
    const data: IRequestUser = {
        identify: 1
    };

    try {
        const response = (yield call(api.user.update, userId, data));
        console.log(response);

        if (response.status === 200) {
            yield put({
                type: ActionTypes.AGREE,
                payload: {}
            });
        } else {
            message.config({ top: 75 });
            message.error('网络异常！请稍后重试');
        }
    } catch (err) {
        console.log(err);
    }
}

export default function*() {
    yield takeEvery(ActionTypes.AGREE_ASYNC, agreeAsync);
};
