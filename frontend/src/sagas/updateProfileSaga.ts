import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { IAction, ActionTypes, IRequestUser } from '../types';

import { message } from 'antd'


function* updateAsync(action: IAction) {
    const {
        userId,
        userNickname,
        userAge,
        userSchool,
        userProfile,
    } = action.payload;

    let data: IRequestUser = {}
    if (userNickname !== '') {
        data.nickname = userNickname;
    }
    if (userAge !== '') {
        data.age = userAge;
    }
    if (userSchool !== '') {
        data.school = userSchool;
    }
    if (userProfile !== '') {
        data.profile = userProfile;
    }

    try {
        const response = (yield call(api.user.update, userId, data));
        console.log(response);

        message.config({ top: 75 });
        if (response.status === 200) {
            yield put({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    nickName: userNickname,
                }
            });
            message.success('信息修改成功');
        }
        else {
            message.error('信息修改失败');
        }
    } catch (err) {
        console.log(err);
    }
}

export default function*() {
    yield takeEvery(ActionTypes.UPDATE_PROFILE_ASYNC, updateAsync);
};
