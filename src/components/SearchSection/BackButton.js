import ArrowLeftSVG from '../SVGs/ArrowLeftSVG';
import './BackButton.scss';

const BackButton = ({ setFilteredRecipes, setFilteredBy, setFilterType }) => {
    const clearFilter = () => {
        setFilteredRecipes([]);
        setFilteredBy('');
        setFilterType('');
    }

    return (
        <div onClick={clearFilter} className='back-button'>
            <ArrowLeftSVG className='back-button__svg' />
            Back
        </div>
    )
}

export default BackButton;