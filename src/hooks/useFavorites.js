import { useEffect, useState } from "react";
import Favorite from "../services/Favorite";

const useFavorites = userId => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch all favorites from app server
        const getFavorites = async userId => {      
            const data = await Favorite.getAll(userId);
            setFavorites(data.favorites);
        }

        if(userId) {
            getFavorites(userId);
        }
    }, [userId]);

    return [favorites, setFavorites];
}

export default useFavorites;