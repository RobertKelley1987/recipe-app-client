import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRecipe from '../../hooks/useRecipe';
import IngredientsSection from './IngredientsSection';
import LoadingWrapper from '../../components/LoadingWrapper';
import PrepSection from './PrepSection';
import RecipeCardXL from '../../components/RecipeCardXL'; 
import './RecipePage.scss';

const RecipePage = props => {
    const { recipeId } = useParams();
    const { recipe } = useRecipe(recipeId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LoadingWrapper isLoading={!recipe}>
            <main className="recipe-page">
                <RecipeCardXL {...props} isHeader={true} recipe={recipe} />
                <IngredientsSection recipe={recipe} />
                <PrepSection recipe={recipe} />
            </main>
        </LoadingWrapper>
    )
}

export default RecipePage;