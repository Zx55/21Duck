

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { PersistConfig } from 'redux-persist'

import user from './user';


export const persistConfig: PersistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const reducer = combineReducers({
    user
});

export default persistReducer(persistConfig, reducer);
