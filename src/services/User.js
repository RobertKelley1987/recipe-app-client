import { api } from './api';

const User = {
    logIn: async (email, password) => {
        const { data } = await api.post(`/login`, { email: email, password: password });
        return data;
    },
    logOut: async () => {
        const { data } = await api.post(`/logout`);
        return data;
    },
    signUp: async (email, password) => {
        const { data } = await api.post(`/signup`, { email: email, password: password });
        return data;
    },
    validateSession: async () => {
        const { data } = await api.get(`/sessions`);
        return data;
    }
}

export default User;