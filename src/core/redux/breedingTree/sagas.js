import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    addAxieToSelectedTree,
    addTree,
    getAxieDetailsError,
    getAxieDetailsSuccess,
    getNonCachedAxieDetailsError,
    getNonCachedAxieDetailsSuccess,
    SUBMIT_NEW_TREE_FORM,
    setLoading,
    updateAxieToSelectedTree,
    UPDATE_AXIE_BREEDS,
    addPartnerToAxie,
} from './actions';
import * as Api from '../../services';
import { mapAxieChildrenList } from '../../../utils/utils';

function* submitNewTreeForm(action) {
    try {
        yield put(setLoading({ isLoading: true }));
        const response = yield call(Api.getAxieDetails, action.payload.axieId);
        // const formattedChildrenList = mapAxieChildrenList(response.data.children);
        yield put(getAxieDetailsSuccess({ axie: { ...response.data, children: [] } }));
        yield put(addTree({ treeName: action.payload.newTreeForm.treeName }));
        yield put(addAxieToSelectedTree({ axieId: response.data.id, childrenList: [] }));
        yield put(setLoading({ isLoading: false }));
    } catch (error) {
        yield put(setLoading({ isLoading: false }));
        yield put(getAxieDetailsError(error.message));
    }
}

export function* submitNewTreeFormSaga() {
    yield takeEvery(SUBMIT_NEW_TREE_FORM, submitNewTreeForm);
}

function* updateAxieBreeds(action) {
    try {
        yield put(setLoading({ isLoading: true }));
        const response = yield call(Api.getNonCachedAxieDetails, action.payload.axieId);

        /* When class is null, it means that this child is still an egg. We don't use them. */
        // const adultAxiesList = response.data.children.filter((child) => {
        //     if (child.class !== null) {
        //         const isNewbornChild = action.payload.childrenAlreadyAdded.every((childId) => childId !== child.id);
        //         if (isNewbornChild) {
        //             return child;
        //         }
        //     }
        // });

        const childrenToSearch = mapAxieChildrenList(response.data.children);
        const formattedChildrenList = [...action.payload.childrenAlreadyAdded, ...childrenToSearch];

        yield put(getNonCachedAxieDetailsSuccess({ axie: { ...response.data, children: formattedChildrenList } }));
        yield put(updateAxieToSelectedTree({ axieId: response.data.id, childrenList: formattedChildrenList }));
        if (response.data.breedCount > 0) {
            // Could be optimized to only call non-existent children in the tree
            yield updateAxieChildren(action.payload.axieId, childrenToSearch);
        }
        yield put(setLoading({ isLoading: false }));
    } catch (error) {
        yield put(setLoading({ isLoading: false }));
        yield put(getNonCachedAxieDetailsError(error.message));
    }
}

function* updateAxieChildren(axieId, directChildrenIds) {
    try {
        const responseList = yield all(directChildrenIds.map((childId) => call(Api.getAxieDetails, childId)));
        const actionsList = responseList.reduce((accumulator, response) => {
            // const formattedChildrenList = mapAxieChildrenList(response.data.children);

            const fatherId = response.data.sireId;
            const motherId = response.data.matronId;
            // axie id is string and the other are numbers
            const partnerId = axieId == motherId ? fatherId : motherId;

            return accumulator.concat([
                put(addPartnerToAxie({ axieId, partnerId })),
                put(getAxieDetailsSuccess({ axie: { ...response.data, children: [] } })),
                put(addAxieToSelectedTree({ axieId: response.data.id, childrenList: [] })),
            ]);
        }, []);

        yield all(actionsList);
    } catch (error) {
        yield put(getNonCachedAxieDetailsError(error.message));
    }
}

export function* updateAxieBreedsSaga() {
    yield takeEvery(UPDATE_AXIE_BREEDS, updateAxieBreeds);
}
