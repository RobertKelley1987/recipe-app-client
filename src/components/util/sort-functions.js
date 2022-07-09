export const sortIngredients = (a, b) => {
    let ingA = a.strIngredient.toLowerCase();
    let ingB = b.strIngredient.toLowerCase();
    if(ingA < ingB) {
        return -1;
    } else if (ingA > ingB) {
        return 1;
    } else {
        return 0;
    }
}