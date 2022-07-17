const divideAndCapitalize = (str, char) => {
    // Convert string to array split by char provided
    let arr = str.split(char);
    // Capitalize first letter in each word
    arr = arr.map(word => word[0].toUpperCase() + word.slice(1, word.length));
    // Rejoin array into single string split by char provided
    return arr.join(char);
}

export const capitalize = (str) => {
    // Convert entire string to lowercase
    str = str.toLowerCase();
    // Capitalize char after each space
    str = divideAndCapitalize(str, ' ');
    // Capitalize char after each hyphen
    return divideAndCapitalize(str, '-');
}