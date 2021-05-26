import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotebook } from "../../store/notebooks";


function NewNotebook() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(createNotebook(sessionUser.id, name))
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Notebook</h1>
      <label>
        Notebook Name
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

export default NewNotebook;
