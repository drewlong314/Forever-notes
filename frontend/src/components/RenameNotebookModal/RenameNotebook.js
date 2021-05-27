import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNotebooks } from "../../store/notebooks";
import styles from "./RenameNotebook.module.css";

function RenameNotebook({notebook}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(updateNotebooks(notebook.id, name));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.action}>Rename Notebook</h1>
      <label>
        <input
        className={styles.input}
        placeholder='Name of Notebook'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <div className={styles.line}>
      </div>
      <button type="submit" className={styles.submitButton}>Continue</button>
    </form>
  );
}

export default RenameNotebook;
