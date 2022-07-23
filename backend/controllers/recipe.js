import RecipeData from "../models/recipes.js";

export const getRecipes = async (req, res) => {
  const resultsPerPage = 9;
  let page = req.params.page >= 1 ? req.params.page : 1;
  const query = req.query.search;
  page = page - 1;
  const estimate = await RecipeData.estimatedDocumentCount();
  console.log(estimate);

  const allRecipes = await RecipeData.find()
    .limit(resultsPerPage)
    .skip(resultsPerPage * page);

  console.log(allRecipes);
  try {
    res.status(200).json({ item: allRecipes, amount: estimate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecipeByUser = async (req, res) => {
  const email = req.params.email;
  console.log(email);

  const userRecipes = await RecipeData.find({ user: email });
  try {
    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new RecipeData(recipe);
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    await RecipeData.findByIdAndDelete(id).exec();
    res.send("successfully deleted");
  } catch (error) {
    console.log(error);
  }
};

export const editRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await RecipeData.find({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const changeRecipe = async (req, res) => {
  const data = req.body;
  console.log(req.body[0]._id);

  try {
    await RecipeData.findByIdAndUpdate({ _id: req.body[0]._id }, data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
