import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { hideRename, showRename } from "../../store/modal";
import RenameNotebook from "./RenameNotebook";
import styles from "./RenameNotebook.module.css";

function RenameNotebookModal({ notebook }) {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.modals.rename);
  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          dispatch(showRename())
        }}
      >
        Rename Notebook
      </button>
      {showModal && (
        <Modal onClose={() => dispatch(hideRename())}>
          <RenameNotebook notebook={notebook} />
        </Modal>
      )}
    </>
  );
}

export default RenameNotebookModal;
