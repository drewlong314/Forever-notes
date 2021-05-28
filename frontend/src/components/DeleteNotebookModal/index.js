import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteNotebook from "./DeleteNotebook";
import styles from "./DeleteNotebook.module.css";

function DeleteNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Delete Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteNotebook notebook={notebook} />
        </Modal>
      )}
    </>
  );
}

export default DeleteNotebookModal;
