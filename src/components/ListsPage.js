import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListSquare from './ListSquare';

const ListsPage = ({ userId, lists }) => {
    const navigate = useNavigate();

    const createNewList = async () => {
        const { data } = await axios.post(`/users/${userId}/lists`);
        navigate(`/lists/${data.listId}`); 
    }

    return (
        <main className="lists-page">
            <header>
                <h1>your lists</h1>
                <button onClick={createNewList}>New List</button>
            </header>   
            <section>
                {lists.map(list => <ListSquare list={list} />)}
            </section>
        </main>
    )
}

export default ListsPage;