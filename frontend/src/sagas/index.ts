import { all } from 'redux-saga/effects';

import loginAsyncSaga from './loginAsyncSaga';
import registerAsyncSaga from './registerAsyncSaga';
import updateProfileSaga from './updateProfileSaga';
import agreeSaga from './agreeSaga';


export default function*() {
    yield all([
        loginAsyncSaga(),
        registerAsyncSaga(),
        updateProfileSaga(),
        agreeSaga(),
    ]);
};
