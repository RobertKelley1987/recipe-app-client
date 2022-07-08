import FilteredPage from "./FilteredPage";

const FavoritesPage = ({ favorites }) => {
    return <FilteredPage filterType="favorites" recipes={favorites} />
}

export default FavoritesPage;