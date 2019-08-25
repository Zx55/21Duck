import { createStore, applyMiddleware, DeepPartial } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';
import saga from '../sagas';

import { IState } from '../types';


export default (preLoadedState: DeepPartial<IState>) => {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = process.env.NODE_ENV === 'development' ?
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        ) : applyMiddleware(sagaMiddleware);
    const store = createStore(reducer, preLoadedState, enhancer);
    const persistor = persistStore(store);
    sagaMiddleware.run(saga);

    return { store, persistor };
};
