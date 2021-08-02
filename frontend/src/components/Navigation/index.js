import React, { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import { getNotebooks } from "../../store/notebooks";
import { csrfFetch } from "../../store/csrf";
import SearchPage from "../SearchPage";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const [searchInput, setSearchInput] = useState("");
  const [changed, setChanged] = useState(false);

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

  useEffect(() => {
    setChanged(false);
  }, [changed]);

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
    setChanged(true);
    history.push("/search", { json, string });
  };

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navUser}>{sessionLinks}</li>
        <li className={styles.navSearchContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchSubmit(searchInput);
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
        <li className={styles.navButtonLi}>
          <button
            className={styles.navButton}
            onClick={() => {
              if (window.location.href.includes("/notebook/")) {
                const checkNumber = window.location.href.slice(
                  window.location.href.length - 3
                );
                let finalNumber;
                if (checkNumber[0] === "/") finalNumber = checkNumber.slice(1);
                else if (checkNumber[1] === "/")
                  finalNumber = checkNumber.slice(2);
                else finalNumber = checkNumber;
                dispatch(createNote(sessionUser.id, parseInt(finalNumber)));
              } else {
                dispatch(createNote(sessionUser.id, notebooks[0].id));
              }
            }}
          >
            + New Note
          </button>
        </li>
        {/* <li >
          <NavLink className={styles.navAnchor} exact to="/">
            <button className={styles.navLiButton}>Home</button>
          </NavLink>
        </li> */}
        <li>
          <NavLink className={styles.navAnchor} exact to="/notes">
            <button className={styles.navLiButton}>Notes</button>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navAnchor} exact to="/notebooks">
            <button className={styles.navLiButton}>Notebooks</button>
          </NavLink>
        </li>
        <footer className={styles.footer}>
          <a
            className={styles.aboutAnchor}
            href={"https://github.com/drewlong314/Forever-notes"}
          >
            <i className={"fab fa-github-square fa-2x"}></i>
          </a>
          <a
            className={styles.aboutAnchor}
            href={"https://www.linkedin.com/in/drew-long-361772172/"}
          >
            <i className={"fab fa-linkedin fa-2x"}></i>
          </a>
          <a
            className={styles.aboutAnchor}
            href={"https://angel.co/u/drew-long-1"}
          >
            <i className={"fab fa-angellist fa-2x"}></i>
          </a>
          <a
            className={styles.aboutAnchor}
            href={"https://drewlong314.github.io/"}
          >
            <i className={"far fa-user fa-2x"}></i>
          </a>
        </footer>
      </ul>
    </nav>
  );
}

export default Navigation;
