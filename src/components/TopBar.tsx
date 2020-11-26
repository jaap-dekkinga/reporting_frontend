import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { initialState, AWS_COGNITO_AUTH } from '../common/consts';
import { logout } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        container: {
            padding: 0
        },
    }),
);

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector((state: typeof initialState) => state.authorization);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = AWS_COGNITO_AUTH;
    };

    return (
        <AppBar position="static">
            <Container className={classes.container}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        TuneURL Analytics
                    </Typography>
                    <Typography >
                        {auth.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </Container>
        </AppBar >
    )
}