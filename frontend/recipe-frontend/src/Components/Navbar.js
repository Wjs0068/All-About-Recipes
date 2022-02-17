import React, { useState } from "react";
import "./Navbar.css";
import LoginButton from "./Login.js";
import LogoutButton from "./Logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile.js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(true);
  };

  const handleExit = () => {
    setMenu(false);
  };

  if (window.innerWidth > 460) {
    return (
      <div className="navbar-container">
        <div className="navbar-left">
          <h3 className="headerThree1">All About Recipes</h3>
          <img
            alt="logo"
            className="logo"
            src="https://img.icons8.com/doodle/48/000000/bread--v1.png"
          />
        </div>
        <div className="navbar-right">
          <a className="link" href="http://localhost:3000">
            Home
          </a>
          <a className="link" href="http://localhost:3000/form">
            Create
          </a>
          <a className="link" href="http://localhost:3000/getall">
            Recipes
          </a>
          <a className="link" href="http://localhost:3000/myRecipes">
            My Recipes
          </a>
          <Profile />
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    );
  } else {
    return menu ? (
      <div className="whole-thing">
        <div className="navbar-container">
          <div className="navbar-left">
            <AiOutlineClose className="exit" onClick={handleExit} />
          </div>
          <div className="navbar-middle">
            <h3 className="headerThree1">All About Recipes</h3>
          </div>
          <div className="navbar-right">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
        <div className="mobile-menu">
          <a className="link" href="http://localhost:3000">
            Home
          </a>
          <a className="link" href="http://localhost:3000/form">
            Create
          </a>
          <a className="link" href="http://localhost:3000/getall">
            Recipes
          </a>
          <a className="link" href="http://localhost:3000/myRecipes">
            My Recipes
          </a>
        </div>
      </div>
    ) : (
      <div className="whole-thing">
        <div className="navbar-container">
          <div className="navbar-left">
            <AiOutlineMenu className="menu" onClick={handleMenu} />
          </div>
          <div className="navbar-middle">
            <h3 className="headerThree1">All About Recipes</h3>
          </div>
          <div className="navbar-right">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
