import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { getNotes, updateNotes } from "../../store/notes";
import NoteCard from "../NoteCard";
import styles from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, setSelected] = useState();
  const [selectedName, setSelectedName] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [changed, setChanged] = useState(false)
  const history = useHistory();
  console.log(notes)
  // console.log(sessionUser, notes);
  // console.log(selected, "----------");

  // const updateContent = async (cont) => {
  //   const noteId = selected.id;
  //   const content = { content: cont };
  //   const res = await csrfFetch(`/api/notes/${noteId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(content),
  //   });
  // };

  // const updateName = async (cont) => {
  //   const noteId = selected.id;
  //   const name = { name: cont };
  //   const res = await csrfFetch(`/api/notes/${noteId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(name),
  //   });
  // };

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotes(sessionUser.id));
    } else {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    // if (selectedContent) {
    //   dispatch(updateNotes(selected.id, selectedContent, selectedName))
    //   // updateContent(selectedContent);
    //   // updateName(selectedName);
    // }
    if (notes.length > 0 && !selected) {
      setSelected(notes[0]);
      setSelectedContent(notes[0].content);
      setSelectedName(notes[0].name);
    }
  }, [notes, selected, selectedContent, selectedName]);

  useEffect(() => {
    if (changed) {
      dispatch(updateNotes(selected.id, selectedContent, selectedName))
      setChanged(false)
    }
  },[changed])

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
                setSelectedName(note.name)
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
              setChanged(true)
              setSelectedName(e.target.value)
            }}
          ></textarea>
          <textarea
            className={styles.contentArea}
            value={selectedContent}
            onChange={(e) => {
              setChanged(true)
              setSelectedContent(e.target.value)
            }}
          ></textarea>
        </div>
      ) : null}
    </div>
  );
};

export default Notes;
