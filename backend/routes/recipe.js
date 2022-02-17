import express from "express";
import {
  getRecipes,
  addRecipe,
  deleteRecipe,
  getRecipeByUser,
  editRecipe,
  changeRecipe,
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/getall/:page", getRecipes);
router.post("/", addRecipe);
router.delete("/:id", deleteRecipe);
router.get("/:email", getRecipeByUser);
router.get("/mine/:id", editRecipe);
router.put("/change/:id", changeRecipe);

export default router;
