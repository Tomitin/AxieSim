import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { applyMiddleware, createStore } from 'redux';
import { loadState, saveState } from '../core/localstorage';
import throttle from 'lodash/throttle';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
export const store = createStore(rootReducer(), persistedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

/** We use throttle to ensure that this function which is expensive
 * (because of json stringify and lots of data) is called min every x seconds, not more.
 * */
const minimumWaitMiliseconds = 2000;
store.subscribe(
    throttle(() => {
        const breedingTreeAppState = store.getState().breedingTreeApp;
        saveState({
            breedingTreeApp: {
                treeSelected: breedingTreeAppState.treeSelected,
                trees: breedingTreeAppState.trees,
                axies: breedingTreeAppState.axies,
            },
        });
    }, minimumWaitMiliseconds),
);

sagaMiddleware.run(rootSaga);
