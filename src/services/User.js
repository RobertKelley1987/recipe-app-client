import axios from 'axios';
import { SERVER_URL } from './server-url';

const server = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

const User = {
    logIn: async (email, password) => {
        const { data } = await server.post(`/login`, { email: email, password: password });
        return data;
    },
    logOut: async () => {
        const { data } = await server.post(`/logout`);
        return data;
    },
    signUp: async (email, password) => {
        const { data } = await server.post(`/signup`, { email: email, password: password });
        return data;
    },
    validateSession: async () => {
        const { data } = await server.get(`/sessions`);
        return data;
    }
}

export default User;