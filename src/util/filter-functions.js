// Filter a list to include items starting with a specified letter
export const filterByFirstLetter = (items, letter, nameProp) => {
    return items.filter(item => item[nameProp][0].toLowerCase() === letter.toLowerCase());
}

// Filter a list of items by a specified search term, then update state for that item
export const filterBySearchTerm = (allItems, nameProp, searchTerm) => {
    let results;
    
     // Test if term is one letter long
    if(searchTerm.length === 1) {
        // Only show items starting with that letter 
        results = filterByFirstLetter(allItems, searchTerm, nameProp);
    } else { // ... otherwise show all results that include search term
        results = allItems.filter(item => {
            if(item[nameProp].toLowerCase().includes(searchTerm.toLowerCase())) {
                return item;
            }
            return false;
        });
    };

   return results;
}