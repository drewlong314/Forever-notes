import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes } from "../../store/notes";
import NoteCard from "../NoteCard";
import styles from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, setSelected] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const history = useHistory();
  // console.log(sessionUser, notes);
  // console.log(selected, "----------");

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotes(sessionUser.id));
    } else {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    if (notes.length > 0 && !selected) {
      setSelected(notes[0])
      setSelectedContent(notes[0].content)
    };
  }, [notes, selected]);

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
            <div onClick={() => {
              setSelected(note)
              setSelectedContent(note.content)
              }}>
              <NoteCard note={note} className={styles.NoteCard} />
            </div>
          );
        })}
      </ul>
      {selected ? (
        <div className={styles.selectedNote}>
          <h1>{selected.name}</h1>
          <h1>{selected.content}</h1>
          <textarea className={styles.contentArea} value={selectedContent} onChange={(e) => setSelectedContent(e.target.value)}></textarea>
        </div>
      ) : null}
    </div>
  );
};

export default Notes;
