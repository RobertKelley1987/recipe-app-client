import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListSquares from './ListSquares';

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
                <ListSquares lists={lists} />
            </section>
        </main>
    )
}

export default ListsPage;