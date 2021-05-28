import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes, updateNotes, deleteNotes } from "../../store/notes";
import * as sessionActions from "../../store/session";
import Navigation from "../Navigation";
import NoteCard from "../NoteCard";
import styles from "./Notes.module.css";

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selected, setSelected] = useState(null);
  const [selectedName, setSelectedName] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [changed, setChanged] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const history = useHistory();

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
      dispatch(getNotes(sessionUser.id));
    } else {
      history.push("/");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
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
  }, [changed, notes]);

  return (
    <div className={styles.pageContainer}>
      <Navigation isLoaded={isLoaded} />
      <div className={styles.container}>
        <ul className={styles.noteUl} id={styles.style}>
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
              placeholder="Title"
              className={styles.nameArea}
              value={selectedName}
              onChange={(e) => {
                setChanged(true);
                setSelectedName(e.target.value);
              }}
            ></textarea>
            <textarea
              placeholder="Start writing"
              className={styles.contentArea}
              value={selectedContent}
              onChange={(e) => {
                setChanged(true);
                setSelectedContent(e.target.value);
              }}
            ></textarea>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Notes;
