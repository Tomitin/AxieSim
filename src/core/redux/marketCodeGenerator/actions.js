export const CLEAR_STATE = 'CLEAR_STATE';
export const SUBMIT_GENES = 'SUBMIT_GENES';
export const SUBMIT_COMMAND_NAME = 'SUBMIT_COMMAND_NAME';
export const SUBMIT_FILTERS = 'SUBMIT_FILTERS';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';

export const clearState = (payload) => ({
    type: CLEAR_STATE,
    payload,
});

export const submitGenes = (payload) => ({
    type: SUBMIT_GENES,
    payload,
});

export const submitCommandName = (payload) => ({
    type: SUBMIT_COMMAND_NAME,
    payload,
});

export const submitFilters = (payload) => ({
    type: SUBMIT_FILTERS,
    payload,
});

export const nextStep = () => ({
    type: NEXT_STEP,
});

export const previousStep = () => ({
    type: PREVIOUS_STEP,
});
