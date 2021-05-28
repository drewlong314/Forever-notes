import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from "./ProfileButton.module.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className={styles.profileIcon} onClick={openMenu}>
        <i className="fas fa-cookie" />
      </button>
      <span className={styles.username}>   {user.username}</span>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <button className="profile-icon" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
