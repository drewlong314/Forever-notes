import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteNotebook from "./DeleteNotebook";

function DeleteNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
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
