import ListSquare from './ListSquare';
import './ListSquares.scss';

const ListSquares = props => {
    const { lists } = props;

    return (
        <div className="list-squares">
            {lists.map(list => {
                return <ListSquare 
                            {...props}
                            key={list._id}
                            list={list}  
                            searchURL={list.recipes.length > 0 && `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${list.recipes[0].apiId}`}
                        />
            })}
        </div>
    );
}

export default ListSquares;