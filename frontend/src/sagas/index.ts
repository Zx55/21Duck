import { all } from 'redux-saga/effects';

import loginAsyncSaga from './loginAsyncSaga';
import registerAsyncSaga from './registerAsyncSaga';


export default function*() {
    yield all([
        loginAsyncSaga(),
        registerAsyncSaga(),
    ]);
};
