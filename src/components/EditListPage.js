import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeSquare from './RecipeSquare';
import SearchSection from './SearchSection';
import './EditListPage.scss';

const EditListPage = () => {
    const [list, setList] = useState(null);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const { id : listId } = useParams();

    useEffect(() => {
        const getList = async () => {
            const { data } = await axios.get(`/lists/${listId}`);
            setList(data.list);
        }

        getList();
    }, [listId]);

    // If user has no recipes in this list, make search section visible
    useEffect(() => {
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list]);

    const renderListGrid = list => {
        if(list.recipes.length > 0){
            return (
                <div className="edit-list-page__list-grid">
                    {list.recipes.map(recipeId => <RecipeSquare key={recipeId} recipeId={recipeId} />)}
                </div>
            );
        } else {
            return (
                <div className="edit-list-page__empty-list">
                    Your list is empty! Use the search bar below to find recipes and add them to your list.
                </div>
            );
        }
    }

    return list && (
        <main className="edit-list-page">
            <header>
                <h1 className="edit-list-page__list-name">{list.name}</h1>
            </header>
            {renderListGrid(list)}
            {searchIsVisible 
                ? <SearchSection listId={listId} list={list} setList={setList} setSearchIsVisible={setSearchIsVisible}/> 
                : <span onClick={() => setSearchIsVisible(true)} className="edit-list-page__find-recipes">Find Recipes</span>
            }
        </main>
    )
}

export default EditListPage;