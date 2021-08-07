import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { useHistory} from "react-router-dom"
import { updateNotebooks, deleteNotebook } from "../../store/notebooks";
import LoginFormModal from "../LoginFormModal";
import styles from "./DropDown.module.css";
import LoginForm from "../LoginFormModal/LoginForm";
import RenameNotebookModal from "../RenameNotebookModal";
import DeleteNotebookModal from "../DeleteNotebookModal";
import { showRename } from "../../store/modal";

function DropDown({ notebook }) {
  const [showMenu, setShowMenu] = useState(false);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const menuRef = useRef(null);
  const renameRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setShowMenu(false)
  }, [notebook])

  return (
    <div>
      <button className={styles.optionsButton} onClick={(e) => setShowMenu(true)}>...</button>
      {showMenu ? (
        <div ref={menuRef} id={"menu"} className={styles.menuItem}>
          <button className={styles.exit} onClick={() => setShowMenu(false)}>X</button>
          <button
          className={styles.add}
            onClick={() => {
              dispatch(createNote(sessionUser.id, notebook.id))
              history.push(`/notebook/${notebook.id}`)
            }}
          >
            Add new note
          </button>

          <RenameNotebookModal
            ref={renameRef}
            notebook={notebook}
            className={styles.rename}
          />
          <DeleteNotebookModal className={styles.delete} onClick={() => setShowMenu(false)}notebook={notebook}/>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
