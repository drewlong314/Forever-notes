import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { updateNotebooks, deleteNotebook } from "../../store/notebooks";
import LoginFormModal from '../LoginFormModal'
import styles from "./DropDown.module.css";
import LoginForm from "../LoginFormModal/LoginForm";

function DropDown() {
  const [showMenu, setShowMenu] = useState(false);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const showMenuFunc = () => {
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    setShowMenu(false);
    const menu = document.querySelector('#menu')
    console.log(menu)
    console.log(menuRef.current, '////////////////////////////////////')
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
      <LoginFormModal></LoginFormModal>
      {showMenu ? (
        <div ref={menuRef} id={'menu'} className={styles.menuItem}>
          <button
            onClick={() =>
              dispatch(createNote(sessionUser.id, notebooks[0].id))
            }
          >
            Add new note
          </button>

          <button> Rename notebook </button>
          <LoginFormModal></LoginFormModal>
          <button> Delete notebook </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
