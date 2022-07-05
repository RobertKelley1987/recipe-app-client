const PlusSVG = ({ className, handleClick }) => {
    return (
        <svg className={className} onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line xmlns="http://www.w3.org/2000/svg" x1="12" y1="5" x2="12" y2="19"/> 
            <line xmlns="http://www.w3.org/2000/svg" x1="5" y1="12" x2="19" y2="12"/>   
        </svg>
    )
}

export default PlusSVG;