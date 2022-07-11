import EmptyMessage from '../EmptyMessage';
import Squares from "../Squares/Squares";

const EditListPageRecipes = ({ list }) => {
    if(list.recipes.length > 0) {
        return <Squares items={list.recipes} resultType='recipe' />
    } else {
        return <EmptyMessage 
                    message='Your list is empty! Use the search bar below to find recipes and add them to your list.' 
                    morePadding={true}
                />;
    }
}

export default EditListPageRecipes;