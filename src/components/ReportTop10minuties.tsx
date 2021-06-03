import 'date-fns';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    //DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { API, initialState, interestActions } from '../common/consts';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 140,
            //  maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        spinner: {
            marginLeft: theme.spacing(2),
            color: 'white',
        },
        table: {
            minWidth: 650,
            //width: 1000,
        },
        reportBox: {
            marginTop: 70,
            width: 700,
        },
        numberCell: {
            width: 50,
        },
        menuItem: {
            '&.Mui-selected': {
                backgroundColor: 'rgba(178, 223, 219, 0.5)',
            },
            '&.Mui-selected:hover': {
                backgroundColor: 'rgba(178, 223, 219, 0.5)',
            },
        },
        tableHead: {
            '& th': {
                fontWeight: 700,
            },
        },
    })
);

/*
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 28;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
*/

type reportDataElementT = {
    date_time: string,
    count: number
};

export default () => {
    const classes = useStyles();

    const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
    const [dateTo, setDateTo] = useState<Date | null>(new Date());

    const tuneUrlIdList = useSelector((state: typeof initialState) => state.reports.tuneUrlIDs);
    const [tuneUrlID, setTuneUrlID] = useState<Number | ''>('');

    const [interestAction, setInterestAction] = useState<interestActions | ''>('');

    const [requireReportData, setRequireReportData] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [reportData, setReportData] = useState<reportDataElementT[]>([]);

    // filling Select elements
    const TuneUrlIdItemsList = tuneUrlIdList
        ?.map(el => <MenuItem key={el} value={el} className={classes.menuItem}>{el}</MenuItem>) || null;

    const InterestActionItemsList = ['heard', 'interested', 'acted', 'shared']
        .map(el => <MenuItem key={el} value={el} className={classes.menuItem}>{el}</MenuItem>);

    const handleSetTuneUrlID = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTuneUrlID(event.target.value as number);
    };

    const handleSetInterestAction = (event: React.ChangeEvent<{ value: unknown }>) => {
        setInterestAction(event.target.value as interestActions);
    }

    const handleReport = () => {
        if (!tuneUrlIdList) return;
        setRequireReportData(true);
    };

    useEffect(() => {
        setRequireReportData(false);

        if (!(requireReportData && dateFrom && dateTo && interestAction)) return;

        setShowSpinner(true);

        fetch(API.getTop10minuties, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                DateFrom: format(dateFrom, 'yyy-MM-dd'),
                DateTo: format(dateTo, 'yyy-MM-dd'),
                TuneURL_ID: tuneUrlID,
                Interest_action: interestAction,
            }),
        })
            .then(res => {
                setShowSpinner(false);
                return res.json();
            })
            .then(data => {
                if (data.status !== 'OK') {
                    console.log("Can't receive report data: ", data.message);
                    return;
                }

                setReportData(data.data);
            });
    }, [requireReportData]);

    return (
        <>
            <Box mb={2} fontSize={32} fontWeight={600} color="#464646">
                Report: Top 10 slots
            </Box>
            <Grid container spacing={4} justify="flex-start" alignItems="flex-end">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            //id="date-picker-inline"
                            label="From:"
                            value={dateFrom}
                            onChange={setDateFrom}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            //id="date-picker-inline"
                            label="To:"
                            value={dateTo}
                            onChange={setDateTo}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel >TuneURL ID:</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={tuneUrlID}
                            onChange={handleSetTuneUrlID}
                        >
                            {TuneUrlIdItemsList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Interest action:</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={interestAction}
                            onChange={handleSetInterestAction}
                        >
                            {InterestActionItemsList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item justify="flex-end">
                    <Box mb={1}>
                        <Button variant="contained" size="large" color="primary" onClick={handleReport}>
                            <Box fontWeight={600}>
                                Report
                            </Box>
                            {showSpinner ? <CircularProgress size={20} className={classes.spinner} /> : null}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {
                reportData.length > 0 ?
                    <Box className={classes.reportBox}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell className={classes.numberCell}>№</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                        <TableCell align="right">Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="right">{format(new Date(row.date_time), 'yyy-MM-dd')}</TableCell>
                                            <TableCell align="right">{format(new Date(row.date_time), 'HH:mm')}</TableCell>
                                            <TableCell align="right">{row.count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    : null
            }
        </>
    )
}