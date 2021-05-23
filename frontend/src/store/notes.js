import { csrfFetch } from "./csrf";

const SET_NOTES = "notes/SET_NOTES";
const REMOVE_NOTE = "notes/REMOVE_NOTES";

const setNotes = (notes) => ({
  type: SET_NOTES,
  notes,
});

const removeNote = (noteId) => ({
  type: REMOVE_NOTE,
  noteId,
});

export const getNotes = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/notes`);
  if (res.ok) {
    const notes = await res.json();
    dispatch(setNotes(notes));
  }
};

export const updateNotes = (id, cont, title) => async (dispatch) => {
  const content = {
    content: cont,
    name: title,
  };
  const res = await csrfFetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (res.ok) {
    const notes = await res.json();
    dispatch(setNotes([notes]));
  }
};

export const deleteNotes = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
  const note = await res.json();
  const noteId = note.id;
  dispatch(removeNote(noteId));
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
    case REMOVE_NOTE: {
      const newState = { ...state };
      const idToDelete = action.noteId;
      delete newState[idToDelete];
      return newState;
    }
    default:
      return state;
  }
};

export default notesReducer;
