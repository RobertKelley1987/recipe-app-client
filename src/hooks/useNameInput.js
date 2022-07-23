import { useEffect, useRef } from 'react';    

const useNameInput = (editingName, turnOffEditMode) => {
    const nameInput = useRef(null);

    // Add event listener to close input if user clicks outside of it
    useEffect(() => {
        const closeForm = e => {
            // Test if user clicked inside of name input
            if (nameInput.current.contains(e.target)) {
                // Stop function
                return
            }
            // Otherwise, hide input field
            turnOffEditMode();
        }

        // When component renders, add event listener
        document.body.addEventListener('click', closeForm);

        // Remove event listener when component unmounts
        return () => document.body.removeEventListener('click', closeForm);
    }, [editingName, turnOffEditMode]);

    // Add focus to name when edit mode is on
    useEffect(() => {
        editingName && nameInput.current.focus();
    }, [editingName]);

    return { nameInput };
}

export default useNameInput;
    
    

