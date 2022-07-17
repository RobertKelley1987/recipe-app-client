import EmptyMessage from '../../components/EmptyMessage';
import RecipeSquares from '../../components/RecipeSquares';

const renderEmptyMessage = filterTerm => {
    if(!filterTerm) {
        return <EmptyMessage 
            message='Your list is empty! Use the search bar below to find recipes and add them to your list.'
        />;
    } else {
        return <EmptyMessage 
            message='There are no recipes matching your search term within this list.'  
        />;
    }
}

const Recipes = props => { 
    const { filterTerm, recipes } = props;
    if(recipes.length > 0) {
        return <RecipeSquares {...props} items={recipes} resultType='recipe' />
    } else {
        return renderEmptyMessage(filterTerm);
    }
}

export default Recipes;