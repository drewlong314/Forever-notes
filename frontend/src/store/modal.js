const SHOW_RENAME = "modal/SHOW_RENAME"
const HIDE_RENAME = "modal/HIDE_RENAME"
const SHOW_CREATE = "modal/SHOW_CREATE"
const HIDE_CREATE = "modal/HIDE_CREATE"



export const showRename = () => ({
    type: SHOW_RENAME,
});

export const hideRename = () => ({
    type: HIDE_RENAME,
});

export const showCreate = () => ({
    type: SHOW_CREATE,
});

export const hideCreate = () => ({
    type: HIDE_CREATE,
});

const initialState = {rename: false, create: false}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_RENAME:
            state.rename = true
            return state
        case HIDE_RENAME:
            state.rename = false
            return state
        case SHOW_CREATE:
            state.create = true
            return state
        case HIDE_CREATE:
            state.create = false
            return state
        default:
            return state;
    }
}

export default modalReducer
