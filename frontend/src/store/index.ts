import { createStore, applyMiddleware, DeepPartial } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';
import saga from '../sagas';

import { IState } from '../types';
import { IStore } from '../types';


export default (preLoadedState: DeepPartial<IState>): IStore => {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = process.env.NODE_ENV === 'development'
        ? composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        ) : applyMiddleware(sagaMiddleware);
    const store = createStore(reducer, preLoadedState, enhancer);
    sagaMiddleware.run(saga);

    return store;
};
