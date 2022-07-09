
import { PLURAL_TYPES } from './util/plural-types';
import Square from './Square/Square';
import './Squares.scss';
import { getApiURL, getResultId, getResultName } from './util/parse-api-results';

const Squares = props => {
    const { items, resultType } = props;
    return (
        <div className="squares">
            {items.map(item => {
                return <Square 
                            key={getResultId(item, resultType)} 
                            linkURL={`/${PLURAL_TYPES[resultType]}/${getResultId(item, resultType)}`} 
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