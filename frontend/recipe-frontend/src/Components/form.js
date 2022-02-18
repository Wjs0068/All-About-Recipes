import React, { useState } from "react";
import axios from "axios";
import "./form.css";
import { useAuth0 } from "@auth0/auth0-react";

function Form() {
  const [ingredientList, setIngredientList] = useState([
    { name: "", amount: "" },
  ]);

  const { user } = useAuth0();

  const [recipe, setRecipe] = useState({
    name: "",
    cuisine: "",
    ingredients: [{ name: "", amount: "" }],
    description: "",
    imageUrl: "",
    stars: "",
    user: user.email,
  });

  const createRecipe = () => {
    axios
      .post("https://all-about-recipes.herokuapp.com/recipe", recipe)
      .then(() => {
        window.location.reload(false);
      });
  };

  console.log(ingredientList);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredientList];
    list[index][name] = value;
    setIngredientList(list);
    setRecipe({ ...recipe, ingredients: list });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index, e) => {
    e.preventDefault();
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setIngredientList([...ingredientList, { name: "", amount: "" }]);
  };

  return (
    <div className="container-form">
      <form className="form-create">
        <br />
        <input
          placeholder="Dish Name"
          label="Name"
          className="input-form"
          value={recipe.name}
          onChange={(event) => {
            setRecipe({ ...recipe, name: event.target.value });
          }}
        ></input>
        <br />
        <br />
        <input
          placeholder="Cuisine"
          className="input-form"
          label="Catergory"
          value={recipe.cuisine}
          onChange={(event) => {
            setRecipe({ ...recipe, cuisine: event.target.value });
          }}
        ></input>
        <br />
        {ingredientList.map((x, i) => {
          return (
            <div className="ingredient-container">
              <input
                className="input-form"
                name="name"
                placeholder="Enter Ingredient"
                value={x.name}
                onChange={(e) => handleInputChange(e, i)}
              ></input>

              <input
                className="input-form"
                name="amount"
                placeholder="Please enter the amount"
                value={x.amount}
                onChange={(e) => handleInputChange(e, i)}
              ></input>

              {ingredientList.length !== 1 && (
                <button
                  className="remove"
                  onClick={(e) => {
                    handleRemoveClick(i, e);
                  }}
                >
                  Remove
                </button>
              )}
              {ingredientList.length - 1 === i && (
                <button className="add" onClick={handleAddClick}>
                  Add
                </button>
              )}
            </div>
          );
        })}
        <br />
        <br />
        <textarea
          placeholder="Recipe Details"
          className="input-form"
          label="Description"
          value={recipe.description}
          onChange={(event) => {
            setRecipe({ ...recipe, description: event.target.value });
          }}
        ></textarea>
        <br />
        <br />
        <input
          placeholder="Image Url"
          className="input-form"
          label="Image Url"
          value={recipe.imageUrl}
          onChange={(event) => {
            setRecipe({ ...recipe, imageUrl: event.target.value });
          }}
        ></input>{" "}
        <br />
        <br />
        <input
          className="input-form"
          label="Stars"
          placeholder="Rating out of 5"
          value={recipe.stars}
          onChange={(event) => {
            setRecipe({ ...recipe, stars: event.target.value });
          }}
        ></input>
        <button className="create-btn" onClick={createRecipe}>
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default Form;
