import axios from 'axios';

const User = {
    logIn: async (email, password) => {
        const { data } = await axios.post('/login', { email: email, password: password });
        return data;
    },
    logOut: async () => {
        const { data } = await axios.post('/logout');
        return data;
    },
    signUp: async (email, password) => {
        const { data } = await axios.post('/signup', { email: email, password: password });
        return data;
    },
    validateSession: async () => {
        const { data } = await axios.get('/sessions');
        return data;
    }
}

export default User;