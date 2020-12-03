import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { initialState } from '../../common/consts';
import { AWS_COGNITO_AUTH } from '../../common/config';
import { logout } from '../../actions';
import logo from '../../assets/imgs/TuneURL_logo.png';
import Drawer from './Drawer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            borderBottom: '5px solid',
            borderColor: theme.palette.primary.main,
        },
        logo: {
            height: 80,
            margin: theme.spacing(0.5),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            marginLeft: 90,
            flexGrow: 1,
            fontWeight: 700,
            fontSize: 32,
        },
        authName: {
            fontWeight: 600,
            fontSize: 20,
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
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography className={classes.title}>
                        Dashboard
                    </Typography>
                    <Typography className={classes.authName}>
                        {auth.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </AppBar >
            <Drawer />
        </>
    )
}