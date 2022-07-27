import React, { useState } from "react";
import "./Navbar.css";
import LoginButton from "./Login.js";
import LogoutButton from "./Logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile.js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(true);
  };

  const handleExit = () => {
    setMenu(false);
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <button
            onClick={() => {
              window.location.assign("http://localhost:3000");
            }}
            className="headerThree1"
          >
            All About Recipes
          </button>
          <img
            alt="logo"
            className="logo"
            src="https://img.icons8.com/doodle/48/000000/bread--v1.png"
          />
        </div>
        <div className="navbar-right">
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
          <Profile />
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
        <div className="menu-container">
          {menu ? (
            <AiOutlineClose onClick={handleExit} className="exit" />
          ) : (
            <AiOutlineMenu onClick={handleMenu} className="menu" />
          )}
        </div>
      </div>
      <MobileNav menu={menu} />
    </>
  );
};

export default Navbar;
