import { all } from 'redux-saga/effects';

import loginAsyncSaga from './loginAsyncSaga';


export default function*() {
    yield all([
        loginAsyncSaga(),
    ]);
};
