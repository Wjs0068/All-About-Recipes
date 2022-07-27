import React from "react";
import "./MobileNav.css";
import LoginButton from "./Login.js";
import LogoutButton from "./Logout.js";
import { useAuth0 } from "@auth0/auth0-react";

function MobileNav({ menu }) {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {menu ? (
        <div className="mobile-nav">
          <a className="link" href="/">
            Home
          </a>
          <a className="link" href="/form">
            Create
          </a>
          <a className="link" href="/getall">
            Recipes
          </a>
          <a className="link" href="/myRecipes">
            My Recipes
          </a>
          {isAuthenticated ? (
            <LogoutButton className="logout" />
          ) : (
            <LoginButton className="login" />
          )}
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}

export default MobileNav;
