import { PLURAL_TYPES } from '../../util/plural-types';
import './FilterOptions.scss'

const RESULT_TYPES = ['', 'category', 'cuisine', 'ingredient', 'list', 'recipe']

const configClassNames = (resultType, resultTypeVisible) => {
    let classNames = 'filter-options__button';
    if(resultType === resultTypeVisible) {
        classNames += ' filter-options__button--green';
    }
    return classNames;
} 
const FilterOptions = ({ resultTypeVisible, setResultTypeVisible }) => {
    return (
        <div className="filter-options">
            {/* A filter button each result type. A cuisine button to show only
            cuisine results, a recipe button to show only recipe results, etc... */}
            {RESULT_TYPES.map(resultType => {
                return (
                    <button className={configClassNames(resultType, resultTypeVisible)} key={resultType} onClick={() => setResultTypeVisible(resultType)}>
                        {!resultType ? 'All' : PLURAL_TYPES[resultType]}
                    </button>
                );
            })}
        </div>
    )
}

export default FilterOptions;
