import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipes from './Recipes';
import Search from './Search';
import ListHeading from './ListHeading';
import './EditListPage.scss';
import List from '../../services/List';
import { filterBySearchTerm } from '../../util/filter-functions';
import LoadingWrapper from '../../components/LoadingWrapper';


const EditListPage = props => {
    // Track whether filter function with tomeout is in use
    const [isLoading, setIsLoading] = useState(false);
    // Recipes filtered by search term
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    // Track whether filter by name input is visible
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    // Track whether search section is visible on screen
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    // Search term to filter recipes by
    const [filterTerm, setFilterTerm] = useState('');
    const { listId } = useParams();
    const { list, updateList, userId } = props

    // Scroll to top on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get list data when page first renders
    useEffect(() => {
        const getList = async (listId, userId) => {
            const data = await List.getOne(listId, userId);
            updateList(data.list);
        }

        getList(listId, userId);

        // Clear list data when component unmounts
        return () => updateList(null);
    }, [listId, updateList, userId]);

    // Make search section visible if user's list is empty
    useEffect(() => {
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

    // Update results as user types in filter input
    useEffect(() => {
        // Update loading state
        setIsLoading(true);
        let timeoutId = setTimeout(() => {
            // If filter input is not blank, filter results and update results
            if(filterTerm) {
                filterBySearchTerm(list.recipes, setFilteredRecipes, 'name', filterTerm);
            } else {
                // Otherwise clear results
                setFilteredRecipes([]);
            }
            // Update loading state
            setIsLoading(false);
        }, 400);

        // Clear timeout on each re-render
        return () => clearTimeout(timeoutId);
    }, [filterTerm]);

    // If user opens 'search within list' filter, close search section
    useEffect(() => {
        filterIsVisible && setSearchIsVisible(false)
    }, [filterIsVisible]);

    // Likewise, if user opens search section, close 'search within list' filter
    useEffect(() => {
        searchIsVisible && setFilterIsVisible(false)
    }, [searchIsVisible]);

    return list && (
        <main className="edit-list-page">
            <ListHeading 
                {...props}
                filterIsVisible={filterIsVisible}  
                filterTerm={filterTerm} 
                listId={listId} 
                setFilterIsVisible={setFilterIsVisible}
                setSearchTerm={setFilterTerm} 
                setSearchIsVisible={setSearchIsVisible}
            />
            <LoadingWrapper isLoading={isLoading}>
                <Recipes {...props} filterTerm={filterTerm} recipes={filterTerm ? filteredRecipes : list.recipes} />
            </LoadingWrapper>
            <Search {...props} searchIsVisible={searchIsVisible} setSearchIsVisible={setSearchIsVisible} />
        </main>
    )
}

export default EditListPage;