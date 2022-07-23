import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTypingFilter from '../../hooks/useTypingFilter';
import Recipes from './Recipes';
import Search from './Search';
import ListHeading from './ListHeading';
import './EditListPage.scss';
import LoadingWrapper from '../../components/LoadingWrapper';

const EditListPage = props => {
    const { list, getList, setList } = props;
    const { listId } = useParams();
    // Track whether filter function with timeout is in use
    const [isLoading, setIsLoading] = useState(false);
    // Track whether filter by name input is visible
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    // Track whether search section is visible on screen
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    // Search term to filter recipes by
    const [filterTerm, setFilterTerm] = useState('');
    // Recipes filtered by search term
    const { filteredRecipes } = useTypingFilter(list && list.recipes, filterTerm, setIsLoading);

    // Scroll to top on initial render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update list on initial render
    useEffect(() => {
        getList(listId);
    }, [listId]);

    // Make search section visible if user's list is empty
    useEffect(() => {
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

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
                list={list}
                setList={setList}
                setFilterIsVisible={setFilterIsVisible}
                setFilterTerm={setFilterTerm} 
                setSearchIsVisible={setSearchIsVisible}
            />
            <LoadingWrapper isLoading={filterTerm ? isLoading : false}>
                <Recipes {...props} filterTerm={filterTerm} recipes={filterTerm ? filteredRecipes : list.recipes} />
            </LoadingWrapper>
            <Search {...props} list={list} setList={setList} searchIsVisible={searchIsVisible} setSearchIsVisible={setSearchIsVisible} />
        </main>
    )
}

export default EditListPage;