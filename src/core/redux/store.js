import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { applyMiddleware, createStore } from 'redux';
import { loadState, saveState } from '../localstorage';
import throttle from 'lodash/throttle';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

let productionMiddleware;
if (process.env.NODE_ENV === 'production') {
    productionMiddleware = applyMiddleware(sagaMiddleware);
} else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    productionMiddleware = composeEnhancers(applyMiddleware(sagaMiddleware));
}

const persistedState = loadState();
export const store = createStore(rootReducer(), persistedState, productionMiddleware);

/** We use throttle to ensure that this function which is expensive
 * (because of json stringify and lots of data) is called min every x seconds, not more.
 * */
const minimumWaitMiliseconds = 2000;
store.subscribe(
    throttle(() => {
        const breedingTreeAppState = store.getState().breedingTreeApp;
        saveState({
            breedingTreeApp: {
                ...breedingTreeAppState,
            },
        });
    }, minimumWaitMiliseconds),
);

sagaMiddleware.run(rootSaga);
