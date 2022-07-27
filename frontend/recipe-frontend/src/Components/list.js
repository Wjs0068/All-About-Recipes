import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import { FaStar } from "react-icons/fa";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function List() {
  const [recipeList, setRecipeList] = useState([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipe/getall/${page}`)
      .then((allRecipes) => {
        console.log(allRecipes.data.amount);

        setRecipeList(allRecipes.data.item);
        setAmount(allRecipes.data.amount);
      });
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
    window.scroll({ top: 0, left: 0 });
  };

  //I want to be able to search by keyword and by Cuisine

  return (
    <>
      <div className="list-container__headerAll--container">
        <h2 className="headerAll">All Recipes</h2>
      </div>
      <div className="list-container">
        {recipeList.map((recipe, key) => {
          return (
            <div className="flip-card">
              <div className="flip-card-inner" key={key}>
                <div className="flip-card-front">
                  <img
                    className="image"
                    alt="Recipe"
                    srcSet={recipe.imageUrl}
                  ></img>
                  <h3 className="headerThree">{recipe.name}</h3>
                  <h4 className="headerFour">{recipe.cuisine}</h4>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <FaStar
                        className="stars"
                        color={ratingValue <= recipe.stars ? "#ffc107" : "#888"}
                      />
                    );
                  })}
                </div>

                <div className="flip-card-back">
                  <h5 className="headerFive">Ingredients</h5>
                  <div className="ingredient-container1">
                    {recipe.ingredients.map((arrayItems) => {
                      const { name, amount } = arrayItems;
                      return (
                        <div className="ingredient">
                          <p className="ingredient-name">{name}</p>

                          <p className="ingredient-amount">{amount}</p>
                        </div>
                      );
                    })}
                  </div>
                  <h5 className="headerFive">Instructions</h5>
                  <div className="description-container">
                    <p className="description">{recipe.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(amount / 9)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}

export default List;
