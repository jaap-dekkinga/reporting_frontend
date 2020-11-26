import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import { initialState, AWS_COGNITO_PUBLIC_KEY_LINK } from '../../common/consts';

type authT = typeof initialState.authorization;
interface tokenPayloadT extends authT {
    exp: number;
};

export default class Authentication {
    /**
     * Checking existing authentication state and token expiration time left
     * @param authorization 
     */
    static checkCurrentAuthenticationState(authorization: typeof initialState.authorization) {
        if (!authorization.email) return false;

        const timeLeft = Date.now() / 1000 - Number(authorization.expired); // seconds
        if (timeLeft <= 0) return false;

        return true;
    }

    /**
     * Checking ID Token in the address query parameter
     */
    static async checkIdToken() {
        const hash = new URL(String(window.location)).hash;

        const matches = hash.match(/#id_token=(.+?)&/);

        if (matches?.length !== 2) throw Error('No id_token');
        const idToken = matches[1];

        //const idToken = 'eyJraWQiOiJkWWdEM1lHdk85NEkwR2lMTnZJWHpJSjd1VDBZaXIxVnJnQzJQZ2pIRXFvPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoibGVUbFdxUU9sR0hqNkJvU3U0dDR6USIsInN1YiI6IjNiODExM2JkLTliZWYtNDYyZC04NGJjLWUzOTAwNTc0MmQ5YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl90MmVOOGJBeUsiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiM2I4MTEzYmQtOWJlZi00NjJkLTg0YmMtZTM5MDA1NzQyZDliIiwiYXVkIjoiM3M0bTk0M2h0cTM4Mzd2cW9qbHM5aDJrcTMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwNjIyMTM4MSwibmFtZSI6IlZhc2lseSIsInBob25lX251bWJlciI6Iis3OTg1MTM1NzEzNSIsImV4cCI6MTYwNjI0Mjk4MSwiaWF0IjoxNjA2MjIxMzgxLCJlbWFpbCI6InZhc2lseXZwQGxpc3QucnUifQ.HP3wHQ1rnnafQDTpb2U6UkSr1LQ_6mZzSicX3A_JkiQpuDU8GUGtH8stqzoY8ILxfh3P5PqemwtAP6MG8HdftcwvSuEQD8kRHOwRsDPVPHsJCs97XHGaQeB_ElLcQHTJV63g0Mg9eYYtC9VIet3gQriXeFqG2T_F6E_IIFMvG5Iq_To7v5QTfHejXsZ4RrMTzqTG_o1WZ00GcRRnK28tn2PXnjanbOP_s0YGxpRmYXyzL1RD4Jr0DrQyD89i9zlwEPBBVrk9hwpaVoniQ89Smwsy4w1gx7mYrSNwz9VciJ1xBu__oN973jZ2msZA9rWaKcO_zxgsGsD05_IthGzJtA';

        // checking JWT structure and content
        if (!idToken) throw Error('No id_token');

        const tokenParts = idToken.split('.');

        if (tokenParts.length !== 3) throw Error('Invalid id_token format');

        const decoded1 = atob(tokenParts[0]);
        //const decoded2 = atob(tokenParts[1]);

        const tokenObj1 = JSON.parse(decoded1);

        // loading AWS public key to check jwt
        const res = await fetch(AWS_COGNITO_PUBLIC_KEY_LINK);
        const data = await res.json();

        // looking for relevant key and checking jwt
        const keys = data.keys;
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].kid === tokenObj1.kid) {
                const pem = jwkToPem(keys[i]);
                const tokenPayload: tokenPayloadT = jwt.verify(idToken, pem, { algorithm: [tokenObj1.alg] } as jwt.VerifyOptions) as tokenPayloadT;

                return {
                    email: tokenPayload.email,
                    name: tokenPayload.name,
                    expired: tokenPayload.exp
                };
            }
        }

        throw Error('No relevant pub key');
    }
}