import { combineReducers } from 'redux';
import { breedingTreeReducer } from './breedingTree/reducer';

export default function rootReducer() {
    return combineReducers({
        breedingTreeApp: breedingTreeReducer,
    });
}
