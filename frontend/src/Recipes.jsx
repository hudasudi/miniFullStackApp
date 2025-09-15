import { useState, useEffect } from "react";

function Recipes() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Error fechting recipes", err));
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    const newRecipe = {
      name: e.target.name.value,
      cuisine: e.target.cuisine.value,
      time: e.target.time.value,
      ingredients: e.target.ingredients.value.split(/\r?\n/), //split every new lin chars
      steps: e.target.steps.value.split(/\r?\n/),
    };

    await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //obj -> json
      body: JSON.stringify(newRecipe),
    });

    const res = await fetch("http://localhost:3000/recipes");
    const updated = await res.json();

    setRecipe(updated);
    console.log(updated);

    e.target.reset();
  };
  return (
    <div>
      <main>
        <h1>My Favourite Recipes</h1>
        <h2>Add a new recipe:</h2>

        <form onSubmit={handleForm}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" />
          <br />
          <label htmlFor="cuisine">Cuisine: </label>
          <input type="text" name="cuisine" id="cuisine" />
          <br />
          <label htmlFor="time">Time: </label>
          <input type="text" name="time" id="time" />
          <br />
          <label htmlFor="ingredients">
            Ingredients (each on a new line):{" "}
          </label>
          <textarea name="ingredients" id="ingredients"></textarea>
          <br />
          <label htmlFor="steps">Steps (each on a new line): </label>
          <textarea name="steps" id="steps"></textarea>
          <br />
          <input type="submit" value="Save/Add Recipe" />
        </form>

        <ul>
          {recipe.map((r, index) => (
            <li key={index}>
              <h3>Recipe: {r.name}</h3>
              <p>
                <strong>Cuisine: {r.cuisine}</strong>
              </p>
              <p>
                <strong>Time: {r.time}</strong>
              </p>

              <h4>Ingredients</h4>
              <ul>
                {r.ingredients &&
                  r.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}
              </ul>

              <h5>Steps</h5>
              <ol>{r.steps && r.steps.map((s, k) => <li key={k}>{s}</li>)}</ol>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
export default Recipes;
