import Http from './Http';

const Session = {
    doLogin: async (email: string, password: string) => {
        const { data = {} } = await Http.post('/login', { correo: email, contrasenia: password }, {});

        if (data.token) {
            Session.setAccessToken(data.token);
            Session.setSessionData(data.token);
            return true;
        } else {
            console.log('Error al iniciar sesión');
            return false;
        }
    },
    validateSession: () => {
        return !!Session.getAccessToken();
    },
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },
    setAccessToken: (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
    },
    removeAccessToken: () => {
        localStorage.removeItem('accessToken');
    },
    setSessionData: (token: string) => {
        const data = {};
        localStorage.setItem('sessionData', JSON.stringify(data));
    },
    getSessionData: () => {
        const sessionData = localStorage.getItem('sessionData');
        return sessionData ? JSON.parse(sessionData) : {};
    },
};

export default Session;