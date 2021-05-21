import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/notes";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => Object.values(state.notes));
  console.log(notes);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {notes.map((note) => {
            console.log(note)
          return [
          <li>Note Name: {note.name}</li>,
          <li>Note Context: {note.content}</li>
          ]
        })}
      </ul>
    </div>
  );
};

export default Notes;
