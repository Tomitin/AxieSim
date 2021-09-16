import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    addAxieToSelectedTree,
    addTree,
    getAxieDetailsError,
    getAxieDetailsSuccess,
    getNonCachedAxieDetailsError,
    getNonCachedAxieDetailsSuccess,
    UPDATE_AXIE_TREE,
    SUBMIT_NEW_TREE_FORM,
    setLoading,
    updateAxieToSelectedTree,
} from './actions';
import * as Api from '../../services';
import { TREE_DEPTH } from '../../constants/constants';
import { mapAxieChildrenList } from '../../../utils/utils';

function* submitNewTreeForm(action) {
    try {
        yield put(setLoading({ isLoading: true }));
        const response = yield call(Api.getAxieDetails, action.payload.axieId);
        const formattedChildrenList = mapAxieChildrenList(response.data.children);
        yield put(getAxieDetailsSuccess({ axie: { ...response.data, children: formattedChildrenList } }));
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

function* updateTree(action) {
    const searchDepth = action.payload.searchDepth ? action.payload.searchDepth : TREE_DEPTH.AXIE;
    try {
        yield put(setLoading({ isLoading: true }));
        const response = yield call(Api.getNonCachedAxieDetails, action.payload.axieId);

        /* When class is null, it means that this child is still an egg. We don't use them. */
        const adultAxiesList = response.data.children.filter((child) => {
            if (child.class !== null) {
                return child;
            }
        });
        const formattedChildrenList = mapAxieChildrenList(adultAxiesList);
        yield put(getNonCachedAxieDetailsSuccess({ axie: { ...response.data, children: formattedChildrenList } }));
        yield put(updateAxieToSelectedTree({ axieId: response.data.id, childrenList: formattedChildrenList }));
        if (action.payload.searchDepth == TREE_DEPTH.AXIE_WITH_CHILDREN && response.data.breedCount > 0) {
            // Could be optimized to only call non-existent children in the tree
            yield updateAxieChildren(action.payload.axieId, formattedChildrenList, searchDepth);
        }
        yield put(setLoading({ isLoading: false }));
    } catch (error) {
        yield put(setLoading({ isLoading: false }));
        yield put(getNonCachedAxieDetailsError(error.message));
    }
}

function* updateAxieChildren(axieId, directChildrenIds, searchDepth) {
    if (searchDepth === TREE_DEPTH.AXIE_WITH_CHILDREN) {
        const responseList = yield all(directChildrenIds.map((childId) => call(Api.getAxieDetails, childId)));

        const actionsList = responseList.reduce((accumulator, response) => {
            const formattedChildrenList = mapAxieChildrenList(response.data.children);
            return accumulator.concat([
                put(getAxieDetailsSuccess({ axie: { ...response.data, children: formattedChildrenList } })),
                put(addAxieToSelectedTree({ axieId: response.data.id, childrenList: [] })),
            ]);
        }, []);

        console.log(actionsList);

        yield all(actionsList);
    }
}

export function* updateTreeSaga() {
    yield takeEvery(UPDATE_AXIE_TREE, updateTree);
}
