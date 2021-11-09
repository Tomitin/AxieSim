import { combineReducers } from 'redux';
import { breedingTreeReducer } from './breedingTree/reducer';
import { marketCodeGeneratorReducer } from './marketCodeGenerator/reducer';

export default function rootReducer() {
    return combineReducers({
        breedingTreeApp: breedingTreeReducer,
        codeReducer: marketCodeGeneratorReducer,
    });
}
