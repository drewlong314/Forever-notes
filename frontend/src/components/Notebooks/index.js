import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getNotebooks,
  updateNotebooks,
  deleteNotebook,
  createNotebook,
} from "../../store/notebooks";
import * as sessionActions from "../../store/session";
import Navigation from "../Navigation";
import styles from "./Notebooks.module.css";
import DropDown from './../DropDown'

function Notebooks() {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedName, setSelectedName] = useState();
  const [editArea, setEditArea] = useState(false);
  const [createArea, setCreateArea] = useState(false);
  const [createInput, setCreateInput] = useState("");
  const [changed, setChanged] = useState(false);
  const history = useHistory();
  console.log(sessionUser, notebooks);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
      <Navigation isLoaded={isLoaded} />
      <div className={styles.notebookSelect}>
        <div className={styles.notebookHeader}>
          <p>Notebooks</p>
          <input
            className={styles.notebookSearch}
            type="text"
            placeholder="Find Notebooks..."
          ></input>
        </div>
        <div className={styles.notebookInfo}>
          <p>{`${notebooks.length} notebooks`}</p>
          <button
            className={styles.notebookCreate}
            onClick={() => setCreateArea(true)}
          >
            New Notebook
          </button>
        </div>
        <div className={styles.notebookStats}>
          <p className={styles.notebookTitle}>TITLE</p>
          <p className={styles.notebookCreated}>CREATED BY</p>
          <p className={styles.notebookUpdated}>UPDATED</p>
          <p className={styles.notebookAction}>ACTIONS</p>
        </div>
        <ul className={styles.notebookList}>
          {notebooks.map((notebook) => {
            return (
              <div className={styles.notebookChoice}>
                <li
                  className={styles.notebookTitle}
                  key={notebook.id}
                  onClick={() => {
                    setSelected(notebook);
                    setSelectedName(notebook.name);
                  }}
                >
                  <button>E</button> {notebook.name}
                </li>
                <p className={styles.notebookCreated}>{sessionUser.username}</p>
                <p className={styles.notebookUpdated}>
                  {notebook.updatedAt.split("T")[0]}
                </p>
                <div className={styles.notebookDot}>
                  <DropDown />
                  {/* <button className={styles.notebookAction}> ...</button> */}
                </div>
              </div>
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
      </div>
      {createArea ? ( // Make this a modal
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
