import { v4 } from 'node-uuid';
import * as actions from './actions';

const initialState = {
    treesForm: {
        fatherAxieId: '',
        momAxieId: '',
    },
    isNewTreeSelected: false,
    isLoading: false,
    treeSelected: null,
    trees: [],
    axies: [],
};

export const breedingTreeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.ADD_NEW_TREE_FORM:
            return {
                ...state,
                treesForm: {
                    fatherAxieId: '',
                    momAxieId: '',
                },
                isNewTreeSelected: true,
                treeSelected: null,
            };
        case actions.ADD_AXIE_TO_SELECTED_TREE:
            return {
                ...state,
                trees: [
                    ...state.trees.map((tree) => {
                        if (tree.id === state.treeSelected) {
                            return {
                                ...tree,
                                hierarchy: {
                                    axieId: payload.axieId,
                                    parents: null,
                                    siresIds: [],
                                    children: [],
                                },
                            };
                        }
                        return tree;
                    }),
                ],
            };
        case actions.SUBMIT_NEW_TREE_FORM:
            return {
                ...state,
                isLoading: true,
            };
        case actions.GET_AXIE_DETAILS_SUCCESS:
            return {
                ...state,
                axies: [...state.axies, payload.axie],
                isLoading: false,
            };
        case actions.ADD_TREE:
            const uniqueId = v4();
            return {
                ...state,
                trees: [
                    ...state.trees,
                    {
                        id: uniqueId,
                        title: payload.treeName,
                        hierarchy: {},
                    },
                ],
                isNewTreeSelected: false,
                treeSelected: uniqueId,
            };
        case actions.DELETE_TREE:
            return {
                ...state,
                trees: [...state.trees.filter((tree) => tree.id !== payload.treeId)],
                treeSelected: state.treeSelected === payload.treeId ? null : state.treeSelected,
            };
        case actions.UPDATE_TREE_SELECTED:
            return {
                ...state,
                treeSelected: payload.treeId,
                isNewTreeSelected: false,
            };
        default:
            return state;
    }
};
