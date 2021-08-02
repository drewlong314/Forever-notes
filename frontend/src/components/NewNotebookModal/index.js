import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { hideRename, showRename } from "../../store/modal";
import NewNotebook from "./NewNotebook";
import styles from "./NewNotebook.module.css";

function NewNotebookModal({ notebook }) {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.modals.rename);
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          dispatch(showRename());
        }}
      >
        New Notebook
      </button>
      {showModal && (
        <Modal onClose={() => dispatch(hideRename())}>
          <NewNotebook />
        </Modal>
      )}
    </>
  );
}

export default NewNotebookModal;
