import { all } from 'redux-saga/effects';
import { submitNewTreeFormSaga } from './breedingTree/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([submitNewTreeFormSaga()]);
}
