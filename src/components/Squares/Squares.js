import Square from './Square';
import './Squares.scss';
import { getApiURL, getLinkURL, getResultId, getResultName } from '../util/parse-result-props';

const Squares = props => {
    const { items, resultType } = props;
    return (
        <div className="squares">
            {items.map(item => {
                console.log(getApiURL(item, resultType));
                return <Square 
                            key={getResultId(item, resultType)} 
                            linkURL={getLinkURL(item, resultType)} 
                            listLength={item.recipes && item.recipes.length} 
                            resultType={resultType}
                            searchURL={getApiURL(item, resultType)}
                            title={getResultName(item, resultType)}
                        />
            })}
        </div>
    );
}

export default Squares;