import styles from "./NoteCard.module.css";

function NoteCard({ note }) {
  return (
    <div className={styles.noteCard}>
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
