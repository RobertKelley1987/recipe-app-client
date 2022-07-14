import './IngredientsSection.scss';

const getIngredients = recipe => {
    let i = 1, ingredientsList = [], outOfIngredients = false;

    while(!outOfIngredients) {
        // Push ingredient with its measurement from recipe onto array
        ingredientsList.push({ name: recipe[`strIngredient${i}`], qty: recipe[`strMeasure${i}`] });

        // Increment counter
        i++;

        // If ingredient is empty OR max ingredients is reached, exit loop
        if(!recipe[`strIngredient${i}`] || i === 20) {
            outOfIngredients = true;
        }
    }

    return ingredientsList;
}

const IngredientsSection = ({ recipe }) => {
    return (
        <section className="ingredients-section">
            <h2 className="ingredients-section__heading">ingredients</h2>
            <ul className="ingredients-section__list">
                {getIngredients(recipe).map(ingredient => {
                    return (
                        <li className="ingredients-section__list-item" key={`${ingredient.qty}-${ingredient.name}`}>
                            <span className="ingredients-section__list-text">{`${ingredient.qty} ${ingredient.name}`}</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default IngredientsSection;