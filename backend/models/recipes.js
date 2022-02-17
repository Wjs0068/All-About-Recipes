import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({ name: String, amount: String });

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  ingredients: [ingredientSchema],

  description: String,

  imageUrl: String,

  stars: {
    type: Number,
  },
  user: {
    type: String,
  },
});

const recipeModel = mongoose.model("recipe", recipeSchema);

export default recipeModel;
