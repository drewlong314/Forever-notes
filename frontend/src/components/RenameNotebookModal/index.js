import { useState } from "react";
import { Modal } from "../../context/Modal";
import RenameNotebook from "./RenameNotebook";
import styles from "./RenameNotebook.module.css";

function RenameNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Rename Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RenameNotebook notebook={notebook} />
        </Modal>
      )}
    </>
  );
}

export default RenameNotebookModal;
