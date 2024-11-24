import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Session = {
    validateSession: async () => {
        return !!await Session.getAccessToken();
    },
    getAccessToken: async () => {
        return await AsyncStorage.getItem('accessToken');
    },
    setAccessToken: async (accessToken: string) => {
        await AsyncStorage.setItem('accessToken', accessToken);
    },
    removeAccessToken: async () => {
        await AsyncStorage.removeItem('accessToken');
    },
    setSessionData: async (token: string) => {
        const parts = token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
        const payload = JSON.parse(parts[1]);

        await AsyncStorage.setItem('sessionData', JSON.stringify(payload));
    },
    getSessionData: async () => {
        const sessionData = await AsyncStorage.getItem('sessionData');
        return sessionData ? JSON.parse(sessionData) : {};
    },
    removeSessionData: async () => {
        await AsyncStorage.removeItem('sessionData');
        await AsyncStorage.removeItem('accessToken');
    },
};

export default Session;