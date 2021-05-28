import { useState } from "react";
import { Modal } from "../../context/Modal";
import NewNotebook from "./NewNotebook";
import styles from "./NewNotebook.module.css";

function NewNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          setShowModal(true);
        }}
      >
        New Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewNotebook />
        </Modal>
      )}
    </>
  );
}

export default NewNotebookModal;
