import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes, updateNotes, deleteNotes } from "../../store/notes";
import * as sessionActions from "../../store/session"
import Navigation from "../Navigation";
import NoteCard from "../NoteCard";
import styles from "./SearchPage.module.css";

function SearchPage(props) {
  const history = useHistory();
  let state = props.location.state;
  if (!state) state= { json: []}
  const searchList = state.json
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

  useEffect(() => {
    if (!sessionUser) {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    if (searchList.length > 0 && !selected) {
      setSelectedProperties(searchList);
    }
    if (searchList.length && selected) {
      let hasSelected = false;
      searchList.forEach((note) => {
        if (note.id === selected.id) hasSelected = true;
      });
      if (!hasSelected) setSelectedProperties(searchList);
    } else if (!searchList.length) setSelectedProperties(searchList);
  }, [searchList, selected, selectedContent, selectedName]);

  useEffect(() => {
    if (changed) {
      dispatch(updateNotes(selected.id, selectedContent, selectedName));
      setChanged(false);
    }
  }, [changed, searchList]);

  return (
    <div className={styles.pageContainer}>
      <Navigation isLoaded={isLoaded}/>
      <div className={styles.container}>
        <ul className={styles.noteUl}>
          <div className={styles.noteHeader}>
            Notes
            <br />
            {searchList.length}
          </div>
          {searchList.map((note) => {
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
            <button
              onClick={() => {
                dispatch(deleteNotes(selected.id));
                setDeleted(true);
              }}
            >
              DELETE NOTE
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// return <div>
//       <h1>Search Page</h1>
//       <button onClick={() => {}}>Post</button>
//   </div>;
// }

export default SearchPage;
