import './PrepSection.scss';

const filterInstructions = instructions => instructions.split('\r\n').filter(instruction => {
    if(instruction !== '' || instruction !== ' ') {
        return instruction;
    } else {
        return false;
    }
});

const PrepSection = ({ recipe }) => {
    console.log(filterInstructions(recipe.strInstructions));

    return (
        <section className="prep-section">
            <h1 className="prep-section__heading">how to prepare</h1>
            {filterInstructions(recipe.strInstructions).map((instruction, index) => {
                return <p key={index} className="prep-section__instructions">{instruction}</p>
            })}
            
        </section>
    )
}

export default PrepSection;