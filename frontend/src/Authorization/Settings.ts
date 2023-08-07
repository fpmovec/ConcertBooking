export const server = '';
export const webApiUrl = `${server}/api`;

export const authSettings = {
    domain: 'dev-ii744htuz2rl8fvk.us.auth0.com',
    clientId: 'MlSEUnY4GO4ofUx2axVVANqBIHGYf8es',
    authorizationParams: {
        redirect_uri: window.location.origin + '/signin-callback',
        audience: 'https://concertsbooking'
    }
}