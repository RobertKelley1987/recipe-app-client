import ListSquare from './ListSquare';
import './ListSquares.scss';

const ListSquares = props => {
    const { items: lists } = props;

    return (
        <div className="list-squares">
            {lists.map(list => <ListSquare {...props} key={list._id} list={list} />)}
        </div>
    );
}

export default ListSquares;