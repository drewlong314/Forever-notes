import { csrfFetch } from "./csrf";

const SET_NOTES = "notes/SET_NOTES";

const setNotes = (notes) => ({
  type: SET_NOTES,
  notes,
});

export const getNotes = () => async (dispatch) => {
  const res = await csrfFetch("/api/notes");
  if (res.ok) {
    const notes = await res.json();
    // console.log(notes);
    dispatch(setNotes(notes));
  }
};

const initialState = {};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      const newState = { ...state };
      action.notes.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    default:
      return state;
  }
};

export default notesReducer;
