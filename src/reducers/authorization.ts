import { initialState } from "../common/consts";
import { actionTypes, actionsT } from "../actions/types";

const types = actionTypes;

export default (state = initialState.authorization, action: actionsT) => {
    switch (action.type) {
        case types.refreshAuthData:
            return { ...action.authData };
        case types.logout:
            return { ...action.authData };
        default:
            return state;
    }
}