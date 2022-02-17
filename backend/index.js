import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recipeRouters from "./routes/recipe.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recipe", recipeRouters);

mongoose.connect(process.env.MONGODB_CLIENT_URL);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
