import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import {
    updateNotebooks,
    deleteNotebook,
  } from "../../store/notebooks";
import styles from "./DropDown.module.css";

function DropDown() {
  const [showMenu, setShowMenu] = useState(false);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const showMenuFunc = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
    document.removeEventListener("click", closeMenu);
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    //   : document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div>
      <button onClick={(e) => showMenuFunc()}>...</button>

      {showMenu ? (
        <div className={styles.menuItem}>
          <button
            onClick={() =>
              dispatch(createNote(sessionUser.id, notebooks[0].id))
            }
          >
            Add new note
          </button>
          <button> Rename notebook </button>
          <button> Delete notebook </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
