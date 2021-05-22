import styles from "./NoteCard.module.css";

const NoteCard = ({ note }) => {
  return (
    <div className={styles.noteCard}>
      <h1 className={styles.name}>{note.name}</h1>
      <h1 className={styles.content}>{note.content}</h1>
      <h1 className={styles.updated}>
        Last Updated: {note.updatedAt.split("T")[0]}
      </h1>
    </div>
  );
  // <div>
  {
    /* {notes.map((note) => { */
  }
  {
    /* return ( */
  }
  {
    /* );
      })} */
  }
  // </div>
  //   );
};

export default NoteCard;
