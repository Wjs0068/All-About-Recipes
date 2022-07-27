import "./App.css";
import React from "react";
import Form from "./Components/form.js";
import List from "./Components/list.js";
import Navbar from "./Components/Navbar";
import Welcome from "./Components/welcome.js";
import PrivateRouteCreate from "./Components/PrivateRouteCreate.js";
import PrivateRouteList from "./Components/PrivateRouteList";
import PrivateRouteMyList from "./Components/PrivateRouteMyList.js";
import UserRecipes from "./Components/UserRecipes.js";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/" element={<PrivateRouteCreate />}>
          <Route exact path="/form" element={<Form />} />
        </Route>
        <Route path="/" element={<PrivateRouteList />}>
          <Route exact path="/getall" element={<List />} />
        </Route>
        <Route path="/" element={<PrivateRouteMyList />}>
          <Route exact path="/myRecipes" element={<UserRecipes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
