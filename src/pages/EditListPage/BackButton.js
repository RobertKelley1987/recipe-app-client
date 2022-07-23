import ArrowLeftSVG from '../../components/SVGs/ArrowLeftSVG';
import './BackButton.scss';

const BackButton = ({ setFilter }) => {
    return (
        <div onClick={() => setFilter('', [], '')} className='back-button'>
            <ArrowLeftSVG className='back-button__svg' />
            Back
        </div>
    )
}

export default BackButton;