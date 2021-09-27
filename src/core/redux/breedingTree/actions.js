export const ADD_NEW_TREE_FORM = 'ADD_NEW_TREE_FORM';
export const UPDATE_TREE_SELECTED = 'UPDATE_TREE_SELECTED';
export const DELETE_TREE = 'DELETE_TREE';
export const ADD_TREE = 'ADD_TREE';
export const GET_AXIE_DETAILS = 'GET_AXIE_DETAILS';
export const GET_AXIE_DETAILS_SUCCESS = 'GET_AXIE_DETAILS_SUCCESS';
export const GET_AXIE_DETAILS_ERROR = 'GET_AXIE_DETAILS_ERROR';
export const ADD_AXIE_TO_SELECTED_TREE = 'ADD_AXIE_TO_SELECTED_TREE';
export const ADD_AXIE = 'ADD_AXIE';
export const SUBMIT_NEW_TREE_FORM = 'SUBMIT_NEW_TREE_FORM';
export const UPDATE_AXIE_BREEDS = 'UPDATE_AXIE_BREEDS';
export const GET_NON_CACHED_AXIE_DETAILS_SUCCESS = 'GET_NON_CACHED_AXIE_DETAILS_SUCCESS';
export const GET_NON_CACHED_AXIE_DETAILS_ERROR = 'GET_NON_CACHED_AXIE_DETAILS_ERROR';
export const UPDATE_AXIE_TO_SELECTED_TREE = 'UPDATE_AXIE_TO_SELECTED_TREE';
export const SET_LOADING = 'SET_LOADING';
export const ADD_NEW_STATE = 'ADD_NEW_STATE';
export const CLEAR_STATE = 'CLEAR_STATE';
export const ADD_PARTNER_TO_AXIE = 'ADD_PARTNER_TO_AXIE';
export const REMOVE_AXIE_SUBTREE = 'REMOVE_AXIE_SUBTREE';

export const addNewTreeForm = () => ({
    type: ADD_NEW_TREE_FORM,
});

export const submitNewTreeForm = (payload) => ({
    type: SUBMIT_NEW_TREE_FORM,
    payload,
});

export const addTree = (payload) => ({
    type: ADD_TREE,
    payload,
});

export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload,
});

export const addAxie = (payload) => ({
    type: ADD_AXIE,
    payload,
});

export const addNewState = (payload) => ({
    type: ADD_NEW_STATE,
    payload,
});

export const clearState = (payload) => ({
    type: CLEAR_STATE,
    payload,
});

export const removeAxieSubtree = (payload) => ({
    type: REMOVE_AXIE_SUBTREE,
    payload,
});

export const addAxieToSelectedTree = (payload) => ({
    type: ADD_AXIE_TO_SELECTED_TREE,
    payload,
});

export const deleteTree = (payload) => ({
    type: DELETE_TREE,
    payload,
});

export const updateTreeSelected = (payload) => ({
    type: UPDATE_TREE_SELECTED,
    payload,
});

export const getAxieDetails = (payload) => ({
    type: GET_AXIE_DETAILS,
    payload,
});

export const getAxieDetailsSuccess = (payload) => ({
    type: GET_AXIE_DETAILS_SUCCESS,
    payload,
});

export const getAxieDetailsError = (payload) => ({
    type: GET_AXIE_DETAILS_ERROR,
    payload,
});

export const updateAxieBreeds = (payload) => ({
    type: UPDATE_AXIE_BREEDS,
    payload,
});

export const getNonCachedAxieDetailsSuccess = (payload) => ({
    type: GET_NON_CACHED_AXIE_DETAILS_SUCCESS,
    payload,
});

export const getNonCachedAxieDetailsError = (payload) => ({
    type: GET_NON_CACHED_AXIE_DETAILS_ERROR,
    payload,
});

export const updateAxieToSelectedTree = (payload) => ({
    type: UPDATE_AXIE_TO_SELECTED_TREE,
    payload,
});

export const addPartnerToAxie = (payload) => ({
    type: ADD_PARTNER_TO_AXIE,
    payload,
});
