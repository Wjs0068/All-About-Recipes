import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recipeRouters from "./routes/recipe.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recipe", recipeRouters);

mongoose.connect(process.env.MONGO_CLIENT);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port`);
});
