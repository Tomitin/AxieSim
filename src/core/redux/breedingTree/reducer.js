import { v4 } from 'node-uuid';
import { filterAxieTreeArray } from '../../../utils/utils';
import * as actions from './actions';

const initialState = {
    treesForm: {
        fatherAxieId: '',
        momAxieId: '',
    },
    isLoading: false,
    trees: {
        isNewTreeSelected: false,
        treeSelected: null,
        byId: {},
        allIds: [],
    },
    axies: {
        byId: {},
        allIds: [],
    },
};

export const breedingTreeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.ADD_NEW_STATE:
            return payload.state;
        case actions.CLEAR_STATE:
            return initialState;
        case actions.ADD_NEW_TREE_FORM:
            return {
                ...state,
                treesForm: {
                    fatherAxieId: '',
                    momAxieId: '',
                },
                trees: {
                    ...state.trees,
                    isNewTreeSelected: true,
                    treeSelected: null,
                },
            };
        case actions.REMOVE_AXIE_SUBTREE:
            const axieTreeToDelete = filterAxieTreeArray(
                state.trees.byId[state.trees.treeSelected].hierarchy,
                payload.axieId,
            );
            const filteredHierarchy = state.trees.byId[state.trees.treeSelected].hierarchy.filter(
                (axieSubtree) => axieTreeToDelete.indexOf(axieSubtree.source) === -1,
            );
            return {
                ...state,
                trees: {
                    ...state.trees,
                    byId: {
                        ...state.trees.byId,
                        [state.trees.treeSelected]: {
                            ...state.trees.byId[state.trees.treeSelected],
                            hierarchy: filteredHierarchy.map((axieHierarchy) => {
                                return {
                                    ...axieHierarchy,
                                    targets: axieHierarchy.targets.filter((targetId) => targetId !== payload.axieId),
                                };
                            }),
                        },
                    },
                },
            };
        case actions.ADD_AXIE_TO_SELECTED_TREE:
            return {
                ...state,
                trees: {
                    ...state.trees,
                    byId: {
                        ...state.trees.byId,
                        [state.trees.treeSelected]: {
                            ...state.trees.byId[state.trees.treeSelected],
                            hierarchy: [
                                ...state.trees.byId[state.trees.treeSelected].hierarchy,
                                {
                                    source: payload.axieId,
                                    targets: payload.childrenList,
                                },
                            ],
                        },
                    },
                },
            };
        case actions.ADD_PARTNER_TO_AXIE:
            const axiePartnersList = state.axies.byId[payload.axieId].partners;
            return {
                ...state,
                axies: {
                    ...state.axies,
                    byId: {
                        ...state.axies.byId,
                        [payload.axieId]: {
                            ...state.axies.byId[payload.axieId],
                            partners: [...new Set([...axiePartnersList, payload.partnerId])],
                        },
                    },
                },
            };
        case actions.UPDATE_AXIE_TO_SELECTED_TREE:
            return {
                ...state,
                trees: {
                    ...state.trees,
                    byId: {
                        ...state.trees.byId,
                        [state.trees.treeSelected]: {
                            ...state.trees.byId[state.trees.treeSelected],
                            hierarchy: [
                                ...state.trees.byId[state.trees.treeSelected].hierarchy.map((axieHierarchy) => {
                                    if (axieHierarchy.source === payload.axieId) {
                                        return {
                                            ...axieHierarchy,
                                            targets: payload.childrenList,
                                        };
                                    }
                                    return axieHierarchy;
                                }),
                            ],
                        },
                    },
                },
            };
        case actions.SET_LOADING:
            return {
                ...state,
                isLoading: payload.isLoading,
            };
        case actions.SUBMIT_NEW_TREE_FORM:
            return {
                ...state,
            };
        case actions.GET_AXIE_DETAILS_SUCCESS:
            return {
                ...state,
                axies: {
                    ...state.axies,
                    byId: {
                        ...state.axies.byId,
                        [payload.axie.id]: {
                            ...payload.axie,
                            partners: [],
                        },
                    },
                    allIds: [...new Set([...state.axies.allIds, payload.axie.id])],
                },
            };
        case actions.ADD_TREE:
            const uniqueId = v4();
            return {
                ...state,
                trees: {
                    ...state.trees,
                    isNewTreeSelected: false,
                    treeSelected: uniqueId,
                    byId: {
                        ...state.trees.byId,
                        [uniqueId]: {
                            id: uniqueId,
                            title: payload.treeName,
                            hierarchy: [],
                        },
                    },
                    allIds: [...state.trees.allIds, uniqueId],
                },
            };
        case actions.DELETE_TREE:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [payload.treeId]: value, ...filteredTree } = state.trees.byId;
            return {
                ...state,
                trees: {
                    ...state.trees,
                    byId: filteredTree,
                    allIds: [...state.trees.allIds.filter((treeId) => treeId !== payload.treeId)],
                    treeSelected: state.trees.treeSelected === payload.treeId ? null : state.trees.treeSelected,
                },
            };
        case actions.UPDATE_TREE_SELECTED:
            return {
                ...state,
                trees: {
                    ...state.trees,
                    treeSelected: payload.treeId,
                    isNewTreeSelected: false,
                },
            };
        case actions.GET_NON_CACHED_AXIE_DETAILS_SUCCESS:
            return {
                ...state,
                axies: {
                    ...state.axies,
                    byId: {
                        ...state.axies.byId,
                        [payload.axie.id]: {
                            ...state.axies.byId[payload.axie.id],
                            ...payload.axie,
                        },
                    },
                },
            };
        default:
            return state;
    }
};
