import { call, put, takeEvery } from 'redux-saga/effects';
import {
    addAxieToSelectedTree,
    addTree,
    getAxieDetailsError,
    getAxieDetailsSuccess,
    SUBMIT_NEW_TREE_FORM,
} from './actions';
import * as Api from '../../core/services';

function* submitNewTreeForm(action) {
    try {
        const response = yield call(Api.getAxieDetails, action.payload.axieId);
        yield put(getAxieDetailsSuccess({ axie: response.data }));
        yield put(addTree({ treeName: action.payload.newTreeForm.treeName }));
        yield put(addAxieToSelectedTree({ axieId: response.data.story_id }));
    } catch (error) {
        yield put(getAxieDetailsError(error.message));
    }
}

export function* submitNewTreeFormSaga() {
    yield takeEvery(SUBMIT_NEW_TREE_FORM, submitNewTreeForm);
}
