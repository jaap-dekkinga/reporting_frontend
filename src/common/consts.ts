export const initialState = {
    reports: {
        tuneUrlIDs: [] as number[],
    }
}

export enum interestActions {
    'heard' = 'heard',
    'interested' = 'interested',
    'acted' = 'acted',
    'shared' = 'shared'
}

export const API = {
    getTuneUrlIDs: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTuneURL_IDs',
    getGraphData: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getGraphData',
    getTop10minuties: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTop10minuties',
}