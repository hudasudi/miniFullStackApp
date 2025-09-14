import { useState, useEffect } from "react";

function Recipe() {
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        setRecipe(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecipe();
  }, []);

  const handleForm = async () => {};

  return (
    <div>
      <main />
      <h2>My Favourite Recipes</h2>
      <Recipe />
      <h3>Add a new recipe:</h3>
      <form action="" />
      <label for="name">Name: </label>
      <input type="text" name="name" id="name" />
      <br />
      <label for="cuisine">Cuisine: </label>
      <input type="text" name="cuisine" id="cuisine" />
      <br />
      <label for="time">Time: </label>
      <input type="text" name="time" id="time" />
      <br />
      <label for="ingredients">Ingredients (each on a new line): </label>
      <textarea name="ingredients" id="ingredients"></textarea>
      <br />
      <label for="steps">Steps (each on a new line): </label>
      <textarea name="steps" id="steps"></textarea>
      <br />
      <input type="submit" value="Save Recipe" />

      <ul id="recipe-list">
        {recipe.map((r, index) => {
          <li key={index}>{r}</li>;
        })}
      </ul>
    </div>
  );
}
export default Recipe;
