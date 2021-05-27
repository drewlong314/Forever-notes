import { NavLink } from "react-router-dom";
import styles from "./GuestNavigation.module.css";

function GuestNavigation() {
  return (
    <nav className={styles.NavBar}>
      <NavLink to="/">
        <button>ForeverNotes</button>
      </NavLink>
      <NavLink to="/login">
        <button>Log In</button>
      </NavLink>
    </nav>
  );
}

export default GuestNavigation;
