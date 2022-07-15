export const capitalize = (str) => {
    let arr = str.split(' ');
    arr = arr.map(word => word[0].toUpperCase() + word.slice(1, word.length).toLowerCase());
    return arr.join(' ');
}