import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getNotebooks,
  updateNotebooks,
  deleteNotebook,
  createNotebook,
} from "../../store/notebooks";
import styles from "./Notebooks.module.css";

const Notebooks = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, setSelected] = useState();
  const [selectedName, setSelectedName] = useState();
  const [editArea, setEditArea] = useState(false);
  const [createArea, setCreateArea] = useState(false);
  const [createInput, setCreateInput] = useState("");
  const [changed, setChanged] = useState(false);
  const history = useHistory();
  console.log(sessionUser, notebooks);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotebooks(sessionUser.id));
    } else {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    if (changed) {
      dispatch(updateNotebooks(selected.id, selectedName));
      setChanged(false);
    }
  }, [changed, notebooks]);

  return (
    <div className={styles.container}>
      <h1>This is Notebooks</h1>
      <ul>
        {notebooks.map((notebook) => {
          return (
            <li
              key={notebook.name}
              onClick={() => {
                setSelected(notebook);
                setSelectedName(notebook.name);
              }}
            >
              Notebook Name: {notebook.name}
            </li>
          );
        })}
      </ul>
      <button onClick={() => setEditArea(true)}>EDIT</button>
      <button onClick={() => dispatch(deleteNotebook(selected.id))}>
        DELETE
      </button>
      {editArea ? (
        <textarea
          value={selectedName}
          onChange={(e) => {
            console.log(selected.id);
            setChanged(true);
            setSelectedName(e.target.value);
          }}
        ></textarea>
      ) : null}
      <button onClick={() => setCreateArea(true)}>CREATE</button>
      {createArea ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(createNotebook(sessionUser.id, createInput));
          }}
        >
          <input
            value={createInput}
            onChange={(e) => setCreateInput(e.target.value)}
          ></input>
          <button type="submit">SUBMIT</button>
        </form>
      ) : null}
    </div>
  );
};

export default Notebooks;
