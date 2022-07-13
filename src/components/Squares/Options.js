import HeartSVG from '../SVGs/HeartSVG';
import MoreSVG from '../SVGs/MoreSVG';

const Options = props => {
    const { resultType } = props;
    const isList = resultType === 'list';
    const isRecipe = resultType === 'recipe' || resultType === 'favorite'; 
    if(isRecipe || isList) {
        return (
            <div className="square__options">
                {isRecipe && <HeartSVG className="square__svg" {...props} />}
                <MoreSVG className="square__svg" />
            </div>
        )
    }
}

export default Options;