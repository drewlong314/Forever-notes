import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = "notebooks/SET_NOTEBOOKS";

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  notebooks,
});

export const getNotebooks = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}/notebooks`);
  if (res.ok) {
    const notebooks = await res.json();
    console.log(notebooks);
    dispatch(setNotebooks(notebooks));
  }
};

export const updateNotebooks = (id,title) => async (dispatch) => {
  console.log('id of notebook', id)
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

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTEBOOKS:
      const newState = { ...state };
      action.notebooks.forEach((notebook) => {
        newState[notebook.id] = notebook;
      });
      return newState;
    default:
      return state;
  }
};

export default notebooksReducer;
