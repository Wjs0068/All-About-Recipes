import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./list.css";
import "./UserRecipes.css";
import { useAuth0 } from "@auth0/auth0-react";

function UserRecipes() {
  const [recipeList, setRecipeList] = useState([]);
  const [edit, setEdit] = useState(true);
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

  const [ingredientList, setIngredientList] = useState([
    { name: "", amount: "" },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipe/${user.email}`)
      .then((userRecipes) => {
        setRecipeList(userRecipes.data);
      });
  }, [user]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/recipe/${id}`).then(() => {
      window.location.reload(false);
    });
  };

  const handleEdit = (id) => {
    axios.get(`http://localhost:5000/recipe/mine/${id}`).then((userRecipes) => {
      setRecipe(userRecipes.data);
      setIngredientList(userRecipes.data[0].ingredients);
      setEdit(false);
    });
  };

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

  const finishEdit = (id) => {
    setRecipe(recipe);
    axios
      .put(`http://localhost:5000/recipe/change/${id}`, recipe)
      .then((recipe) => {
        window.location.reload(false);

        setEdit(true);
      });
  };

  return (
    <>
      {edit ? (
        <div>
          <h1 className="headerAll">My Recipes</h1>
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
                            color={
                              ratingValue <= recipe.stars ? "#ffc107" : "#888"
                            }
                          />
                        );
                      })}
                    </div>

                    <div className="flip-card-back">
                      <div className="ingredient-container1">
                        <h5 className="headerFive">Ingredients</h5>
                        {recipe.ingredients.map((arrayItems) => {
                          const { name, amount } = arrayItems;
                          return (
                            <div>
                              <div className="ingredient">
                                <p className="ingredient-name">{name}</p>

                                <p className="ingredient-amount">{amount}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <h5 className="headerFive">Instructions</h5>
                      <p className="description">{recipe.description}</p>
                    </div>
                  </div>
                  <div className="edit-btn-container">
                    <button
                      className="delete"
                      onClick={() => handleDelete(recipe._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit"
                      onClick={() => handleEdit(recipe._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container-form">
          <form className="form-create">
            <br />
            <input
              placeholder="Dish Name"
              label="Name"
              className="input-form"
              defaultValue={recipe[0].name}
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
              defaultValue={recipe[0].cuisine}
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
                    defaultValue={x.name}
                    onChange={(e) => handleInputChange(e, i)}
                  ></input>

                  <input
                    className="input-form"
                    name="amount"
                    placeholder="Please enter the amount"
                    defaultValue={x.amount}
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
              defaultValue={recipe[0].description}
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
              defaultValue={recipe[0].imageUrl}
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
              defaultValue={recipe[0].stars}
              onChange={(event) => {
                setRecipe({ ...recipe, stars: event.target.value });
              }}
            ></input>
            <button
              className="create-btn"
              onClick={() => finishEdit(recipe._id)}
            >
              Finish Editing
            </button>
          </form>
        </div>
      )}
    </>
  );
}
export default UserRecipes;
