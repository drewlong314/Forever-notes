import { useState } from "react";
import { Modal } from "../../context/Modal";
import RenameNotebook from "./RenameNotebook";

function RenameNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
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
