import { combineReducers } from 'redux';
import reports from './reports';

const rootReducer = combineReducers({
    // reducers must be here
    reports,
})

export default rootReducer