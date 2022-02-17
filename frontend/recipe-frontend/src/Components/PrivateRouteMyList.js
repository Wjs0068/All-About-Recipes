import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import UserRecipes from "./UserRecipes.js";
import "./PrivateRouteList.css";

const PrivateRouteMyList = () => (
  <div>
    <UserRecipes />
  </div>
);

export default withAuthenticationRequired(PrivateRouteMyList, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (
    <div className="loading-container">
      <p className="loading">Loading...</p>
    </div>
  ),
});
