import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getSearchNotes, updateNotes, deleteNotes } from "../../store/notes";
import * as sessionActions from "../../store/session";
import Navigation from "../Navigation";
import NoteCard from "../NoteCard";
import styles from "./SearchPage.module.css";

function SearchPage() {
  const history = useHistory();
  const location = useLocation();
  let state = location.state;
  if (!state) state = { json: [] };
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

  const getIdOfList = () => {
    const listIds = searchList.map((item) => item.id);
    return listIds;
  };

  useEffect(() => {
    if (sessionUser) {
      dispatch(getSearchNotes(getIdOfList()));
    } else {
      history.push("/");
    }
    // if (!sessionUser) {
    //   history.push("/login");
    // }
  }, [dispatch, sessionUser, history, state]);

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
  }, [changed, searchList, notes]);

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

export default SearchPage;
