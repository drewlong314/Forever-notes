import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { hideCreate, showCreate } from "../../store/modal";
import NewNotebook from "./NewNotebook";
import styles from "./NewNotebook.module.css";

function NewNotebookModal({ notebook }) {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.modals.create);

  return (
    <>
      <button
      className={styles.addPointer}
        onClick={() => {
          dispatch(showCreate());
        }}
      >
        New Notebook
      </button>
      {showModal && (
        <Modal onClose={() => dispatch(hideCreate())}>
          <NewNotebook />
        </Modal>
      )}
    </>
  );
}

export default NewNotebookModal;
