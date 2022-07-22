import { useEffect, useState } from 'react';

const useSuccessMessage = () => {
    const [successMessage, setSuccessMessage] = useState('');

    // When a success message is triggered in th App component from another component,
    // clear message after three seconds (i.e. make it dissappear).
    useEffect(() => {
        let timeoutId;

        if(successMessage) {
            timeoutId = setTimeout(() => setSuccessMessage(''), 2000);
        }

        return () => clearTimeout(timeoutId); 
    }, [successMessage]);

      return [successMessage, setSuccessMessage];
}

export default useSuccessMessage;