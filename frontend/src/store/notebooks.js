import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = "notebooks/SET_NOTEBOOKS";
const REMOVE_NOTEBOOK = "notes/REMOVE_NOTEBOOKS";

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  notebooks,
});

const removeNotebook = (noteId) => ({
  type: REMOVE_NOTEBOOK,
  noteId,
});

export const getNotebooks = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/notebooks`);
  if (res.ok) {
    const notebooks = await res.json();
    console.log(notebooks);
    dispatch(setNotebooks(notebooks));
  }
};

export const updateNotebooks = (id, title) => async (dispatch) => {
  console.log("id of notebook", id);
  const content = {
    name: title,
  };
  const res = await csrfFetch(`/api/notebooks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (res.ok) {
    const notebooks = await res.json();
    dispatch(setNotebooks([notebooks]));
  }
};

export const deleteNotebook = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/${id}`, {
    method: "DELETE",
  });
  const notebook = await res.json();
  const notebookId = notebook.id;
  dispatch(removeNotebook(notebookId));
};

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTEBOOKS:
      const newState = { ...state };
      action.notebooks.forEach((notebook) => {
        newState[notebook.id] = notebook;
      });
      return newState;
    case REMOVE_NOTEBOOK: {
      const newState = { ...state };
      const idToDelete = action.noteId;
      delete newState[idToDelete];
      return newState;
    }
    default:
      return state;
  }
};

export default notebooksReducer;
