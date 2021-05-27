import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNotebook } from "../../store/notebooks";
import styles from "./DeleteNotebook.module.css";

function DeleteNotebook({ notebook }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(deleteNotebook(notebook.id));
  };

  return (

      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.action}>Delete Notebook?</h3>
        <p className={styles.description}>All notes in the notebooks will be deleted</p>
        <button className={styles.submitButton} type="submit">
          Continue
        </button>
      </form>
  );
}

export default DeleteNotebook;
