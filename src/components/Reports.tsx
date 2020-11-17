import 'date-fns';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    //DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default () => {
    const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
    const [dateTo, setDateTo] = useState<Date | null>(new Date());

    return (
        <Grid container>
            <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="From:"
                            value={dateFrom}
                            onChange={setDateFrom}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={dateTo}
                            onChange={setDateTo}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>

            </Grid>
            <Grid item>

            </Grid>
        </Grid>
    )
}