import { all } from 'redux-saga/effects';

import loginAsyncSaga from './loginAsyncSaga';
import registerAsyncSaga from './registerAsyncSaga';
import updateProfileSaga from './updateProfileSaga'


export default function*() {
    yield all([
        loginAsyncSaga(),
        registerAsyncSaga(),
        updateProfileSaga(),
    ]);
};
