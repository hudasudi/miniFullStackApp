const express = require("express"); // load express
const app = express(); // create express application
const port = 3000;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors()); // add middleware so my backend can accept req from diff origins
app.use(express.json()); // add another middleware/no need to install anything

const recipesFilePath = path.join(__dirname, "./recipes.json");

//http req/res
app.get("/", (req, res) => {
  res.send("Hello World, home page here!");
});

app.get("/recipes", (req, res) => {
  //read in the json file to get the recipes
  fs.readFile(recipesFilePath, "utf-8", (err, data) => {
    // we read in the file through the filepath, encoding is added as a sm
    // the err varaible holds errors if there are any
    // the data variable holds the data read in from the file
    // we need to pare the json data to be tured into plain js

    // json -> javascript
    const recipes = JSON.parse(data);
    // javascript -> json
    res.json(recipes);
  });
});
app.get("/cuisine-data", (req, res) => {
  fs.readFile(recipesFilePath, "utf-8", (err, data) => {
    const recipes = JSON.parse(data); // read in recipe json file

    const occurrances = recipes.reduce((accumulator, recipe) => {
      // iterating
      //current
      const currentcuisine = recipe.cuisine;
      //if its existis on the acc obj
      if (accumulator[currentcuisine]) {
        accumulator[currentcuisine] = accumulator[currentcuisine] + 1; // count it
      } else {
        accumulator[currentcuisine] = 1; // set it to 1
      }
      return accumulator;
    }, {}); // empty obj
    console.log(occurrances);
    // json data
    res.json(occurrances);
  });
});

app.post("/recipes", (req, res) => {
  const newRecipe = req.body;
  //open the file/ reads the entier contents of a file
  fs.readFile(recipesFilePath, "utf-8", (err, data) => {
    const recipes = JSON.parse(data);
    recipes.push(newRecipe);

    // javascript -> json
    fs.writeFile(recipesFilePath, JSON.stringify(recipes), () => {});
  });

  res.send("Recipe added, storing your favourite dishes");
});

//start the server on port 3000
app.listen(port, () => {
  console.log("Server is running on http://localhost:", port);
});
