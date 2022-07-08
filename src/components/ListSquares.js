import Square from './Square/Square';

const ListSquares = ({ lists }) => {
    return lists.map(list => {
        console.log(lists);
        return <Square 
                    key={list._id} 
                    linkURL={`/lists/${list._id}`} 
                    listLength={list.recipes.length} 
                    searchURL={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${list.recipes[0].apiId}`}
                    title={list.name}
                />
    });
}

export default ListSquares;