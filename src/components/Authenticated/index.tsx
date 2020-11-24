import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initialState, AWS_COGNITO_AUTH } from '../../common/consts';
import { refreshAuthData } from '../../actions';
import Auth from './authLib';

type propsT = {
    children: React.ReactNode
}

export default (props: propsT) => {
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
            {!authorization.email ? 'wait...' : null}
            {authorization.email ?
                props.children
                : null}
        </>
    )
}