import express from 'express';
import ViteExpress from 'vite-express';
import { Author, Recipe, Ingredient, Recipe_ingredient } from './models/model.js';

const app = express();

app.use(express.json());

//get /recipe
//post /recipe
//get /ingredient
//post /ingredient

app.get('/recipes', async (req,res) => {
    const recipeArray = await Recipe.findAll();

    // for each recipe object
    for (let i = 0; i < recipeArray.length; i++) {
        let recipe = recipeArray[i];

        //get all the recipe_ingredients entries associated with this recipe and put them in array
        let recipeIngredientsArray = await recipe.getRecipe_ingredients();

        //make an array to hold my ingredients when i get them
        let ingredients =[];
        
        //for each recipe_ingredient entry associated with the current recipe
        for(let k = 0; k < recipeIngredientsArray.length; k++) {
            let recipeIngredient = recipeIngredientsArray[k];

            //get the ingredient associated with this recipe_ingredient entry
            let ingredient = await recipeIngredient.getIngredient();

            //make sure to add the quantity to the ingredient
            ingredient.dataValues.quantity = recipeIngredient.dataValues.quantity;

            //add it to my ingredients array for this recipe
            ingredients.push(ingredient.dataValues);
        }

        //now i have all ingredients assoc to the recipe make the ingred par of the recipe data
        recipeArray[i].dataValues.ingredients = ingredients;
    };

    res.send(recipeArray);
})


ViteExpress.listen(app, 8372, () => {
    console.log('App is up on 8372');
});