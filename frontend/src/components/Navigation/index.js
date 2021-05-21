import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav>
      <ul className={styles.navList}>
        <li>{isLoaded && sessionLinks}</li>
        <li>
          <form class="search-bar"></form>
            <input type='text' placeholder='Search'></input>
        </li>
        <li>
          <button>+ New Note</button>
        </li>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notes">
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notebooks">
            Notebooks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
