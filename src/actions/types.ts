import { initialState, reports } from '../common/consts';

export enum actionTypes {
    // action types here
    getTuneUrlIDs = "Try to get TuneURL IDs",
    storeTuneUrlIDs = "Storing received TuneURL IDs",
    refreshAuthData = "Refreshing authentication data",
    logout = "Logout",
    setActiveReport = "Setting active report",
}

export type actionsT = {
    type: actionTypes,
    // other action data types here
    tuneUrlIDs: number[],
    authData: typeof initialState.authorization,
    activeReport: reports,
}