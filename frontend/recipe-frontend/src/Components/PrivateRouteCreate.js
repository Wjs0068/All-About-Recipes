import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Form from "./form.js";

const PrivateRouteCreate = () => (
  <div>
    <Form />
  </div>
);

export default withAuthenticationRequired(PrivateRouteCreate, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (
    <div className="loading-container">
      <p className="loading">Loading...</p>
    </div>
  ),
});
