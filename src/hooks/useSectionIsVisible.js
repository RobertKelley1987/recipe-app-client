import { useEffect, useState } from 'react';

const useSectionIsVisible = (resultType, resultTypeVisible) => {
    const [sectionIsVisible, setSectionIsVisible] = useState(true);

    useEffect(() => {
        // Test if results are filtered for one result type, and if this section will display
        // that result type
        if(resultTypeVisible && (resultTypeVisible !== resultType)) {
            // Set visibility state to false
            setSectionIsVisible(false);
        } else {
            // Set visibility state to true
            setSectionIsVisible(true);
        }
    },[resultType, resultTypeVisible]);

    return { sectionIsVisible };
}

export default useSectionIsVisible;