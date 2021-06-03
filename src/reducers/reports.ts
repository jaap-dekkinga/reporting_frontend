import { initialState } from "../common/consts";
import { actionTypes, actionsT } from "../actions/types";

const types = actionTypes;

export default (state = initialState.reports, action: actionsT) => {
    switch (action.type) {
        case types.storeTuneUrlIDs:
            return { ...state, tuneUrlIDs: action.tuneUrlIDs };
        case types.setActiveReport:
            return { ...state, activeReport: action.activeReport }
        default:
            return state;
    }
}