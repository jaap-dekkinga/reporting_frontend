import { Dispatch } from 'redux';
import { actionTypes } from './types';
import { API } from '../common/consts';

const types = actionTypes;

function storeTuneUrlIDs(tuneUrlIDs: number[]) {
    return {
        type: types.storeTuneUrlIDs,
        tuneUrlIDs: tuneUrlIDs
    }
}

export function getTuneUrlIDs() {
    return async (dispatch: Dispatch) => {
        try {
            const res = await fetch(API.getTuneUrlIDs, {
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