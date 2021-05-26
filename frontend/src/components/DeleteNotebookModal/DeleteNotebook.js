import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNotebook } from "../../store/notebooks";

function DeleteNotebook({notebook}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(deleteNotebook(notebook.id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Delete Notebook</h1>
      <button type="submit">Continue</button>
    </form>
  );
}

export default DeleteNotebook;
