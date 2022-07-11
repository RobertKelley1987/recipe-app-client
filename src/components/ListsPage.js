import axios from 'axios';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Squares from './Squares/Squares';

const ListsPage = ({ userId, lists }) => {
    const [errorMessage, setErrorMessage] = useState(); 
    const navigate = useNavigate();

    const createNewList = async () => {
        const { data } = await axios.post(`/users/${userId}/lists`);
        if(data.listId) {
            navigate(`/lists/${data.listId}`); 
        } else {
            setErrorMessage('There was an error');
        }
    }

    return (
        <main className="lists-page">
           
            <h1>your lists</h1>
            <button onClick={createNewList}>New List</button>
             
            <div>
                <Squares items={lists} resultType='list' />
            </div>
        </main>
    )
}

export default ListsPage;