import axios from 'axios';
import { useEffect, useState } from 'react'; 
import { filterByFirstLetter, filterBySearchTerm } from './util/filter-functions';
import { PROP_NAMES } from './util/parse-api-results';
import BrowseByPage from './BrowseByPage';

const IngredientsPage = () => {
    const [allItems, setAllItems] = useState([]);
    const [firstLetter, setFirstLetter] = useState('A');
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const [letterFilterVisible, setLetterFilterVisible] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const getItems = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            setAllItems(data.meals);
        }
        
        getItems();
    }, []);

    useEffect(() => {
        if(!firstLetter) {
            setFilteredResults([]);
        } else {
            const filteredResults = filterByFirstLetter(allItems, firstLetter, 'strIngredient');
            setFilteredResults(filteredResults);
        }
    }, [firstLetter, allItems]);

    useEffect(() => {
        let timeoutId;

        if(filterTerm) {
            timeoutId = setTimeout(() => {
                filterBySearchTerm(allItems, setFilteredResults, PROP_NAMES['ingredient'].nameProp, filterTerm);
            }, 400);
        }

        return () => clearTimeout(timeoutId);
    }, [filterTerm]);

    useEffect(() => {
        if(searchVisible) {
            setFirstLetter('');
            setLetterFilterVisible(false);
        } else {
            setFirstLetter('A');
            setLetterFilterVisible(true);
        }
    }, [searchVisible])

    return <BrowseByPage 
                allItems={allItems}
                filteredResults={filteredResults}
                filterTerm={filterTerm}
                filterType='ingredient' 
                firstLetter={firstLetter}
                items={firstLetter ? filteredResults : allItems}
                letterFilterVisible={letterFilterVisible}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible} 
                setFilteredResults={setFilteredResults}
                setFilterTerm={setFilterTerm}
                setFirstLetter={setFirstLetter} 
            />
}

export default IngredientsPage;