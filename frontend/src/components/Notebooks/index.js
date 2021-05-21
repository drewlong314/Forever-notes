import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebooks } from "../../store/notebooks";

const Notebooks = () => {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const notes = useSelector((state) => Object.values(state.notes));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  console.log(sessionUser, notebooks);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getNotebooks(sessionUser.id));
    } else {
      history.push("/login");
    }
  }, [dispatch, sessionUser, history]);

  return (
    <div>
      <h1>This is Notebooks</h1>
      <ul>
        {notebooks.map((notebook) => {
          return <li key={notebook.name}>Notebook Name: {notebook.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Notebooks;
