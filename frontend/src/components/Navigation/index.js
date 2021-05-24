import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import { getNotebooks } from "../../store/notebooks";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));

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

  // useEffect(() => {
  //   if (notebooks === [] && sessionUser.id)
  //   console.log(sessionUser.id, 'line28')
  //   dispatch(getNotebooks(sessionUser.id))
  //   console.log(notebooks, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
  // }, [notebooks, sessionUser])

  return (
    <nav>
      <ul className={styles.navList}>
        <li>{isLoaded && sessionLinks}</li>
        <li>
          <form className="search-bar"></form>
          <input type="text" placeholder="Search"></input>
        </li>
        <li>
          <button onClick={() => dispatch(createNote(sessionUser.id, notebooks[0].id))}>+ New Note</button>
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
