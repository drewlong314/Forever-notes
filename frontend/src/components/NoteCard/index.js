import { useDispatch } from "react-redux";
import { deleteNotes } from "../../store/notes";
import styles from "./NoteCard.module.css";

function NoteCard({ note }) {
  const dispatch = useDispatch()
  return (
    <div className={styles.noteCard}>
      <button
      className={styles.deleteButton}
        onClick={() => {
          dispatch(deleteNotes(note.id));
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
