const HamburgerSVG = ({ className, handleClick }) => {
    return (
        <svg className={className} onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line xmlns="http://www.w3.org/2000/svg" x1="3" y1="12" x2="21" y2="12"/>
            <line xmlns="http://www.w3.org/2000/svg" x1="3" y1="6" x2="21" y2="6"/>
            <line xmlns="http://www.w3.org/2000/svg" x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    )
}

export default HamburgerSVG;