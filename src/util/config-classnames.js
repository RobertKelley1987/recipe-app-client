export const configClassNames = (className, test, bemTag) => {
    return test ? className += ` ${className}--${bemTag}` : className;
} 