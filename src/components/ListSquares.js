import ListSquare from './ListSquare';

const ListSquares = ({ lists }) => {
    return lists.map(list => <ListSquare key={list._id} list={list} />)
}

export default ListSquares;