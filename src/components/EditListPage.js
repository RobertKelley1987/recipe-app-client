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

    useEffect(() => {
        if(list && list.recipes < 1) {
            setSearchIsVisible(true);
        }
    }, [list])

    return list && (
        <main className="edit-list-page">
            <header>
                <h1 className="edit-list-page__list-name">{list.name}</h1>
            </header>
            <div className="edit-list-page__list-grid">
                {list.recipes.map(recipeId => <RecipeSquare key={recipeId} recipeId={recipeId} />)}
            </div>
            {searchIsVisible 
                ? <SearchSection listId={listId} list={list} setList={setList} setSearchIsVisible={setSearchIsVisible}/> 
                : <span onClick={() => setSearchIsVisible(true)} className="edit-list-page__find-recipes">Find Recipes</span>
            }
        </main>
    )
}

export default EditListPage;