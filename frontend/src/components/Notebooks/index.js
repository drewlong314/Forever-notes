import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getNotebooks,
  updateNotebooks,
  deleteNotebook,
  createNotebook,
} from "../../store/notebooks";
import { csrfFetch } from "../../store/csrf";
import * as sessionActions from "../../store/session";
import Navigation from "../Navigation";
import styles from "./Notebooks.module.css";
import DropDown from "./../DropDown";
import NewNotebookModal from "../NewNotebookModal";

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

  const notebookSelect = async (notebookId) => {
    const data = { notebookId, id: sessionUser.id };
    const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    history.push(`/notebook/${notebookId}`, { json });
  };

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotebooks(sessionUser.id));
    } else {
      history.push("/");
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
          {/* ADD THIS IN, THIS IS THE SEARCH BAR FOR NOTEBOOKS IT IS EASY TO SET UP */}
          {/* <input
            className={styles.notebookSearch}
            type="text"
            placeholder="Find Notebooks..."
          ></input> */}
        </div>
        <div className={styles.notebookInfo}>
          <p>{`${notebooks.length} notebooks`}</p>
          <div className={styles.notebookCreate}>
            <NewNotebookModal />
          </div>
        </div>
        <div className={styles.notebookStats}>
          <p className={styles.notebookTitle}>TITLE</p>
          <p className={styles.notebookCreated}>CREATED BY</p>
          <p className={styles.notebookUpdated}>UPDATED</p>
          <p className={styles.notebookAction}>ACTIONS</p>
        </div>
        <ul className={styles.notebookList}>
          {notebooks.map((notebook, i) => {
            return (
              <div className={styles.notebookChoice} key={i}>
                <li
                  className={styles.notebookTitle}
                  key={notebook.id}
                  onClick={() => {
                    setSelected(notebook);
                    setSelectedName(notebook.name);
                  }}
                >
                  <button
                    className={styles.notebookNameButton}
                    onClick={() => notebookSelect(notebook.id)}
                  >
                    {notebook.name}
                  </button>
                </li>
                <p className={styles.notebookCreated}>{sessionUser.username}</p>
                <p className={styles.notebookUpdated}>
                  {notebook.updatedAt.split("T")[0]}
                </p>
                <div className={styles.notebookDot}>
                  <DropDown notebook={notebook} />
                  {/* <button className={styles.notebookAction}> ...</button> */}
                </div>
              </div>
            );
          })}
        </ul>
        {/* <button onClick={() => setEditArea(true)}>EDIT</button>
        <button onClick={() => dispatch(deleteNotebook(selected.id))}>
          DELETE
        </button> */}

        {editArea ? (
          <textarea
            value={selectedName}
            onChange={(e) => {
              setChanged(true);
              setSelectedName(e.target.value);
            }}
          ></textarea>
        ) : null}
      </div>
      {/* {createArea ? ( // Make this a modal
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
      ) : null} */}
    </div>
  );
}

export default Notebooks;
