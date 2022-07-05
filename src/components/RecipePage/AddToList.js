import axios from 'axios';
import { useEffect, useState } from 'react';
import './AddToList.scss';

const List = ({ list, recipeId, setModalIsVisible, setSuccessMessage }) => {
    const handleClick = async () => {
        const { data } = await axios.post(`/lists/${list._id}/recipes`, { recipeId: recipeId});
        if(data.list._id) {
            setSuccessMessage(`Recipe added to ${data.list.name}`);
            setModalIsVisible(false);
        }
    }

    return <li onClick={handleClick}>{list.name}</li>
}

const AddToList = ({ recipeId, setModalIsVisible, setSuccessMessage, userId }) => {
    const [lists, setLists] = useState([]);

    // Get all list data when component first loads and save to component's state
    useEffect(() => {
        const getLists = async () => {
            const { data } = await axios.get(`/users/${userId}/lists`);
            setLists(data.lists);
        }

        getLists();
    }, [userId]);

    return lists && (
        <div className="add-to-list">
            <h2>Add To List</h2>
            <ul>
                {lists.map(list => <List list={list} recipeId={recipeId} setModalIsVisible={setModalIsVisible} setSuccessMessage={setSuccessMessage} />)}
            </ul>
        </div>
    );
}

export default AddToList;