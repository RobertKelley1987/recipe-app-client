import { useEffect, useState } from 'react'; 
import axios from 'axios';
import BrowseByPage from './BrowseByPage';

const CuisinesPage = () => {
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        const getCuisines = async () => {
            const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            setCuisines(data.meals);
        }
        
        getCuisines();
    }, [])

    return <BrowseByPage filterType='cuisine' items={cuisines} />;
}

export default CuisinesPage;