import { useDispatch, useSelector } from "react-redux";
import { deleteNotes } from "../../store/notes";
import styles from "./NoteCard.module.css";

function NoteCard({ note }) {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch()
  return (
    <div className={styles.noteCard}>
      <button
      className={styles.deleteButton}
        onClick={() => {
          if (Object.keys(notes).length === 1) {
            alert('There must be at least one note in a notebook.')
          }
          else {
            dispatch(deleteNotes(note.id));
          }
        }}
      >X</button>
      {note.name ? (
        <h1 className={styles.name} id={note.id}>
          {note.name}
        </h1>
      ) : (
        <h1 className={styles.name} id={note.id}>
          Untitled
        </h1>
      )}
      <h1 className={styles.content} id={note.id}>
        {note.content}
      </h1>
      <h1 className={styles.updated} id={note.id}>
        Last Updated: {note.updatedAt.split("T")[0]}
      </h1>
    </div>
  );
}

export default NoteCard;
