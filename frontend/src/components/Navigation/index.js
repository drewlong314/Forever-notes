import React, { useEffect, useState } from "react";
import { NavLink, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import { getNotebooks } from "../../store/notebooks";
import { csrfFetch } from "../../store/csrf";
import SearchPage from "../SearchPage";

function Navigation({ isLoaded }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const [searchInput, setSearchInput] = useState('')

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

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotebooks(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const searchSubmit = async (string) => {
    const data = { string, id: sessionUser.id };
    const res = await csrfFetch(`/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    history.push('/search', { json });
  };

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navUser}>{isLoaded && sessionLinks}</li>
        <li className={styles.navSearchContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchSubmit(searchInput);
              console.log("The form submitted!");
            }}
          >
            <input
              className={styles.navSearch}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search"
            ></input>
          </form>
        </li>
        <li className={styles.navButton}>
          <button
            onClick={() =>
              dispatch(createNote(sessionUser.id, notebooks[0].id))
            }
          >
            + New Note
          </button>
        </li>
        <li className={styles.navLi}>
          <NavLink className={styles.navAnchor} exact to="/">
            Home
          </NavLink>
        </li>
        <li className={styles.navLi}>
          <NavLink className={styles.navAnchor} exact to="/notes">
            Notes
          </NavLink>
        </li>
        <li className={styles.navLi}>
          <NavLink className={styles.navAnchor} exact to="/notebooks">
            Notebooks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
