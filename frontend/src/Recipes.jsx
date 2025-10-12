import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Recipes() {
  const [recipe, setRecipe] = useState([]);

  const canvaRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Error fechting recipes", err));
  }, []);

  useEffect(() => {
    const cuisineChart = async () => {
      const cuisineResponse = await fetch("http://localhost:3000/cuisine-data");
      const cuisineData = await cuisineResponse.json();

      const xValue = Object.keys(cuisineData);
      const yValue = Object.values(cuisineData);

      const ctx = canvaRef.current.getContext("2d");

      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: xValue,
          datasets: [
            {
              data: yValue,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Cuisine Popularity",
          },
        },
      });
      return () => chart.destroy(); // clean up
    };
    cuisineChart();
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

        <div className="container">
          <div className="form">
            <form onSubmit={handleForm}>
              <h2>Add a new recipe:</h2>

              <div className="form-row">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" />
              </div>
              <br />
              <div className="form-row">
                <label htmlFor="cuisine">Cuisine: </label>
                <input type="text" name="cuisine" id="cuisine" />
              </div>
              <br />
              <div className="form-row">
                <label htmlFor="time">Time: </label>
                <input type="text" name="time" id="time" />
              </div>
              <br />
              <div className="form-row">
                <label htmlFor="ingredients">
                  Ingredients (each on a new line):{" "}
                </label>
                <textarea name="ingredients" id="ingredients"></textarea>
              </div>
              <br />
              <div className="form-row">
                <label htmlFor="steps">Steps (each on a new line): </label>
                <textarea name="steps" id="steps"></textarea>
              </div>
              <br />
              <div className="btn">
                <input type="submit" value="Save Recipe" />
              </div>
            </form>
          </div>

          <div className="chart">
            <canvas id="myChart" ref={canvaRef}></canvas>
          </div>

          <div className="cards">
            {recipe.map((r, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <h3>Recipe: {r.name}</h3>
                  <p>
                    <strong>Cuisine:</strong> {r.cuisine}
                  </p>
                  <p>
                    <strong>Time:</strong> {r.time}
                  </p>

                  <h4>Ingredients</h4>
                  <ul>
                    {r.ingredients?.map((ing, j) => (
                      <li key={j}>{ing}</li>
                    ))}
                  </ul>

                  <h5>Steps</h5>
                  <ol>
                    {r.steps?.map((s, k) => (
                      <li key={k}>{s}</li>
                    ))}
                  </ol>
                  <div>
                    <button>Delete Recipe</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Recipes;
