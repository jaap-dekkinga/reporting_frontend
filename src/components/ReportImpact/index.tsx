import 'date-fns';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { FormControl, Select, MenuItem, InputLabel, Input, Button, Checkbox, ListItemText } from '@material-ui/core';
import { Chip, CircularProgress } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    //DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Graph1 from './Graph1';
import Graph2 from './Graph2';
import { API } from '../../common/consts';
import { initialState } from '../../common/consts';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bordered: {
            border: "solid green 1px",
        },
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
        graphBox: {
            marginTop: 100
        },
        menuItem: {
            '&.Mui-selected': {
                backgroundColor: 'rgba(178, 223, 219, 0.5)',
            },
            '&.Mui-selected:hover': {
                backgroundColor: 'rgba(178, 223, 219, 0.5)',
            },
        },
    }),
);

/*
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 28;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 150,//250,
        },
    },
};
*/

type graph1ItemT = {
    value: number,
    date: string
};
type dataGraph1T = {
    heard: graph1ItemT[],
    interested: graph1ItemT[],
};
type dataGraph2T = {
    acted: number,
    heard: number,
    interested: number,
    shared: number
};

export default () => {
    const classes = useStyles();

    const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
    const [dateTo, setDateTo] = useState<Date | null>(new Date());

    const tuneUrlIdList = useSelector((state: typeof initialState) => state.reports.tuneUrlIDs);
    const [tuneUrlID, setTuneUrlID] = useState<Number[]>([]);

    const [requireGraphData, setRequireGraphData] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [graph1Data, setGraph1Data] = useState<dataGraph1T | null>(null);
    const [graph2Data, setGraph2Data] = useState<dataGraph2T | null>(null);

    const handleSetTuneUrlID = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTuneUrlID(event.target.value as number[]);
    };

    // filling Select element
    const TuneUrlIdItemsList = tuneUrlIdList?.map(el => {
        return (
            <MenuItem key={el} value={el} className={classes.menuItem}>
                <Checkbox checked={tuneUrlID.includes(el)} />
                <ListItemText primary={el} />
            </MenuItem>
        )
    }) || null;

    // get graph data
    useEffect(() => {
        setRequireGraphData(false);

        if (!(requireGraphData && dateFrom && dateTo)) return;
        if (tuneUrlID.length === 0) return;

        setShowSpinner(true);

        fetch(API.getGraphData, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                DateFrom: format(dateFrom, 'yyy-MM-dd'),
                DateTo: format(dateTo, 'yyy-MM-dd'),
                TuneURL_ID: tuneUrlID,
            }),
        })
            .then(res => {
                setShowSpinner(false);
                return res.json();
            })
            .then(data => {
                if (data.status !== 'OK') {
                    console.log("Can't receive graphs data: ", data.message);
                    return;
                }

                setGraph1Data(data.data.graph1);
                setGraph2Data(data.data.graph2);
            });
    }, [requireGraphData]);

    const handleGraph = () => {
        if (!tuneUrlIdList) return;
        setRequireGraphData(true);
    };

    return (
        <Box>
            <Box mb={2} fontSize={32} fontWeight={600} color="#464646">
                Report (Impact)
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
                        <InputLabel>TuneURL ID:</InputLabel>
                        <Select
                            multiple
                            labelId="select-label"
                            id="select"
                            value={tuneUrlID}
                            onChange={handleSetTuneUrlID}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                        //MenuProps={MenuProps}
                        >
                            {TuneUrlIdItemsList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item justify="flex-end">
                    <Box mb={1}>
                        <Button variant="contained" size="large" color="primary" onClick={handleGraph}>
                            <Box fontWeight={600}>
                                Graph
                            </Box>
                            {showSpinner ? <CircularProgress size={20} className={classes.spinner} /> : null}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {
                graph1Data && graph2Data ?
                    <Box className={classes.graphBox}>
                        <Grid container justify="space-between">
                            <Grid item md={7}>
                                <Graph1 data={graph1Data} />
                            </Grid>
                            <Grid item md={4}>
                                <Graph2 data={graph2Data} />
                            </Grid>
                        </Grid>
                    </Box>
                    : null
            }
        </Box >
    )
}