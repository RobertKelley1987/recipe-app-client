import { PLURAL_TYPES } from '../../util/plural-types';
import { configClassNames } from '../../util/config-classnames';
import './FilterOptions.scss'

const RESULT_TYPES = ['', 'category', 'cuisine', 'ingredient', 'list', 'recipe']

const FilterOptions = ({ resultTypeVisible, setResultTypeVisible }) => {
    return (
        <div className="filter-options">
            {/* A filter button each result type. A cuisine button to show only
            cuisine results, a recipe button to show only recipe results, etc... */}
            {RESULT_TYPES.map(resultType => {
                return (
                    <button 
                        className={configClassNames('filter-options__button', resultType === resultTypeVisible, 'green')} 
                        key={resultType} onClick={() => setResultTypeVisible(resultType)}
                    >
                        {!resultType ? 'All' : PLURAL_TYPES[resultType]}
                    </button>
                );
            })}
        </div>
    )
}

export default FilterOptions;
