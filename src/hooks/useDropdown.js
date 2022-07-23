import { useEffect, useRef } from 'react';

const useDropdown = setDropdownIsVisible => {
    // Ref to DOM element for dropdown menu
    const dropdownWrapper = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            // Added this line of code to prevent app from crashing in production
            if(!dropdownWrapper || !dropdownWrapper.current) {
                return
            }
            // Test if user has clicked inside of dropdown wrapper
            if(dropdownWrapper.current.contains(e.target)) {
                // Do nothing
                return
            }
            // Close dropdown menu
            setDropdownIsVisible(false);
        }

        // Add listener to window when this component renders
        window.addEventListener('click', handleClick);

        // Remove this listener when the component unmounts
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return { dropdownWrapper };
}

export default useDropdown;