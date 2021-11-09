import * as actions from './actions';

const initialState = {
    step: 1,
    commandName: '',
    genes: {},
    filters: {
        speed: [],
        maxPrice: null,
        maxId: null,
        axieClasses: [],
        breedCount: [],
        pureness: 0,
        maxAxiesToSearch: 100,
        marketPage: 1,
        expirateDate: null,
    },
};

export const marketCodeGeneratorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.CLEAR_STATE:
            return initialState;
        case actions.SUBMIT_COMMAND_NAME:
            return {
                ...state,
                commandName: payload.commandName,
            };
        case actions.SUBMIT_GENES:
            return {
                ...state,
                genes: payload.genes,
            };
        case actions.SUBMIT_FILTERS:
            return {
                ...state,
                filters: payload.filters,
            };
        case actions.PREVIOUS_STEP:
            return {
                ...state,
                step: state.step > 1 ? state.step - 1 : state.step,
            };
        case actions.NEXT_STEP:
            return {
                ...state,
                step: state.step + 1,
            };
        default:
            return state;
    }
};
