import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

import ReportImpact from './ReportImpact';
import ReportTop10minuties from './ReportTop10minuties';
import { getTuneUrlIDs } from '../actions';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTuneUrlIDs());
    }, []);

    return (
        <>
            <Box mt={3}>
                <ReportImpact />
            </Box>
            <Box my={10}>
               <ReportTop10minuties />
            </Box>
        </>
    )
}