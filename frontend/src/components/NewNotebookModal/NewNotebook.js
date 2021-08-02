import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideCreate } from "../../store/modal";
import { createNotebook } from "../../store/notebooks";
import styles from "./NewNotebook.module.css";

function NewNotebook() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hideCreate())
    dispatch(createNotebook(sessionUser.id, name));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.action}>New Notebook</h1>
      <label>
        <input
          className={styles.input}
          placeholder="Name of Notebook"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <div className={styles.line}></div>
      <button type="submit" className={styles.submitButton}>Continue</button>
    </form>
  );
}

export default NewNotebook;
