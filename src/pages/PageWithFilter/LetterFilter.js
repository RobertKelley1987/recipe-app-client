import './LetterFilter.scss';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const configLetterClass = (firstLetter, letter) => {
    let className = 'letter-filter__letter';
    // convert both letters to lowercase
    firstLetter = !firstLetter ? '' : firstLetter.toLowerCase(); 
    letter = !letter ? '' : letter.toLowerCase();
    // if letters are equal, add green class, otherwise return original class name
    return firstLetter === letter ? className += ' letter-filter__letter--green' : className;
}
const LetterFilter = ({ firstLetter, setFirstLetter }) => {
    return (
        <div className="letter-filter">
            {<span className={configLetterClass(firstLetter, '')} onClick={() => setFirstLetter('')}>All</span>}
            {ALPHABET.map(letter => <span className={configLetterClass(firstLetter, letter)} key={letter} onClick={() => setFirstLetter(letter)}>{letter}</span>)}
        </div>
    );
}

export default LetterFilter;