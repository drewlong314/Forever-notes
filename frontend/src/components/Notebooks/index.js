import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebooks, updateNotebooks } from "../../store/notebooks";
import styles from "./Notebooks.module.css";

const Notebooks = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, setSelected] = useState();
  const [selectedName, setSelectedName] = useState();
  const [textArea, setTextArea] = useState(false);
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
      <button onClick={() => setTextArea(true)}>EDIT</button>
      <button onClick={() => dispatch(deleteNotebooks(selected.id))}>DELETE</button>
      {textArea ? (
        <textarea
          value={selectedName}
          onChange={(e) => {
            console.log(selected.id);
            setChanged(true);
            setSelectedName(e.target.value);
          }}
        ></textarea>
      ) : null}
    </div>
  );
};

export default Notebooks;
