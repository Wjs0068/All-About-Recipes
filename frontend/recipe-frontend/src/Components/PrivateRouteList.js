import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import List from "./list.js";
import "./PrivateRouteList.css";

const PrivateRouteList = () => (
  <div>
    <List />
  </div>
);

export default withAuthenticationRequired(PrivateRouteList, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (
    <div className="loading-container">
      <p className="loading">Loading...</p>
    </div>
  ),
});
