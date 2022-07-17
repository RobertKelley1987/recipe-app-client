import axios from 'axios';
import { SERVER_URL } from './server-url';

const User = {
    logIn: async (email, password) => {
        const { data } = await axios.post(`${SERVER_URL}/login`, { email: email, password: password });
        return data;
    },
    logOut: async () => {
        const { data } = await axios.post(`${SERVER_URL}/logout`);
        return data;
    },
    signUp: async (email, password) => {
        const { data } = await axios.post(`${SERVER_URL}/signup`, { email: email, password: password });
        return data;
    },
    validateSession: async () => {
        const { data } = await axios.get(`${SERVER_URL}/sessions`);
        return data;
    }
}

export default User;