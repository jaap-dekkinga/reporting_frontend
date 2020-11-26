import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { initialState, AWS_COGNITO_AUTH } from '../../common/consts';
import { refreshAuthData } from '../../actions';
import Auth from './authLib';
import { ReactComponent as LoadSpinner } from '../../assets/imgs/load_spinner.svg';

type propsT = {
    children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinnerBox: {
            width: '10%',
            height: '10%',
            position: 'absolute',
            top: '45%',
            left: '45%',
        },
    }),
);

/**
 * Checking authentication state,
 * receiving AWS id_token from URI, loads public key and checking id_token (JWT) by them
 */
export default (props: propsT) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authorization = useSelector((state: typeof initialState) => state.authorization);

    // checking Authentication state and Cognito id_token
    useEffect(() => {
        if (!Auth.checkCurrentAuthenticationState(authorization)) {
            Auth.checkIdToken()
                .then(authData => {
                    dispatch(refreshAuthData(authData as typeof initialState.authorization));
                })
                .catch(err => {
                    //console.log(err);
                    window.location.href = AWS_COGNITO_AUTH;
                });
        }
    }, []);

    return (
        <>
            {!authorization.email ?
                <LoadSpinner className={classes.spinnerBox} />
                : null}
            {authorization.email ?
                props.children
                : null}
        </>
    )
}