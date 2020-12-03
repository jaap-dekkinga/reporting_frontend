const devMode = process.env.NODE_ENV === 'development' ? true : false;
/**
 * Is Authentication required
 */
export const AUTH_REQUIRED = devMode ? false : true;

/**
 * Cognito pool parameters
 */
const addrTemplate = 'https://cognito-idp.{#0#}.amazonaws.com/{#1#}/.well-known/jwks.json';
const poolID = 'us-east-2_2OlcpG9dA';
const region = 'us-east-2';
export const AWS_COGNITO_PUBLIC_KEY_LINK = addrTemplate.replace('{#0#}', region).replace('{#1#}', poolID);

const domainName = 'tuneurl';
const appClientID = '750qb0832o0u5as2vgki96lfgi';

const redirectURI = devMode ? 'http://localhost:3000' : 'https://dashboard.tuneurl.com';//'https://dev7628.d722rv280a3p6.amplifyapp.com';
//const redirectURI = 'http://localhost:3000';
const cognitoAuthPathTemplate = 'https://{#0#}.auth.{#1#}.amazoncognito.com/login?response_type=token&client_id={#2#}&redirect_uri={#3#}';
export const AWS_COGNITO_AUTH = cognitoAuthPathTemplate
                                    .replace('{#0#}', domainName)
                                    .replace('{#1#}', region)
                                    .replace('{#2#}', appClientID)
                                    .replace('{#3#}', redirectURI);