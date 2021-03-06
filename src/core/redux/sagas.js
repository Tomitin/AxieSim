import { all } from 'redux-saga/effects';
import { submitNewTreeFormSaga, updateAxieBreedsSaga } from './breedingTree/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([submitNewTreeFormSaga(), updateAxieBreedsSaga()]);
}
