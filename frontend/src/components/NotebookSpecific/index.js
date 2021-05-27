import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebookNotes, updateNotes, deleteNotes } from "../../store/notes";
import * as sessionActions from "../../store/session";
import Navigation from "../Navigation";
import NoteCard from "../NoteCard";
import styles from "./NotebookSpecific.module.css";

function NotebookSpecific(props) {
  const history = useHistory();
  let state = props.location.state;
  if (!state) state = { json: [] };
  console.log(state);
  const searchList = state.json;
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedName, setSelectedName] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [changed, setChanged] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const setSelectedProperties = (notes) => {
    if (notes.length) {
      setSelected(notes[0]);
      setSelectedContent(notes[0].content);
      setSelectedName(notes[0].name);
    } else {
      setSelected(null);
      setSelectedContent(null);
      setSelectedName(null);
    }
  };

  useEffect(() => {
    if (sessionUser) {
      if (state.json[0])
        dispatch(getNotebookNotes(sessionUser.id, state.json[0].notebookId));
    } else {
      history.push("/");
    }
    // if (!sessionUser) { //Might need to dispatch(getNotes(searchList.map(id)));
    //   history.push("/login");
    // }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    console.log(notes, "LINE 55");
    console.log(searchList);
    if (notes.length > 0 && !selected) {
      setSelectedProperties(notes);
    }
    if (notes.length && selected) {
      let hasSelected = false;
      notes.forEach((note) => {
        if (note.id === selected.id) hasSelected = true;
      });
      if (!hasSelected) setSelectedProperties(notes);
    } else if (!notes.length) setSelectedProperties(notes);
  }, [notes, selected, selectedContent, selectedName]);

  useEffect(() => {
    if (changed) {
      dispatch(updateNotes(selected.id, selectedContent, selectedName));
      setChanged(false);
    }
  }, [changed, searchList]);

  return (
    <div className={styles.pageContainer}>
      <Navigation isLoaded={isLoaded} />
      <div className={styles.container}>
        <ul className={styles.noteUl}>
          <div className={styles.noteHeader}>
            <p className={styles.notesPage}>Notes</p>
            <p className={styles.notesNum}>{notes.length} notes</p>
          </div>
          {notes.map((note) => {
            return (
              <div
                onClick={() => {
                  setSelected(note);
                  setSelectedContent(note.content);
                  setSelectedName(note.name);
                }}
              >
                <NoteCard note={note} className={styles.NoteCard} />
              </div>
            );
          })}
        </ul>
        {selected ? (
          <div className={styles.selectedNote}>
            <textarea
              className={styles.nameArea}
              value={selectedName}
              onChange={(e) => {
                setChanged(true);
                setSelectedName(e.target.value);
              }}
            ></textarea>
            <textarea
              className={styles.contentArea}
              value={selectedContent}
              onChange={(e) => {
                setChanged(true);
                setSelectedContent(e.target.value);
              }}
            ></textarea>
            <button
              onClick={() => {
                dispatch(deleteNotes(selected.id));
                setDeleted(true);
              }}
            >
              DELETE NOTE
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// return <div>
//       <h1>Search Page</h1>
//       <button onClick={() => {}}>Post</button>
//   </div>;
// }

export default NotebookSpecific;
