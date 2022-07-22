import { useEffect, useState } from 'react';
import User from '../services/User';

const useUserId = setLoadingStatus => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Make request to app server with cookie data to check if user is logged in
        const getSession = async () => {
            setLoadingStatus(true);
            const data = await User.validateSession();
            setUserId(data.userId);
            setLoadingStatus(false);
        }

        getSession();
    }, [setLoadingStatus]);

    return [userId, setUserId];
}

export default useUserId;