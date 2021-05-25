import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { updateNotebooks, deleteNotebook } from "../../store/notebooks";
import LoginFormModal from "../LoginFormModal";
import styles from "./DropDown.module.css";
import LoginForm from "../LoginFormModal/LoginForm";
import RenameNotebookModal from "../RenameNotebookModal";

function DropDown({notebook}) {
  const [showMenu, setShowMenu] = useState(false);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const buttonRef = useRef(null)

  const showMenuFunc = () => {
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    console.log(menuRef.current, "////////////////////////////////////");
    if (!menuRef.current.contains(e.target)) {
      setShowMenu(false);
      document.removeEventListener("click", closeMenu);
    }
    const menu = document.querySelector("#menu");
    // console.log(menu);


  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    //   : document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    console.log(buttonRef.current)
    console.log(menuRef.current);
  }, [menuRef.current, buttonRef.current]);

  return (
    <div>
      <button  onClick={(e) => showMenuFunc()}>...</button>
      {showMenu ? (
        <div ref={menuRef} id={"menu"} className={styles.menuItem}>
          <button
            onClick={() =>
              dispatch(createNote(sessionUser.id, notebooks[0].id))
            }
          >
            Add new note
          </button>

          <RenameNotebookModal notebook={notebook}/>
          {/* <LoginFormModal/> */}
          <button> Delete notebook </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
