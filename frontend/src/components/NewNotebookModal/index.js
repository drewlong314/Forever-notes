import { useState } from "react";
import { Modal } from "../../context/Modal";
import NewNotebook from "./NewNotebook";

function NewNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
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
