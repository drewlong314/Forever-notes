import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotes } from "../../store/notes";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  // console.log(sessionUser, notes);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotes(sessionUser.id));
    } else {
      history.push('/login')
    }
  }, [dispatch, sessionUser, history]);

  return (
    <div>
      <ul>
        {notes.map((note) => {
          return [
          <li key={note.name}>Note Name: {note.name}</li>,
          <li key={note.content}>Note Context: {note.content}</li>
          ]
        })}
      </ul>
    </div>
  );
};

export default Notes;
