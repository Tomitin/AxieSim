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

export const addAxie = (payload) => ({
    type: ADD_AXIE,
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
