export enum actionTypes {
    // action types here
    getTuneUrlIDs = "Try to get TuneURL IDs",
    storeTuneUrlIDs = "Storing received TuneURL IDs",
}

export type actionsT = {
    type: actionTypes,
    // other action data types here
    tuneUrlIDs: number[],
}