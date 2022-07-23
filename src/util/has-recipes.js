// Function returns booolean indicating whether or not a user's list is empty or has recipes
export const hasRecipes = list => list && list.recipes && list.recipes.length > 0;