import EmptyMessage from '../../components/EmptyMessage';
import RecipeSquares from '../../components/RecipeSquares';

const Recipes = props => { 
    const { list : { recipes } } = props;
    if(recipes.length > 0) {
        return <RecipeSquares {...props} items={recipes} resultType='recipe' />
    } else {
        return <EmptyMessage 
                    message='Your list is empty! Use the search bar below to find recipes and add them to your list.' 
                    morePadding={true}
                />;
    }
}

export default Recipes;