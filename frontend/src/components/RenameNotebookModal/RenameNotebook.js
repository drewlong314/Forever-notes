import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNotebooks } from "../../store/notebooks";

function RenameNotebook({notebook}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(updateNotebooks(notebook.id, name));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Rename Notebook</h1>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Continue</button>
    </form>
  );
}

export default RenameNotebook;
