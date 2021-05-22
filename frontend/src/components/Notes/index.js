import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes } from "../../store/notes";
import NoteCard from "../NoteCard";
import styles from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  console.log(sessionUser, notes);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotes(sessionUser.id));
    } else {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  return (
    <div className={styles.container}>
      <ul className={styles.noteUl}>
        <div className={styles.noteHeader}>
          Notes
          <br />
          {notes.length}
        </div>
        {notes.map((note) => {
          return <NoteCard note={note} className={styles.NoteCard} />;
        })}
        {/* <ul>
        {notes.map((note) => {
          return [
          <li key={note.name}>Note Name: {note.name}</li>,
          <li key={note.content}>Note Context: {note.content}</li>
          ]
        })}
      </ul> */}
      </ul>
    </div>
  );
};

export default Notes;
