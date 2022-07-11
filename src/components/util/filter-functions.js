// Filter a list to include items starting with a specified letter
export const filterByFirstLetter = (items, letter, nameProp) => {
    console.log(items);
    return items.filter(item => item[nameProp][0].toLowerCase() === letter.toLowerCase());
}

// Filter a list of items by a specified search term, then update state for that item
export const filterBySearchTerm = (allItems, setItems, nameProp, searchTerm) => {
    let results;
     // test if term is one letter long
    if(searchTerm.length === 1) {
        // only show items starting with that letter 
        results = filterByFirstLetter(allItems, searchTerm, nameProp);
    } else { // ... otherwise show all results that include search term
        results = allItems.filter(item => {
            if(item[nameProp].toLowerCase().includes(searchTerm.toLowerCase())) {
                console.log('MATCH');
                return item;
            }
        });
    };
    setItems(results);
}