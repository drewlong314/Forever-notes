import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes, updateNotes, deleteNotes } from "../../store/notes";
import NoteCard from "../NoteCard";
import styles from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, setSelected] = useState(null);
  const [selectedName, setSelectedName] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [changed, setChanged] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const history = useHistory();
  console.log(notes);

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
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    console.log(selected, "----------------------");
    if (notes.length > 0 && !selected) {
      setSelectedProperties(notes);
    }
    if (notes.length && selected) {
      let hasSelected = false;
      notes.forEach((note) => {
        if (note.id === selected.id) hasSelected = true;
        console.log(note.id);
      });
      console.log(hasSelected);
      if (!hasSelected) setSelectedProperties(notes)
    } else if (!notes.length) setSelectedProperties(notes)
  }, [notes, selected, selectedContent, selectedName]);

  useEffect(() => {
    if (changed) {
      dispatch(updateNotes(selected.id, selectedContent, selectedName));
      setChanged(false);
    }
  }, [changed, notes]);

  return (
    <div className={styles.container}>
      <ul className={styles.noteUl}>
        <div className={styles.noteHeader}>
          Notes
          <br />
          {notes.length}
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
          <h1>{selected.name}</h1>
          <h1>{selected.content}</h1>
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
              console.log(notes, "before Delete");
              dispatch(deleteNotes(selected.id));
              setDeleted(true);
            }}
          >
            DELETE NOTE
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Notes;
