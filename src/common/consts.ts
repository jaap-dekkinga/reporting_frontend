export const initialState = {
    reports: {
        tuneUrlIDs: [] as number[],
    },
    authorization: {
        email: null as null | string,
        name: null as null | string,
        expired: null as null | number,
    }
}

export enum interestActions {
    'heard' = 'heard',
    'interested' = 'interested',
    'acted' = 'acted',
    'shared' = 'shared'
}

export const API = {
    getTuneUrlIDs: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTuneURL_IDs',
    getGraphData: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getGraphData',
    getTop10minuties: 'https://65neejq3c9.execute-api.us-east-2.amazonaws.com/getTop10minuties',
}

/**
 * Cognito pool parameters
 */
const addrTemplate = 'https://cognito-idp.{#0#}.amazonaws.com/{#1#}/.well-known/jwks.json';
const poolID = 'us-east-2_t2eN8bAyK';
const region = 'us-east-2';
export const AWS_COGNITO_PUBLIC_KEY_LINK = addrTemplate.replace('{#0#}', region).replace('{#1#}', poolID);

const poolName = 'tuneurl';
const appClientID = '3s4m943htq3837vqojls9h2kq3';
//const redirectURI = 'https://dev7628.d722rv280a3p6.amplifyapp.com';
const redirectURI = 'http://localhost:3000';
const cognitoAuthPathTemplate = 'https://{#0#}.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id={#1#}&redirect_uri={#2#}';
export const AWS_COGNITO_AUTH = cognitoAuthPathTemplate
                                    .replace('{#0#}', poolName)
                                    .replace('{#1#}', appClientID)
                                    .replace('{#2#}', redirectURI);