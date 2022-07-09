import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListSquares from './ListSquares';

const ListsPage = ({ userId, lists }) => {
    const navigate = useNavigate();

    const createNewList = async () => {
        const { data } = await axios.post(`/users/${userId}/lists`);
        if(data.listId) {
            navigate(`/lists/${data.listId}`); 
        }
    }

    return (
        <main className="lists-page">
           
            <h1>your lists</h1>
            <button onClick={createNewList}>New List</button>
             
            <div>
                <ListSquares lists={lists} />
            </div>
        </main>
    )
}

export default ListsPage;