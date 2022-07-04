const ArrowLeftSVG = ({ className, handleClick }) => {
    return (
        <svg className={className} onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
        </svg>
    );
}

export default ArrowLeftSVG;