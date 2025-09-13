//1. make a request that loads in the recipes from our own backend
//2. capture the response value
//3. turn it into js
//4. loop throught each recipe
//5.create the html components for these recipes
//6. populate the text part unsing innertext

//once the dom is loaded, do async functionality
document.addEventListener("DOMContentLoaded", async () => {
  //res obj
  const response = await fetch("http://localhost:3000/recipes");
  // obj -> json data
  const recipes = await response.json();
  //get each recipe
  for (let recipe of recipes) {
    const recipeContainer = document.createElement("div");

    const titleTag = document.createElement("h3");
    titleTag.innerHTML = recipe.name;
    recipeContainer.appendChild(titleTag);

    const cuisineTag = document.createElement("p");
    cuisineTag.innerHTML = recipe.cuisine;
    recipeContainer.appendChild(cuisineTag);

    const timeTag = document.createElement("p");
    timeTag.innerHTML = recipe.time;
    recipeContainer.appendChild(timeTag);
    23;
    const ingredientsListTag = document.createElement("ul");
    //list
    for (ingredient of recipe.ingredients) {
      const ingredientsListItemTag = document.createElement("li");
      ingredientsListItemTag.innerHTML = ingredient;
      ingredientsListTag.appendChild(ingredientsListItemTag);
    }

    recipeContainer.appendChild(ingredientsListTag);

    const stepsListTag = document.createElement("ol");
    //list
    for (step of recipe.steps) {
      const stepsListItemTag = document.createElement("li");
      stepsListItemTag.innerHTML = step;
      stepsListTag.appendChild(stepsListItemTag);
    }

    recipeContainer.appendChild(stepsListTag);

    //recipe list
    const recipeList = document.querySelector("#recipe-list");
    recipeList.append(recipeContainer);
  }

  const recipeForm = document.querySelector("form");
  recipeForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent refreshing the page

    const newRecipe = {};

    newRecipe.name = e.target.name.value;
    newRecipe.cuisine = e.target.cuisine.value;
    newRecipe.time = e.target.time.value;

    const ingredientText = e.target.ingredients.value;
    newRecipe.ingredients = ingredientText.split(/\r?\n/); //split every new lin chars

    const stepsText = e.target.steps.value;
    newRecipe.steps = stepsText.split(/\r?\n/);

    //post req

    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //obj -> json
      body: JSON.stringify(newRecipe),
    });
  });
});
