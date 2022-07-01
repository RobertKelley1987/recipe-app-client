import './PrepSection.scss';

const filterInstructions = instructions => instructions.split('\r\n');

const PrepSection = ({ recipe }) => {
    console.log(filterInstructions(recipe.strInstructions));

    return (
        <section className="prep-section">
            <h1 className="prep-section__heading">how to prepare</h1>
            {filterInstructions(recipe.strInstructions).map((instruction, index) => {
                if(instruction !== '' || instruction !== ' ') {
                    return <p key={index} className="prep-section__instructions">{instruction}</p>
                }
            })}
            
        </section>
    )
}

export default PrepSection;