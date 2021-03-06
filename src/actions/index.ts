import { Dispatch } from 'redux';
import { actionTypes } from './types';
import { API, initialState, reports } from '../common/consts';

const types = actionTypes;

function storeTuneUrlIDs(tuneUrlIDs: number[]) {
    return {
        type: types.storeTuneUrlIDs,
        tuneUrlIDs: tuneUrlIDs
    }
}

export function getTuneUrlIDs(uid: typeof initialState.authorization.uid) {
    return async (dispatch: Dispatch) => {
        try {
            const res = await fetch(API.getTuneUrlIDs + '?' + new URLSearchParams({ uid: uid as string }), {
                method: 'GET',
                mode: 'cors',
            });
            const data = await res.json();
            
            //console.log(data);
            if (data.status !== 'OK') throw Error(data.message);

            dispatch(storeTuneUrlIDs(data.items));
        } catch (err) {
            console.log("Can't load list of TuneURL_ID: ", err)
        }
    }
}

export function refreshAuthData(authData: typeof initialState.authorization) {
    return {
        type: types.refreshAuthData,
        authData: authData,
    }
}

export function logout() {
    return {
        type: types.logout,
        authData: initialState.authorization
    }
}

export function setActiveReport(report: reports) {
    return {
        type: types.setActiveReport,
        activeReport: report,
    }
}