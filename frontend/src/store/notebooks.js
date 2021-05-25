import { csrfFetch } from "./csrf";

const ADD_NOTEBOOK = "notebook/ADD_NOTEBOOK";
const SET_NOTEBOOKS = "notebooks/SET_NOTEBOOKS";
const REMOVE_NOTEBOOK = "notebooks/REMOVE_NOTEBOOKS";

const addNotebook = (notebook) => ({
  type: ADD_NOTEBOOK,
  notebook,
});

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  notebooks,
});

const removeNotebook = (notebookId) => ({
  type: REMOVE_NOTEBOOK,
  notebookId,
});

export const createNotebook = (id, name) => async (dispatch) => {
  const content = {name: name, userId: id}
  const res = await csrfFetch(`/api/notebooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (res.ok) {
    const notebook = await res.json();
    dispatch(addNotebook(notebook));
  }
};

export const getNotebooks = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/notebooks`);
  if (res.ok) {
    const notebooks = await res.json();
    dispatch(setNotebooks(notebooks));
  }
};

export const updateNotebooks = (id, title) => async (dispatch) => {
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
      const idToDelete = action.notebookId;
      delete newState[idToDelete];
      return newState;
    }
    case ADD_NOTEBOOK: {
      const newState = { ...state };
      const idToAdd = action.notebook.id
      newState[idToAdd] = action.notebook
      return newState;
    }
    default:
      return state;
  }
};

export default notebooksReducer;
