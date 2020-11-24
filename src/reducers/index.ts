import { combineReducers } from 'redux';
import reports from './reports';
import authorization from './authorization';

const rootReducer = combineReducers({
    // reducers must be here
    reports,
    authorization,
})

export default rootReducer