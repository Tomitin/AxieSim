import { createSelector } from 'reselect';

export const getFormStep = createSelector(
    (state) => state.codeReducer.step,
    (step) => step,
);

export const getCommandName = createSelector(
    (state) => state.codeReducer.commandName,
    (name) => name,
);

export const getFormData = createSelector(
    (state) => state.codeReducer,
    (formData) => formData,
);
